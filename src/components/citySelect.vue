<template>
  <div class="city-select">
    <b-input-group prepend="Search" class="mb-4">
      <b-form-input
        v-model="currentlyChosenCity"
        list="my-list-id"
      ></b-form-input>
      <b-input-group-append>
        <b-button
          variant="outline-primary"
          :disabled="currentlyChosenCity === null"
          @click="addCityToObservedCities()"
          >Add</b-button
        >
      </b-input-group-append>
    </b-input-group>
    <datalist id="my-list-id">
      <option v-for="city in cities" :key="city.id">
        {{ city }}
      </option>
    </datalist>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { mapGetters } from "vuex";
import citiesData from "../../city.list.json";

export default Vue.extend({
  name: "citySelect",
  data() {
    return { currentlyChosenCity: null };
  },
  computed: {
    ...mapGetters(["getLoggedUser"]),
    cities() {
      return Object.values(citiesData);
    },
  },
  methods: {
    addCityToObservedCities() {
      let cityToAdd = JSON.parse(this.currentlyChosenCity);
      this.$store.commit("addObservedCity", cityToAdd);
      this.currentlyChosenCity = null;
    },
  },
});
</script>
