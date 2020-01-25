import router from "../router";
import * as firebase from 'firebase/app'
import "firebase/auth"

const state = {
    signup: {
        email: "",
        password: ""
    },
    signUpError: "",
    signupLoading: false
}

const actions = {
    async addUser({ dispatch }) {
        let res = await dispatch('validemail')
        if (state.signup.email == "" || state.signup.password == "") {
            state.signUpError = "* Fill Required Details";
        } else if (!res) {
            state.signUpError = "*Invalid email";
        } else {
            state.signupLoading = true;
            firebase.auth().createUserWithEmailAndPassword(state.signup.email, state.signup.password).then(() => {
                router.push("/login");
                state.signupLoading = false;
            }).catch(function (error) {
                state.signUpError = error.message;
                state.signupLoading = false;
            });
        }
    },
    routeSignup() {
        state.signup.email = "";
        state.signup.password = "";
        state.signUpError = "";
        router.push("/signup");
    },
    validemail({ state }) {
        //eslint-disable-next-line
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(state.signup.email);
    }
}

export default ({
    namespaced: true,
    state, actions
})