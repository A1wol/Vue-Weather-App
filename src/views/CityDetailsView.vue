<template>
  <div class="city-details">
    <b-container>
      <div><cityWeatherChart :cityID="currentCityID" /></div
    ></b-container>
  </div>
</template>

<script lang="ts">
import axios from "axios";
import Vue from "vue";
import { mapGetters } from "vuex";
import cityWeatherChart from "@/components/cityWeatherChart.vue";

export default Vue.extend({
  name: "CityDetailsView",
  components: { cityWeatherChart },
  data() {
    return {
      currentCityID: parseInt(this.$route.params.id),
      currentCityWeather: {},
    };
  },
  methods: {
    async getCurrentCityWeather() {
      try {
        this.currentCityWeather = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?id=${this.currentCityID}&appid=86f87de97bef2118149359dbdac79884&units=metric`
        );
      } catch (error) {
        console.log(error);
      }
    },
  },
  computed: {
    ...mapGetters(["getLoggedUser"]),
  },
  mounted() {
    this.getCurrentCityWeather();
  },
});
</script>
