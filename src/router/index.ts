import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/login",
    name: "login",
    component: () => import("../views/LoginView.vue"),
  },
  {
    path: "/weather",
    name: "weather",
    component: () => import("../views/WeatherView.vue"),
  },
  {
    path: "/cities/:id",
    name: "cities",
    component: () => import("../views/CityDetailsView.vue"),
  },
  {
    path: "/",
    name: "home",
    component: () => import("../views/HomeView.vue"),
  },
];

const router = new VueRouter({
  routes,
});

export default router;
