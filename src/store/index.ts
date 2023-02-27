import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    loggedUser: {
      id: 0,
      login: "",
      password: "",
      name: "",
      surname: "",
    },
    currentlyObservedCities: [],
  },
  getters: {
    getLoggedUser(state) {
      return state.loggedUser;
    },
    getCurrentlyObservedCities(state) {
      return state.currentlyObservedCities;
    },
  },
  mutations: {
    setUser(state, user) {
      state.loggedUser = user;
    },
    logoutUser(state) {
      state.loggedUser = {
        id: 0,
        login: "",
        password: "",
        name: "",
        surname: "",
      };
    },
    addObservedCity(state, city) {
      state.currentlyObservedCities.push(city);
    },
    removeObservedCities(state) {
      state.currentlyObservedCities = [];
    },
  },
  actions: {},
  modules: {},
  plugins: [createPersistedState()],
});
