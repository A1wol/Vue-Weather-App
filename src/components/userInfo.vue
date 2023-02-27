<template>
  <div>
    <div class="user-icon h1">
      <b-avatar :text="getLoggedUser.surname[0]" variant="primary"></b-avatar>
    </div>
    <div class="user-info">
      {{ getLoggedUser.name }} {{ getLoggedUser.surname }}
    </div>
    <div style="display: flex; justify-content: center" class="mt-4">
      {{ currentTime }}
    </div>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import { mapGetters } from "vuex";
import moment from "moment";

export default Vue.extend({
  name: "userInfo",
  data() {
    return { currentTime: "" };
  },
  computed: {
    ...mapGetters(["getLoggedUser"]),
  },
  created() {
    this.currentTime = `${moment().format("HH:mm:ss")}, ${moment().format(
      "dddd"
    )}`;
  },
  mounted() {
    setInterval(() => {
      this.currentTime = `${moment().format("HH:mm:ss")}, ${moment().format(
        "dddd"
      )}`;
    }, 1000);
  },
});
</script>
<style scoped>
.user-icon {
  display: flex;
  justify-content: center;
}
.user-info {
  display: flex;
  justify-content: center;
}
</style>
