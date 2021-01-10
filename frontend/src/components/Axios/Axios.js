import axios from "axios";

const baseURL = "http://127.0.0.1:8000/api/";

const axiosInstance = axios.create({
  baseURL: baseURL,
  timeout: 15000,
  headers: {
    Authorization: localStorage.getItem("access_token")
      ? "JWT " + localStorage.getItem("access_token")
      : null,
    "Content-Type": "application/json",
    accept: "application/json",
  },
});

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async function (error) {
    const originalRequest = error.config;

    if (typeof error.response === "undefined") {
      alert(
        "A server/network error occurred. " +
          "Looks like CORS might be the problem. " +
          "Sorry about this - we will get it fixed shortly."
      );
      return Promise.reject(error);
    }

    if (
      error.response.status === 401 &&
      originalRequest.url === baseURL + "token/refresh/"
    ) {
      window.location.href = "/login/";
      return Promise.reject(error);
    }

    if (
      error.response.data.code === "token_not_valid" &&
      error.response.status === 401 &&
      error.response.statusText === "Unauthorized"
    ) {
      const refreshToken = localStorage.getItem("refresh_token");

      if (refreshToken) {
        const tokenParts = JSON.parse(atob(refreshToken.split(".")[1]));

        // exp date in token is expressed in seconds, while now() returns milliseconds:
        const now = Math.ceil(Date.now() / 1000);
        console.log(tokenParts.exp);

        if (tokenParts.exp > now) {
          return axiosInstance
            .post("/token/refresh/", { refresh: refreshToken })
            .then((response) => {
              localStorage.setItem("access_token", response.data.access);
              localStorage.setItem("refresh_token", response.data.refresh);

              axiosInstance.defaults.headers["Authorization"] =
                "JWT " + response.data.access;
              originalRequest.headers["Authorization"] =
                "JWT " + response.data.access;

              return axiosInstance(originalRequest);
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
          console.log("Refresh token is expired", tokenParts.exp, now);
          window.location.href = "/connexion/";
        }
      } else {
        console.log("Refresh token not available.");
        window.location.href = "/connexion/";
      }
    }

    // specific error handling done elsewhere
    return Promise.reject(error);
  }
);

/**
 * Retourner l'utilisateur connecté
 * @returns Objet avec informations de l'utilisateur
 */
export function get_user() {
  const token = localStorage.getItem("access_token");

  // Le token n'existe pas, donc pas d'utilisateur connecté
  if (!token) return null;

  // Extraction informations du token
  const payload = atob(token.split(".")[1]);
  const object = JSON.parse(payload);
  return { id: object.user_id, is_staff: object.is_staff };
}

/**
 * Retourner si l'utilisateur est connecté
 * @returns true si connecté
 */
export function is_logged() {
  return localStorage.getItem("access_token") !== null;
}

/**
 * Retourner l'identifiant et le login de l'hôte rejoint
 * @returns Objet avec informations de l'hôte
 */
export function get_hote() {
  return JSON.parse(localStorage.getItem("hote_rejoint"));
}

export async function apiDeleteCocktail(idCocktail) {
  let ok = true;

  await axiosInstance
    .delete("cocktails/" + idCocktail)
    .catch(({ response }) => {
      ok = false;
      alert(
        `Erreur suppression cocktail ${idCocktail} : ${response.status} ${response.statusText}`
      );
    });

  return ok;
}

export async function apiGetCocktails() {
  let cocktails = [];

  await axiosInstance
    .get("cocktails/")
    .then(({ data }) => {
      cocktails = data;
    })
    .catch(({ response }) => {
      alert(
        `Erreur récupération cocktails : ${response.status} ${response.statusText}`
      );
    });

  return cocktails;
}

export async function apiGetIngredients() {
  let ingredients = [];

  await axiosInstance
    .get("ingredients/")
    .then(({ data }) => {
      ingredients = data;
    })
    .catch(({ response }) => {
      alert(
        `Erreur récupération ingrédients : ${response.status} ${response.statusText}`
      );
    });

  return ingredients;
}

export function usePermission(group) {
  if (group === "admin") {
    return is_logged() ? get_user().is_staff : false;
  }

  throw new Error(`Le groupe utilisateur ${group} n'existe pas.`);
}

/**
 * Mettre à jour l'image d'un cocktail
 * @param {int} id      ID du cocktail
 * @param {File} image  Fichier image
 */
export async function apiUpdateCocktailImage(id, image) {
  if (!image) throw new Error("L'image est vide.");

  let ok = true;

  const data = new FormData();
  data.append("illustrationurl", image);
  axiosInstance
    .put(`cocktails/image/${id}/`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .catch(({ response }) => {
      ok = false;
      alert(
        `Erreur modification image cocktail : ${response.status} ${response.statusText}`
      );
    });

  return ok;
}

/**
 * Créer un nouveau cocktail
 * @param {*} cocktail    Champs du cocktail remplis
 * @param {File} image    Fichier image du cocktail
 * @param {*} ingredients Ingrédients contenus
 */
export async function apiCreateCocktail(cocktail, image, ingredients) {
  let ok = true;
  let createId = null;

  // Création du cocktail
  await axiosInstance
    .post("cocktails/new", cocktail)
    .then(({ data }) => {
      createId = data.id;
    })
    .catch(({ response }) => {
      ok = false;
      alert(
        `Erreur création cocktail : ${response.status} ${response.statusText}`
      );
    });

  if (!ok) return;

  if (image) ok = await apiUpdateCocktailImage(createId, image);

  return ok;
}

export default axiosInstance;
