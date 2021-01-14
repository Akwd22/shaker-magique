import axios from "axios";

/**
 * URL vers le back-end
 */
const baseURL = "http://127.0.0.1:8000/api/";

/**
 * Variable appelé dès que l'on souhaite faire une requete au serveur django (backend)
 */
const axiosInstance = axios.create({
  baseURL: baseURL,
  timeout: 10000,
  headers: {
    Authorization: localStorage.getItem("access_token")
      ? "JWT " + localStorage.getItem("access_token")
      : null,
    "Content-Type": "application/json",
    accept: "application/json",
  },
});

/**
 * Gestion des erreurs lors de la requete avec le serveur backend
 */
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async function (error) {
    const originalRequest = error.config;

    if (typeof error.response === "undefined") {
      alert(
        "Une erreur de serveur/réseau s'est produite. " +
          "CORS pourrait être le problème. " +
          "Contactez l'administrateur du site concernant l'erreur."
      );
      return Promise.reject(error);
    }

    if (error.response.status === 401 && originalRequest.url === baseURL + "token/refresh/") {
      logout_user();
      window.location.assign("/connexion/");
      return Promise.reject(error);
    }

    console.dir(error.response);

    // Générer un nouveau access_token s'il a expiré durant la session
    // def 401    Unauthorized
    if (
      error.response.data.code === "token_not_valid" &&
      error.response.status === 403 &&
      error.response.statusText === "Forbidden"
    ) {
      const refreshToken = localStorage.getItem("refresh_token");

      if (refreshToken) {
        const tokenParts = JSON.parse(atob(refreshToken.split(".")[1]));

        // Date d'expiration dans le token est en secondes, alors que now() donne des millisecondes
        const now = Math.ceil(Date.now() / 1000);
        console.log(tokenParts.exp);

        if (tokenParts.exp > now) {
          return axiosInstance
            .post("/token/refresh/", { refresh: refreshToken })
            .then((response) => {
              localStorage.setItem("access_token", response.data.access);
              localStorage.setItem("refresh_token", response.data.refresh);

              axiosInstance.defaults.headers["Authorization"] = "JWT " + response.data.access;
              originalRequest.headers["Authorization"] = "JWT " + response.data.access;

              return axiosInstance(originalRequest);
            })
            .catch((error) => {
              APIError.unhandledException(error);
            });
        } else {
          logout_user();
          window.location.assign("/connexion/");
        }
      } else {
        logout_user();
        window.location.assign("/connexion/");
      }
    }

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
 * Déconnecter l'utilisateur du site, retire les cookies de session
 */
export function logout_user() {
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
  axiosInstance.defaults.headers["Authorization"] = null;
}

/**
 * Retourner l'identifiant et le login de l'hôte rejoint
 * @returns Objet avec informations de l'hôte
 */
export function get_hote() {
  return JSON.parse(localStorage.getItem("hote_rejoint"));
}

/**
 * Classe d'exception pour les erreurs API
 */
export class APIError extends Error {
  /**
   * @param {*} message   Message personnalisé
   * @param {*} response  Réponse HTTP
   */
  constructor(message = "", response) {
    super((message = message));
    Error.captureStackTrace(this, APIError);

    this.response = response;
  }

  /**
   * Alerter d'une exception non gérée
   * @param {*} exception Exception
   * @param {*} message   Message personnalisé
   * @static
   */
  static unhandledException(exception, message = "") {
    const text =
      (message ? message : "Erreur HTTP") +
      ` : ${exception.response.status} ${exception.response.statusText}. Contactez l'administrateur du site concernant l'erreur.`;

    console.error(text, exception.response);
    //alert(text);
  }
}

/**
 * Retourner ...
 * @returns true or false
 */
export async function apiDeleteCocktail(idCocktail) {
  let ok = true;

  await axiosInstance.delete("cocktails/" + idCocktail).catch((error) => {
    ok = false;
    APIError.unhandledException(`Erreur suppression cocktail ${idCocktail}`, error);
  });

  return ok;
}

/**
 * Retourner l'identifiant et le login de l'hôte rejoint
 * @returns Objet avec informations de l'hôte
 */
export async function apiDeleteIngredient(idIngredient) {
  let ok = true;

  await axiosInstance.delete("ingredients/detail/" + idIngredient).catch((error) => {
    ok = false;
    APIError.unhandledException(`Erreur suppression ingrédients ${idIngredient}`, error);
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
    .catch((error) => {
      APIError.unhandledException(`Erreur récupération cocktail`, error);
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
    .catch((error) => {
      APIError.unhandledException(`Erreur récupération ingredient solo`, error);
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
    .catch((error) => {
      APIError.unhandledException(`Erreur récupération cocktails`, error);
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
    .catch((error) => {
      APIError.unhandledException(`Erreur récupération cocktails`, error);
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
    .catch((error) => {
      APIError.unhandledException(`Erreur récupération ingrédients`, error);
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
    .catch((error) => {
      ok = false;
      APIError.unhandledException(`Erreur modification image cocktail`, error);
    });

  return ok;
}

export async function apiAddIngredientsToCocktail(id, ingredients) {
  let ok = true;

  ingredients.forEach((elt) => {
    elt.idcocktail = id;
  });

  await axiosInstance.post(`contenir/${id}/`, ingredients).catch((error) => {
    ok = false;
    APIError.unhandledException(`Erreur ajout ingrédients au cocktail ${id}`, error);
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
    .catch((error) => {
      ok = false;
      APIError.unhandledException(`Erreur création cocktail`, error);
    });

  if (!ok) return;

  if (image) ok = await apiUpdateCocktailImage(createdId, image);

  if (!ok) return;

  if (ingredients) ok = apiAddIngredientsToCocktail(createdId, ingredients);

  return ok;
}

export async function apiCreateIngredient(ingredient) {
  let ok = true;
  await axiosInstance.post("/ingredients/", ingredient).catch((error) => {
    ok = false;
    APIError.unhandledException(`Erreur création ingredient`, error);
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
    .catch((error) => {
      ok = false;
      APIError.unhandledException(`Erreur modification cocktail`, error);
    });

  if (!ok) return;

  if (image) ok = await apiUpdateCocktailImage(cocktail.id, image);

  if (!ok) return;

  if (ingredients) ok = apiAddIngredientsToCocktail(cocktail.id, ingredients);

  return ok;
}

export async function apiUpdateIngredient(ingredient) {
  let ok = true;

  await axiosInstance.patch(`ingredients/detail/${ingredient.id}/`, ingredient).catch((error) => {
    ok = false;
    APIError.unhandledException(`Erreur modification ingredient`, error);
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
    .catch((error) => {
      APIError.unhandledException(`Erreur récupération stock d'ingrédients`, error);
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

  await axiosInstance.put(`stockupdate/${id}/`, { enreserve: stock }).catch((error) => {
    ok = false;
    APIError.unhandledException(`Erreur modification stock ingrédient ${id} pour ${stock}`, error);
  });

  return ok;
}

export async function apiDeleteCocktailsProposer(id) {
  let ok = true;

  await axiosInstance.delete(`/proposer/detail/${id}/`).catch((error) => {
    ok = false;
    APIError.unhandledException(`Erreur suppression proposition cocktails ${id}`, error);
  });
  return ok;
}

export async function apiGetCocktailsProposer2(id) {
  let ok = true;

  await axiosInstance.get(`/proposer/detail/${id}/`).catch((error) => {
    ok = false;
    APIError.unhandledException(`Erreur get proposition cocktails ${id}`, error);
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
    .catch((error) => {
      /*alert(
        `Erreur get note utilisateur pour cocktail ${id}`, error
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
    .catch((error) => {
      APIError.unhandledException(`Erreur get moyenne cocktail ${id}`, error);
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
    .catch((error) => {
      ok = false;
      APIError.unhandledException(`Erreur noter ${note} cocktail ${id} pour`, error);
    });

  // Récupérer la nouvelle moyenne du cocktail
  if (ok) {
    updatedAvg = await apiGetCocktailMoyenne(id);
  }

  return updatedAvg;
}

/**
 * Enlever la note d'un utilisateur pour un cocktail
 * @param {int} id        ID du cocktail
 * @returns {number|null} Nouvelle note moyenne
 */
export async function apiDeleteNoteCocktail(id) {
  let ok = true;
  let updatedAvg;

  // Noter le cocktail
  await axiosInstance.delete(`/notes/${get_user().id}/${id}/`).catch((error) => {
    ok = false;
    APIError.unhandledException(`Erreur suppression note cocktail ${id} pour`, error);
  });

  // Récupérer la nouvelle moyenne du cocktail
  if (ok) {
    updatedAvg = await apiGetCocktailMoyenne(id);
  }

  return updatedAvg;
}

/**
 * Rejoindre/quitter un hôte
 * @param {string} host Login de l'hôte. Si vide, quitter l'hôte actuel
 */
export async function apiJoinHost(host = "") {
  const create_cookie = (login, id) => {
    localStorage.setItem("hote_rejoint", JSON.stringify({ login: login, id: id }));
  };

  const delete_cookie = () => {
    localStorage.removeItem("hote_rejoint");
  };

  await axiosInstance
    .patch("joindre_hote/" + (is_logged() ? get_user().id + "/" : ""), {
      hote_login: host,
    })
    .then((response) => {
      // Vérifier que l'hôte existe
      if (response.status === 200) {
        // Si le login n'est pas vide, on le rejoint...
        if (host) {
          create_cookie(host, response.data["id_hote"]);
        } else {
          delete_cookie(); // ...sinon, on quitte
        }
      }
    })
    .catch((error) => {
      if (error.response.status === 404) {
        throw new APIError("L'hôte " + host + " n'existe pas.", error.response);
      } else {
        APIError.unhandledException(error);
      }
    });
}

/**
 * Se connecter à un compte
 * @param {*} login     Nom d'utilisateur
 * @param {*} password  Mot de passe
 */
export async function apiUserConnect(login, password) {
  await axiosInstance
    .post(`token/`, {
      user_name: login,
      password: password,
    })
    .then(({ data }) => {
      localStorage.setItem("access_token", data.access);
      localStorage.setItem("refresh_token", data.refresh);
      axiosInstance.defaults.headers["Authorization"] =
        "JWT " + localStorage.getItem("access_token");
    })
    .catch((error) => {
      if (error.response.status === 401) {
        throw new APIError("Nom d'utilisateur ou mot de passe invalide.", error.response);
      } else if (error.response.status === 400) {
        throw new APIError("Tous les champs sont obligatoires.", error.response);
      } else {
        APIError.unhandledException(error);
      }
    });
}

/**
 * Se déconnecter du compte
 */
export async function apiUserLogout() {
  await axiosInstance
    .post("user/logout/blacklist/", {
      refresh_token: localStorage.getItem("refresh_token"),
    })
    .catch(() => {})
    .finally(() => {
      // Effacer les cookies de session
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      axiosInstance.defaults.headers["Authorization"] = null;
    });
}

/**
 * Récupérer le profil de l'utilisateur
 * @returns {*} Profil
 */
export async function apiGetCurrentUser() {
  let data;

  await axiosInstance
    .patch("user/current/")
    .then((response) => {
      data = response.data;
    })
    .catch((error) => {
      APIError.unhandledException(error);
    });

  return data;
}

/**
 * Mettre à jour le profil de l'utilisateur
 * @param {*} data Nouvelles données
 */
export async function apiUpdateUserProfile(data) {
  let updatedData;

  await axiosInstance
    .patch("user/current/", data)
    .then(({ data }) => {
      updatedData = data;
    })
    .catch((error) => {
      if (error.response.status === 400) {
        if (error.response.data.user_name)
          throw new APIError(error.response.data.user_name, error.response);
        if (error.response.data.email)
          throw new APIError(error.response.data.email, error.response);
        if (error.response.data.password)
          throw new APIError(error.response.data.password, error.response);
      }

      APIError.unhandledException(error);
    });

  return updatedData;
}

/**
 * Créer un nouveau compte
 * @param {*} data Nouvelles données
 */
export async function apiCreateAccount(data) {
  let updatedData;

  await axiosInstance.post(`user/register/`, data).catch((error) => {
    if (error.response.status === 409)
      throw new APIError("Le nom d'utilisateur ou l'e-mail est déjà utilisé.", error.response);
    if (error.response.status === 400) {
      if (error.response.data.password)
        throw new APIError(error.response.data.password, error.response);
    }

    APIError.unhandledException(error);
  });

  return updatedData;
}

export default axiosInstance;
