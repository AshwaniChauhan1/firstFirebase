<template>
  <div>
    <div class="p-5 bg-secondary text-white text-center">
      <h1>SignUp</h1>
    </div>
    <b-container>
      <b-row class="justify-content-lg-center">
        <b-col lg="6">
          <b-form class="p-5" @submit.prevent>
            <p class="text-danger">{{signUpError}}</p>
            <b-form-group label="Email:">
              <b-form-input
                type="text"
                required
                placeholder="Enter Email"
                v-model="signup.email"
              ></b-form-input>
            </b-form-group>
            <b-form-group label="Password">
              <b-form-input
                type="password"
                required
                placeholder="Enter Password"
                v-model="signup.password"
              ></b-form-input>
            </b-form-group>
            <b-button type="submit" @click="add_user" variant="dark">
              <b-spinner class="mx-3" small v-if="signupLoading"></b-spinner>
              <span v-if="!signupLoading">SignUp</span>
            </b-button>
          </b-form>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>
<script>
import { mapState, mapActions } from "vuex";
export default {
  name: "signup",
  computed: {
    ...mapState("signupData", ["signup", "signUpError", "signupLoading"])
  },
  methods: {
    ...mapActions({
      add_user: "signupData/addUser"
    })
  }
};
</script>