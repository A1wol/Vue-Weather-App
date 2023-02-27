<template>
  <div class="home-view">
    <div class="h2 home-title">Vue Weather App</div>
    <div class="h5 ml-3">
      Application designed and implemented by Adrian Wolan to allow users to:
      <ul>
        <li>Sign in with their login and password</li>
        <li>
          Create a list of watched cities by downloading them from the list
        </li>
        <li>
          Connect to the weather API at regular intervals and download
          temperature and humidity for observed cities
        </li>
        <li>Watch downloaded data in attractive form</li>
        <li>
          Display a page with a graph of temperature and humidity over time
        </li>
      </ul>
      Click "Login" to start!
    </div>
  </div>
</template>
<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "HomeVIew",
  data() {
    return {};
  },
});
</script>
<style scoped>
.home-view {
  min-width: 500px;
  width: 100vh;
  min-height: 520px;
  max-height: 600px;
}
.home-title {
  display: flex;
  justify-content: center;
}
</style>
