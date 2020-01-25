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
                state.loginLoading = false;
            });
            firebase.auth().onAuthStateChanged(function (user) {
                if (user) {
                    state.loginLoading = false;
                    localStorage.token = user.refreshToken;
                    state.login.email = "";
                    state.login.password = "";
                    state.loginError = "";
                    localStorage.email = user.email;
                    localStorage.uid = user.uid;
                    var storage = firebase.storage();
                    var pathReference = storage.ref(`${localStorage.email}/profile.jpg`);
                    pathReference
                        .getDownloadURL()
                        .then(function (url) {
                            localStorage.photoUrl = url;
                            router.push("/profile");
                        })
                        .catch(function (error) {
                            //eslint-disable-next-line
                            console.log(error);
                            router.push("/profile");
                        });
                }
            });
        }
    },
    validemail({ state }) {
        //eslint-disable-next-line
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(state.login.email);
    },
    routeLogin() {
        state.login.email = "";
        state.login.password = "";
        state.loginError = "";
        router.push("/login");
    },
    logout() {
        firebase.auth().signOut().then(function () {
            localStorage.token = "";
            localStorage.email = "";
            localStorage.uid = "";
            localStorage.photoUrl = "";
            router.push("/login");
        }).catch(function (error) {
            //eslint-disable-next-line
            console.log(error);
        });

    },
}

export default ({
    namespaced: true,
    state, actions
})