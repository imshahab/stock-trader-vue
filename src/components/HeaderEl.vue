<template>
    <b-navbar :spaced="true" :shadow="true">
        <template #brand>
            <b-navbar-item tag="router-link" :to="{ name: 'Home' }" exact>
                <h5 class="title is-5">Stock Trader</h5>
            </b-navbar-item>
        </template>
        <template #start>
            <b-navbar-item tag="router-link" :to="{ name: 'Home' }" exact>
                Home
            </b-navbar-item>
            <b-navbar-item
                tag="router-link"
                :to="{ name: 'Portfolio' }"
                v-if="isLoggedIn"
            >
                Portfolio
            </b-navbar-item>
            <b-navbar-item
                tag="router-link"
                :to="{ name: 'Stocks' }"
                v-if="isLoggedIn"
            >
                Stocks
            </b-navbar-item>
        </template>
        <template #end>
            <b-navbar-item
                tag="router-link"
                :to="{ name: 'Login' }"
                v-if="!isLoggedIn"
            >
                Login
            </b-navbar-item>
            <b-navbar-item
                tag="router-link"
                :to="{ name: 'Register' }"
                v-if="!isLoggedIn"
            >
                <a class="button is-primary">
                    <strong>Register</strong>
                </a>
            </b-navbar-item>
            <b-navbar-item tag="div" v-if="isLoggedIn">
                <a class="button is-primary" @click="endDay()">
                    <strong>End Day</strong>
                </a>
            </b-navbar-item>
            <b-navbar-item v-if="isLoggedIn">
                <h6 class="title is-6">Funds: {{ toDollars(funds) }}</h6>
            </b-navbar-item>
            <b-navbar-item v-if="isLoggedIn">
                <h6 class="title is-6">Skipped Days: {{ skippedDays }}</h6>
            </b-navbar-item>
            <b-navbar-dropdown label="Account" v-if="isLoggedIn">
                <b-navbar-item> {{ userEmail }} </b-navbar-item>
                <b-navbar-item @click="saveData()"> Save Data </b-navbar-item>
                <b-navbar-item tag="div">
                    <a class="button is-black" @click="logOut()">
                        <strong>Logout</strong>
                    </a>
                </b-navbar-item>
            </b-navbar-dropdown>
        </template>
    </b-navbar>
</template>
<script>
import { mapGetters } from "vuex"
import { mapActions } from "vuex"
import firebase from "firebase"

export default {
    computed: {
        ...mapGetters([
            "funds",
            "skippedDays",
            "portfolioStocks",
            "stocks",
            "isLoggedIn",
            "userEmail",
        ]),
    },
    methods: {
        ...mapActions(["randomizeStocks", "skipDay"]),
        endDay() {
            if (this.skippedDays < 3) {
                this.randomizeStocks()
                this.skipDay()
                this.$buefy.snackbar.open("Prices updated!")
            } else {
                this.$buefy.snackbar.open(
                    "Can't skip more unless you trade some stocks!"
                )
            }
        },
        async saveData() {
            const data = {
                funds: this.funds,
                skippedDays: this.skippedDays,
                portfolioStocks: this.portfolioStocks,
                stocks: this.stocks,
            }
            firebase
                .database()
                .ref(`users/${firebase.auth().currentUser.uid}/gameData`)
                .set(data)
                .then(() => {
                    this.$buefy.snackbar.open("Data saved!")
                })
                .catch((err) => {
                    this.$buefy.snackbar.open(err.message)
                })
        },
        logOut() {
            firebase
                .auth()
                .signOut()
                .then(() => {
                    this.$router.go({ path: this.$router.path })
                })
        },
    },
}
</script>
<style></style>
