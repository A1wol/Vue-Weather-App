<template>
  <div class="weather-view">
    <b-container
      ><div v-if="getLoggedUser.id !== 0">
        <b-row class="justify-content-center">
          <b-col>
            <div><CitySelect /> <CityTable :key="componentKey" /></div>
          </b-col>
          <b-col cols lg="3" class="user-info"> <UserInfo /></b-col>
        </b-row>
      </div>
      <div v-else>You have to login yourself first!</div>
    </b-container>
  </div>
</template>

<script lang="ts">
import CitySelect from "@/components/citySelect.vue";
import CityTable from "@/components/cityTable.vue";
import UserInfo from "@/components/userInfo.vue";
import Vue from "vue";
import { mapGetters } from "vuex";

export default Vue.extend({
  name: "WeatherView",
  components: { CitySelect, CityTable, UserInfo },
  data() {
    return {
      componentKey: 0,
    };
  },
  methods: {
    forceComponentRerender() {
      this.componentKey++;
    },
  },
  computed: {
    ...mapGetters(["getLoggedUser"]),
  },
  mounted() {
    setInterval(() => {
      this.forceComponentRerender();
    }, 60000);
  },
});
</script>
<style scoped>
.weather-view {
  min-width: 500px;
  width: 100vh;
  min-height: 520px;
  max-height: 600px;
}
</style>
