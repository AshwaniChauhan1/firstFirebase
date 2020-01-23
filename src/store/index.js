import Vue from "vue";
import Vuex from "vuex";
import loginData from "./loginData";
import signupData from "./signupData";

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        loginData, signupData
    }
})