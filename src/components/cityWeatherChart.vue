<template>
  <div>
    <div class="city-name">{{ cityName }}, {{ cityCountry }}</div>
    <apexchartVue
      type="line"
      width="550"
      class="apex-chart"
      :options="chartOptions"
      :series="series"
    ></apexchartVue>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import axios from "axios";

export default Vue.extend({
  name: "CityWeatherChart",
  props: {
    cityID: Number,
  },
  data() {
    return {
      cityName: "",
      cityCountry: "",
      temperaturesInTime: [],
      humidityInTime: [],
      series: [
        {
          name: "Temperature, ℃",
          data: [],
        },
        {
          name: "Humidity, %",
          data: [],
        },
      ],
      chartOptions: {
        title: {
          text: "Humidity and Temperature over time:",
        },
        chart: {
          type: "line",
          height: 350,
        },
        xaxis: {
          type: "datetime",
        },
        tooltip: {
          x: {
            format: "HH:mm:ss",
          },
        },
      },
    };
  },
  methods: {
    async getTemperaturesAndHumidity() {
      try {
        let response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?id=${this.cityID}&appid=86f87de97bef2118149359dbdac79884&units=metric`
        );
        this.cityCountry = response.data.sys.country;
        this.cityName = response.data.name;
        this.temperaturesInTime.push([Date.now(), response.data.main.temp]);
        this.humidityInTime.push([Date.now(), response.data.main.humidity]);
      } catch (error) {
        console.log(error);
      }
      this.series = [
        {
          name: "Temperature, ℃",
          data: this.temperaturesInTime,
        },
        {
          name: "Humidity, %",
          data: this.humidityInTime,
        },
      ];
    },
  },
  created() {
    this.getTemperaturesAndHumidity();
  },
  mounted() {
    setInterval(() => {
      this.getTemperaturesAndHumidity();
    }, 5000);
  },
});
</script>
<style scoped>
.city-name {
  display: flex;
  justify-content: center;
  margin-bottom: 15px;
  font-weight: bold;
  font-size: 15pt;
}
</style>
