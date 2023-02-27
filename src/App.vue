<template>
  <div id="app">
    <div class="justify-content-center mt-5" style="display: flex">
      <b-card style="background-color: rgba(243, 253, 255, 255)">
        <b-navbar pills>
          <b-navbar-brand href="/">Weather App</b-navbar-brand>
          <b-navbar-nav v-if="$router.currentRoute.name === 'cities'">
            <div class="h2 mt-2 mr-4">
              <b-icon-arrow-left
                @click="$router.push('/weather')"
              ></b-icon-arrow-left></div
          ></b-navbar-nav>
          <b-navbar-nav
            ><b-button
              v-if="
                $router.currentRoute.path !== '/login' && getLoggedUser.id === 0
              "
              variant="outline-primary"
              class="mt-2"
              @click="$router.push('/login')"
              ><b-icon
                icon="person-check-fill"
                aria-hidden="true"
                class="mr-2"
              ></b-icon
              >Login</b-button
            ></b-navbar-nav
          >
          <b-navbar-nav
            ><b-button
              v-if="getLoggedUser.id !== 0 && $router.currentRoute.path !== '/'"
              variant="outline-info"
              class="mt-2"
              @click="logout()"
              ><b-icon icon="power" aria-hidden="true"></b-icon>Logout</b-button
            ></b-navbar-nav
          ><b-navbar-nav
            ><b-button
              v-if="getLoggedUser.id !== 0 && $router.currentRoute.path === '/'"
              variant="primary"
              @click="$router.push('/weather')"
              ><b-icon icon="cloud" class="mr-2"></b-icon>Weather
              check</b-button
            ></b-navbar-nav
          >
        </b-navbar>
        <div class="align-content-center mt-4">
          <router-view /></div
      ></b-card>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import { mapGetters } from "vuex";

export default Vue.extend({
  computed: {
    ...mapGetters(["getLoggedUser"]),
  },
  methods: {
    logout() {
      this.$store.commit("logoutUser");
      this.$router.push("/");
      this.$store.commit("removeObservedCities");
    },
  },
});
</script>
<style scoped></style>
