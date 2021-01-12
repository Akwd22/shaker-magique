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

export async function apiDeleteIngredient(idIngredient) {
  let ok = true;

  await axiosInstance
    .delete("ingredients/detail/" + idIngredient)
    .catch(({ response }) => {
      ok = false;
      alert(
        `Erreur suppression ingrédients ${idIngredient} : ${response.status} ${response.statusText}`
      );
    });

  return ok;
}

export async function apiGetCocktail(id) {
  let cocktail;

  await axiosInstance
    .get(`cocktails/${id}`)
    .then(({ data }) => {
      cocktail = data;
    })
    .catch(({ response }) => {
      alert(
        `Erreur récupération cocktail : ${response.status} ${response.statusText}`
      );
    });

  return cocktail;
}

export async function apiGetIngredient(id) {
  let ingredient;

  await axiosInstance
    .get(`ingredients/detail/${id}`)
    .then(({ data }) => {
      ingredient = data;
    })
    .catch(({ response }) => {
      alert(
        `Erreur récupération ingredient solo : ${response.status} ${response.statusText}`
      );
    });
  return ingredient;
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

export async function apiGetCocktailsProposer() {
  let cocktails = [];

  await axiosInstance
    .get("/proposer/" + get_user().id)
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
  if (group === "user") {
    return is_logged() ? get_user() : false;
  }

  if (group === "user") {
    return is_logged();
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

export async function apiAddIngredientsToCocktail(id, ingredients) {
  let ok = true;

  ingredients.forEach((elt) => {
    elt.idcocktail = id;
  });

  await axiosInstance
    .post(`contenir/${id}/`, ingredients)
    .catch(({ response }) => {
      ok = false;
      alert(
        `Erreur ajout ingrédients au cocktail ${id} : ${response.status} ${response.statusText}`
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
  let createdId = null;

  // Création du cocktail
  await axiosInstance
    .post("cocktails/new", cocktail)
    .then(({ data }) => {
      createdId = data.id;
    })
    .catch(({ response }) => {
      ok = false;
      alert(
        `Erreur création cocktail : ${response.status} ${response.statusText}`
      );
    });

  if (!ok) return;

  if (image) ok = await apiUpdateCocktailImage(createdId, image);

  if (!ok) return;

  if (ingredients) ok = apiAddIngredientsToCocktail(createdId, ingredients);

  return ok;
}

export async function apiCreateIngredient(ingredient) {
  let ok = true;
  await axiosInstance
    .post("/ingredients/", ingredient)
    .catch(({ response }) => {
      ok = false;
      alert(
        `Erreur création ingredient : ${response.status} ${response.statusText}`
      );
    });

  return ok;
}

/**
 * Modifier un cocktail
 * @param {*} cocktail    Champs du cocktail remplis
 * @param {File} image    Fichier image du cocktail
 * @param {*} ingredients Ingrédients contenus
 */
export async function apiUpdateCocktail(cocktail, image, ingredients) {
  let ok = true;

  // Modification du cocktail
  await axiosInstance
    .patch(`cocktails/${cocktail.id}/`, {
      ...cocktail,
      illustrationurl: undefined,
    })
    .catch(({ response }) => {
      ok = false;
      alert(
        `Erreur modification cocktail : ${response.status} ${response.statusText}`
      );
    });

  if (!ok) return;

  if (image) ok = await apiUpdateCocktailImage(cocktail.id, image);

  if (!ok) return;

  if (ingredients) ok = apiAddIngredientsToCocktail(cocktail.id, ingredients);

  return ok;
}

export async function apiUpdateIngredient(ingredient) {
  let ok = true;

  await axiosInstance
    .patch(`ingredients/detail/${ingredient.id}/`, ingredient)
    .catch(({ response }) => {
      ok = false;
      alert(
        `Erreur modification ingredient : ${response.status} ${response.statusText}`
      );
    });
  return ok;
}

/**
 * Récupérer le stock d'ingrédients de l'utilisateur connecté
 */
export async function apiGetCurrentStock() {
  let ingredients = [];

  await axiosInstance
    .get(`stockcurrent/`)
    .then(({ data }) => {
      ingredients = data;
    })
    .catch(({ response }) => {
      alert(
        `Erreur récupération stock d'ingrédients : ${response.status} ${response.statusText}`
      );
    });

  return ingredients;
}

/**
 * Modifier le stock d'un ingrédient de l'utilisateur connecté
 * @param {int} id      ID de l'ingrédient
 * @param {bool} stock  En réserve ou non
 */
export async function apiUpdateIngredientStock(id, stock) {
  let ok = true;

  await axiosInstance
    .put(`stockupdate/${id}/`, { enreserve: stock })
    .catch(({ response }) => {
      ok = false;
      alert(
        `Erreur modification stock ingrédient ${id} pour ${stock} : ${response.status} ${response.statusText}`
      );
    });

  return ok;
}

export async function apiDeleteCocktailsProposer(id) {
  let ok = true;

  await axiosInstance
    .delete(`/proposer/detail/${id}/`)
    .catch(({ response }) => {
      ok = false;
      alert(
        `Erreur suppression proposition cocktails ${id} : ${response.status} ${response.statusText}`
      );
    });
  return ok;
}

export async function apiGetCocktailsProposer2(id) {
  let ok = true;

  await axiosInstance.get(`/proposer/detail/${id}/`).catch(({ response }) => {
    ok = false;
    alert(
      `Erreur get proposition cocktails ${id} : ${response.status} ${response.statusText}`
    );
  });

  return ok;
}

/**
 * Récupérer la note d'un utilisateur pour un cocktail
 * @param {int} id        ID du cocktail
 * @returns {number|null} Note de l'utilisateur'
 */
export async function apiGetCocktailUserNote(id) {
  let score;

  await axiosInstance
    .get(`/notes/${get_user().id}/${id}/`)
    .then(({ data }) => {
      score = data.note;
    })
    .catch(({ response }) => {
      /*alert(
        `Erreur get note utilisateur pour cocktail ${id} : ${response.status} ${response.statusText}`
      );*/
    });

  return score;
}

/**
 * Récupérer la moyenne d'un cocktail
 * @param {int} id        ID du cocktail
 * @returns {number|null} Moyenne du cocktail
 */
export async function apiGetCocktailMoyenne(id) {
  let avg;

  await axiosInstance
    .get(`/notes/${id}/`)
    .then(({ data }) => {
      avg = data.moyenne;
    })
    .catch(({ response }) => {
      alert(
        `Erreur get moyenne cocktail ${id} : ${response.status} ${response.statusText}`
      );
    });

  return avg;
}

/**
 * Noter un cocktail
 * @param {int} id        ID du cocktail
 * @param {number} note   Note désirée
 * @returns {number|null} Nouvelle note moyenne
 */
export async function apiNoterCocktail(id, note) {
  let ok = true;
  let updatedAvg;

  // Noter le cocktail
  await axiosInstance
    .post(`/notes/`, { idmembre: get_user().id, idcocktail: id, note: note })
    .catch(({ response }) => {
      ok = false;
      alert(
        `Erreur noter ${note} cocktail ${id} pour : ${response.status} ${response.statusText}`
      );
    });

  // Récupérer la nouvelle moyenne du cocktail
  if (ok) {
    updatedAvg = await apiGetCocktailMoyenne(id);
  }

  return updatedAvg;
}

export default axiosInstance;
