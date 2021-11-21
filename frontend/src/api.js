import axios from "axios";

const baseUrl = process.env.REACT_APP_BASE_URL;

const instance = axios.create({
  baseURL: baseUrl,
  timeout: 30000, // 30 secs
  headers: { "Content-Type": "application/json" },
  validateStatus: function (status) {
    return (
      (status >= 200 && status < 300) ||
      status === 401 ||
      status === 422 ||
      status === 400
    ); // default
  },
});

function setAccessTokenInLocalStorage(token) {
  const { localStorage } = window;
  try {
    if (token !== undefined) {
      return localStorage.setItem("token", token);
    } else {
      return;
    }
  } catch (e) {
    // memory full
    return "";
  }
}

function setInviteLinkInLocalStorage(link) {
  const { localStorage } = window;
  try {
    if (link !== undefined) {
      return localStorage.setItem("invite_link", link);
    } else {
      return;
    }
  } catch (e) {
    // memory full
    return "";
  }
}

function getInviteLinkFromLocalStorage() {
  const { localStorage } = window;
  const invite_link = localStorage.getItem("invite_link");
  return invite_link || "";
}

function setInviteTypeInLocalStorage(type) {
  const { localStorage } = window;
  try {
    if (type !== undefined) {
      return localStorage.setItem("invite_type", type);
    } else {
      return;
    }
  } catch (e) {
    // memory full
    return "";
  }
}

function getInviteTypeFromLocalStorage() {
  const { localStorage } = window;
  const invite_link = localStorage.getItem("invite_type");
  return invite_link || "";
}

function setUserStepInLocalStorage(user_step) {
  const { localStorage } = window;
  try {
    return localStorage.setItem("user_step", user_step);
  } catch (e) {
    // memory full
    return "";
  }
}

function getAccessTokenFromLocalStorage() {
  const { localStorage } = window;
  const token = localStorage.getItem("token");
  return token || "";
}

function setOrgKeyInLocalStorage(org_key) {
  const { localStorage } = window;
  try {
    return localStorage.setItem("org_key", org_key);
  } catch (e) {
    // memory full
    return "";
  }
}

function getOrgKeyFromLocalStorage() {
  const { localStorage } = window;
  const org_key = localStorage.getItem("org_key");
  return org_key || "";
}

/**
 * Selector to get the current organisation from store
 * NOTE: May need to relocate this function
 * @param {Object} state Redux Store State
 * @returns Object Current Organisation Object from store
 */
function getCurrentOrganizationFromStore(state) {
  const currentOrgKey = getOrgKeyFromLocalStorage();
  return state.user?.orgs?.find((org) => org.key === currentOrgKey);
}

const getCurrentOrganisationFromStore = getCurrentOrganizationFromStore;

/**
 * Selector to select User Admin status from Redux state
 * @param {Object} state Redux store state object
 * @returns Boolean
 */
function isAdmin(state) {
  const orgKey = getOrgKeyFromLocalStorage();
  const { userAccountsDetails } = state.user;
  return (
    userAccountsDetails?.is_super_admin ||
    userAccountsDetails?.isadmin_orgs?.includes(orgKey)
  );
}

function clearLocalStorage(statusRedirect = true) {
  const { localStorage } = window;
  localStorage.clear();
  if (statusRedirect === true) {
    window.location.href = "/signin";
  }
}

function getStripeCustomerPortalLink(orgKey = null, returnUrl = null) {
  if (!orgKey) {
    orgKey = getOrgKeyFromLocalStorage();
  }

  if (!returnUrl) {
    returnUrl = window.location.href;
  }

  return post(`/pool/customer-portal/${orgKey}`, {
    return_url: returnUrl,
  }).then((res) => res.url);
}

export async function login(url, paramObj, headers = {}) {
  delete instance.defaults.headers.common["Authorization"];

  return instance
    .post(url, paramObj)
    .then((response) => {
      switch (response.status) {
        case 200:
          return response.data;
        case 401:
          return response.data;
        case 422:
          return { status: false, message: response.data.message };
        default:
          return {
            status: false,
            message: "Something went wrong!",
            redirect_to_login: true,
          };
      }
    })
    .then((response) => {
      if (response.success) {
        return response.data;
      } else {
        return response;
      }
    })
    .catch((error) => {
      return {
        status: false,
        message: error.message || "Something went to wrong! Try again later",
      };
    });
}
function forgotPassword(url, paramObj, headers = {}) {
  delete instance.defaults.headers.common["Authorization"];

  return instance
    .post(url, paramObj)
    .then((response) => {
      switch (response.status) {
        case 200:
          return { status: false, message: response.data.message };
        case 401:
          return { status: false, message: response.data.description };
        default:
          return {
            status: false,
            message: "Something went wrong!",
          };
      }
    })
    .then((response) => {
      if (response.success) {
        return response.data;
      } else {
        return response;
      }
    })
    .catch((error) => {
      return {
        status: false,
        message: error.message || "Something went to wrong! Try again later",
      };
    });
}

function checkToken(url, token) {
  instance.defaults.headers.common["Authorization"] = "Bearer " + token;

  return instance
    .post(url, {})
    .then((response) => {
      return response.data;
    })
    .then((response) => {
      if (response.success) {
        return response;
      } else {
        return response;
      }
    })
    .catch((error) => {
      return {
        status: false,
        message: error.message || "Something went to wrong! Try again later",
      };
    });
}

function post(url, paramObj, headers = {}) {
  instance.defaults.headers.common["Authorization"] =
    "Bearer " + getAccessTokenFromLocalStorage();

  return instance
    .post(url, paramObj)
    .then((response) => {
      return response.data;
    })
    .then((response) => {
      if (response.success) {
        return response;
      } else {
        return response;
      }
    })
    .catch((error) => {
      return {
        status: false,
        message: error.message || "Something went to wrong! Try again later",
        response: error.response?.data,
      };
    });
}

function put(url, paramObj, headers = {}) {
  instance.defaults.headers.common["Authorization"] =
    "Bearer " + getAccessTokenFromLocalStorage();
  return instance
    .put(url, paramObj)
    .then((response) => {
      return response.data;
    })
    .then((response) => {
      if (response.success) {
        return response;
      } else {
        return response;
      }
    })
    .catch((error) => {
      return {
        status: false,
        message: error.message || "Something went to wrong! Try again later",
      };
    });
}

function get(url, paramObj = {}, headers = {}) {
  instance.defaults.headers.common["Authorization"] =
    "Bearer " + getAccessTokenFromLocalStorage();
  return instance
    .get(url, { params: paramObj })
    .then((response) => {
      if (response.status === 200 || response.status === 201) {
        return response.data;
      } else if (response.status === 201) {
        return response.data;
      } else if (response.status === 401) {
        return {
          status: false,
          response_status: response.status,
          unauthenticated: true,
          redirect_to_login: true,
        };
      }
      return {
        success: false,
        message: response.message || "Ill formed response!",
        redirect_to_login: true,
      };
    })
    .then((response) => {
      if (response.success) {
        return response;
      } else {
        return response;
      }
    })
    .catch((error) => {
      return {
        status: false,
        message: error.message || "Something went wrong! Try again later",
      };
    });
}
function deleteM(url, payload = {}, headers = {}) {
  instance.defaults.headers.common["Authorization"] =
    "Bearer " + getAccessTokenFromLocalStorage();
  return instance
    .delete(url, { data: payload })
    .then((response) => {
      if (response.status === 200) {
        return response.data;
      } else if (response.status === 401) {
        return { status: false, unauthenticated: true };
      } else if (response.status === 201) {
        return response.data;
      }
      return {
        success: false,
        message: response.message || "Ill formed response!",
      };
    })
    .then((response) => {
      if (response.success) {
        return response;
      } else {
        return response;
      }
    })
    .catch((error) => {
      return {
        status: false,
        message: error.message || "Something went wrong! Try again later",
      };
    });
}

function setGameProgressInLocalStorage(gameProgress) {
  const { localStorage } = window;
  try {
    return localStorage.setItem("game_progress", gameProgress);
  } catch (e) {
    return 0;
  }
}

function getGameProgressInLocalStorage() {
  const { localStorage } = window;
  const game_progress = localStorage.getItem("game_progress");
  return game_progress || 0;
}

function urlSet(path) {
  return baseUrl + path.replace(/^\/*/, "/");
}

export default {
  login,
  forgotPassword,
  get,
  post,
  put,
  deleteM,
  checkToken,
  getAccessTokenFromLocalStorage,
  setAccessTokenInLocalStorage,
  setUserStepInLocalStorage,
  setGameProgressInLocalStorage,
  getGameProgressInLocalStorage,
  clearLocalStorage,
  setOrgKeyInLocalStorage,
  getOrgKeyFromLocalStorage,
  getCurrentOrganisationFromStore,
  getCurrentOrganizationFromStore,
  setInviteLinkInLocalStorage,
  getInviteLinkFromLocalStorage,
  setInviteTypeInLocalStorage,
  getInviteTypeFromLocalStorage,
  urlSet,
  isAdmin,

  // stripe commons
  getStripeCustomerPortalLink,
};
