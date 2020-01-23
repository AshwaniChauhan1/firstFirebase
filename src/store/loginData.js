import router from "../router";
import * as firebase from 'firebase/app'
import "firebase/auth"

const state = {
    login: {
        email: "",
        password: "",
    },
    loginError: "",
    loginLoading: false,
    loginRole: ""
}
const actions = {
    async loginUser({ dispatch }) {
        let res = await dispatch('validemail')
        if (state.login.email === "" || state.login.password === "") {
            state.loginError = "* Fill Required Details";
        } else if (!res) {
            state.loginError = "*Invalid email";
        }
        else {
            state.loginLoading = true;
            firebase.auth().signInWithEmailAndPassword(state.login.email, state.login.password).catch(function (error) {
                state.loginError = error.message;
            });
            firebase.auth().onAuthStateChanged(function (user) {
                if (user) {
                    state.loginLoading = false;
                    router.push("/profile");
                    localStorage.token = user.refreshToken;
                    state.login.email = "";
                    state.login.password = "";
                }
            });
        }
    },
    validemail({ state }) {
        //eslint-disable-next-line
        var re = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
        return re.test(state.login.email);
    },
    routeLogin() {
        state.loginError = "";
        router.push("/login");
    },
    logout() {
        localStorage.token = "";
        router.push("/login");
    },
}

export default ({
    namespaced: true,
    state, actions
})