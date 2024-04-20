import { login, logout, getInfo } from "@/api/user";
import { getToken, setToken, removeToken } from "@/utils/auth";
// import { resetRouter } from "@/router";
import { getFullImgUrl } from "@/utils/index";

const getDefaultState = () => {
  return {
    token: getToken(),
    name: "",
    avatar: "",
  };
};

const state = getDefaultState();

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState());
  },
  SET_TOKEN: (state, token) => {
    state.token = token;
  },
  SET_NAME: (state, name) => {
    state.name = name;
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar;
  },
};

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { username, password } = userInfo;
    return new Promise((resolve, reject) => {
      login({ username: username.trim(), password: password })
        .then((response) => {
          // 通过响应获取后端返回data中传递的token：
          // const { data } = response
          // commit('SET_TOKEN', data.token)
          // commit("SET_TOKEN", "jing");
          // setToken(data.token)

          console.log("login res:\t" + JSON.stringify(response));
          setToken(response.data);
          resolve();
        })
        .catch((error) => {
          console.log("login error:\t" + error);
          reject(error);
        });
    });
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo(state.token)
        .then((response) => {
          const { data } = response;

          if (!data) {
            return reject("Verification failed, please Login again.");
          }

          const { name, avatar } = data;

          commit("SET_NAME", name);
          commit("SET_AVATAR", getFullImgUrl(avatar));
          resolve(data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },

  // user logout
  logout({ commit, state }) {
    // return new Promise((resolve, reject) => {
    // logout(state.token)
    // .then(() => {
    removeToken(); // must remove  token  first
    // resetRouter();
    commit("RESET_STATE");
    // resolve();
    // })
    // .catch((error) => {
    // reject(error);
    // });
    // });
  },

  // remove token
  resetToken({ commit }) {
    return new Promise((resolve) => {
      removeToken(); // must remove  token  first
      commit("RESET_STATE");
      resolve();
    });
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
