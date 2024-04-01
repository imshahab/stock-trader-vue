import Vue from "vue"
import App from "./App.vue"
import { routes } from "./routes.js"
import Buefy from "buefy"
import VueRouter from "vue-router"
import store from "./store/store"
import firebase from "firebase"

const firebaseConfig = {
    apiKey: "AIzaSyA85vU0JivC5kfx8ldF1A7h8_ZR-xE7Q6g",
    authDomain: "random-app-12345.firebaseapp.com",
    databaseURL: "https://random-app-12345-default-rtdb.firebaseio.com",
    projectId: "random-app-12345",
    storageBucket: "random-app-12345.appspot.com",
    messagingSenderId: "1234567890",
    appId: "1:1234567890:web:abcdefghijklmnopqrstuv",
}

Vue.use(Buefy, {
    defaultIconPack: "fas",
})

Vue.use(VueRouter)

Vue.mixin({
    methods: {
        toDollars(value) {
            return "$" + value.toLocaleString()
        },
    },
})

const router = new VueRouter({
    linkActiveClass: "is-active",
    mode: "history",
    routes: routes,
})

router.beforeEach((to, from, next) => {
    if (to.matched.some((record) => record.meta.requiresAuth)) {
        if (!firebase.auth().currentUser) {
            next({
                path: "/login",
                query: {
                    redirect: to.fullPath,
                },
            })
        } else {
            next()
        }
    } else if (to.matched.some((record) => record.meta.requiresGuest)) {
        if (firebase.auth().currentUser) {
            next({
                path: "/stocks",
                query: {
                    redirect: to.fullPath,
                },
            })
        } else {
            next()
        }
    } else {
        next()
    }
})

Vue.config.productionTip = false

firebase.initializeApp(firebaseConfig)

let app

firebase.auth().onAuthStateChanged(() => {
    if (!app) {
        app = new Vue({
            router: router,
            store: store,
            render: (h) => h(App),
        }).$mount("#app")
    }
})
