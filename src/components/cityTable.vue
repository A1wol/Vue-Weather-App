<template>
  <div>
    <div>
      <b-list-group>
        <div class="mb-2" align="right">
          <b-button
            v-if="getCurrentlyObservedCities.length > 0"
            variant="danger"
            @click="$store.commit('removeObservedCities')"
            >Clear the City Table</b-button
          >
        </div>
        <div
          v-if="getCurrentlyObservedCities.length > 0"
          class="city-list"
          :class="getCurrentlyObservedCities.length > 2 ? 'city-select' : ''"
        >
          <b-list-group-item
            v-for="city in getCurrentlyObservedCities"
            :key="city.id"
            ><div>
              {{ city.name }},
              {{ city.country }}
            </div>
            <div>
              Temperature:
              {{ getCityTemperature(city.id) }} Celsius, Humidity:
              {{ getCityHumidity(city.id) }}%
              <b-img :src="getWeatherIcon(city.id)" />
              <div style="float: right">
                <b-button
                  variant="outline-info"
                  @click="navigateToCityDetails(city.id)"
                  ><b-icon icon="graph-up" aria-hidden="true"></b-icon
                ></b-button>
              </div>
            </div>
          </b-list-group-item>
        </div>
        <div v-else>Add a city to see the weather details!</div>
      </b-list-group>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { mapGetters } from "vuex";
import axios from "axios";

export default Vue.extend({
  name: "cityTable",
  data() {
    return {
      citiesWeatherDetails: [],
    };
  },
  computed: {
    ...mapGetters(["getCurrentlyObservedCities"]),
  },
  watch: {
    getCurrentlyObservedCities: function () {
      this.getCitiesTemperaturesAndHumidities();
    },
  },
  methods: {
    async getCitiesTemperaturesAndHumidities() {
      for (let i = 0; i < this.getCurrentlyObservedCities.length; i++) {
        try {
          let response = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?lat=${this.getCurrentlyObservedCities[i].coord.lat}&lon=${this.getCurrentlyObservedCities[i].coord.lon}&appid=86f87de97bef2118149359dbdac79884&units=metric`
          );
          this.citiesWeatherDetails.push(response.data);
        } catch (error) {
          console.log(error);
        }
      }
    },
    getCityTemperature(cityID: number) {
      if (
        this.citiesWeatherDetails.length > 0 &&
        this.citiesWeatherDetails.find((el) => el.id === cityID) !== undefined
      ) {
        return this.citiesWeatherDetails.find((el) => el.id === cityID).main
          .temp;
      }
    },
    getCityHumidity(cityID: number) {
      if (
        this.citiesWeatherDetails.length > 0 &&
        this.citiesWeatherDetails.find((el) => el.id === cityID) !== undefined
      ) {
        return this.citiesWeatherDetails.find((el) => el.id === cityID).main
          .humidity;
      }
    },
    getWeatherIcon(cityID: number) {
      if (
        this.citiesWeatherDetails.length > 0 &&
        this.citiesWeatherDetails.find((el) => el.id === cityID) !==
          undefined &&
        cityID !== undefined
      ) {
        return `http://openweathermap.org/img/w/${
          this.citiesWeatherDetails.find((el) => el.id === cityID).weather[0]
            .icon
        }.png`;
      }
    },
    navigateToCityDetails(cityID: number) {
      this.$router.push(`/cities/${cityID}`);
    },
  },
  mounted() {
    this.getCitiesTemperaturesAndHumidities();
  },
});
</script>

<style scoped>
.city-select {
  overflow-y: scroll;
}
.city-list {
  max-height: 400px;
  border: 1px solid black;
}
</style>
