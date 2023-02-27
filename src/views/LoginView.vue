<template>
  <div class="login-view">
    <b-container>
      <b-row>
        <b-col class="justify-content-center"
          ><b-form @submit="onSubmit" @reset="onReset">
            <b-form-group id="input-group-2" label="Login:" label-for="input-2">
              <b-form-input
                id="input-2"
                v-model="form.login"
                placeholder="Enter your login"
                required
              ></b-form-input>
            </b-form-group>
            <b-form-group
              id="input-group-1"
              label="Password:"
              label-for="input-1"
            >
              <b-form-input
                id="input-1"
                v-model="form.password"
                type="password"
                placeholder="Enter your password"
                required
              ></b-form-input>
            </b-form-group>

            <div class="login-buttons">
              <b-button type="submit" variant="outline-success" class="mr-4"
                >Submit</b-button
              >
              <b-button type="reset" variant="outline-danger">Reset</b-button>
            </div>
          </b-form></b-col
        >
      </b-row>
    </b-container>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "LoginView",
  data() {
    return {
      form: {
        password: "",
        login: "",
      },
      users: [
        {
          id: 1,
          login: "jank12",
          password: "jankpass1",
          name: "Jan",
          surname: "Kowalski",
        },
        {
          id: 2,
          login: "mariad32",
          password: "mariadpass2",
          name: "Maria",
          surname: "Dubiel",
        },
        {
          id: 3,
          login: "katarzynad05",
          password: "katarzynadpass3",
          name: "Katarzyna",
          surname: "Drzyzga",
        },
      ],
    };
  },
  methods: {
    onSubmit(event: Event) {
      event.preventDefault();
      let userToBeLoggedIn = this.users.find(
        (el) => el.login === this.form.login
      );
      if (userToBeLoggedIn === undefined) {
        this.$bvToast.toast("User unknown!"),
          {
            autoHideDelay: 5000,
            solid: true,
          };
      }
      if (userToBeLoggedIn !== undefined) {
        if (userToBeLoggedIn?.password === this.form.password) {
          this.$store.commit("setUser", userToBeLoggedIn);
          this.$router.push("/weather");
        } else {
          this.$bvToast.toast("Wrong Password!"),
            {
              autoHideDelay: 5000,
              solid: true,
            };
        }
      }
    },
    onReset(event: Event) {
      event.preventDefault();
      this.form.login = "";
      this.form.password = "";
    },
  },
});
</script>
<style scoped>
.login-view {
  min-width: 400px;
}
.login-buttons {
  display: flex;
  justify-content: end;
}
</style>
