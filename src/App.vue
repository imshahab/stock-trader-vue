<template>
    <div>
        <header-el></header-el>
        <transition name="fade" appear mode="out-in">
            <router-view></router-view>
        </transition>
    </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex"
import firebase from "firebase"
import HeaderEl from "./components/HeaderEl.vue"
import stocks from "./data/stocks"
export default {
    components: {
        "header-el": HeaderEl,
    },
    methods: {
        resetGame() {
            this.initStocks()
            this.resetFunds()
            this.resetStocks()
            this.resetSkippedDays()
        },
        ...mapActions([
            "initStocks",
            "resetFunds",
            "resetStocks",
            "resetSkippedDays",
            "setUser",
            "getData",
        ]),
        alertCustomError() {
            this.$buefy.dialog.alert({
                title: "Game Over",
                message: "You went bankrupt! Start again?",
                type: "is-danger",
                hasIcon: true,
                icon: "times-circle",
                iconPack: "fa",
                ariaRole: "alertdialog",
                ariaModal: true,
                onConfirm: this.resetGame(),
            })
        },
    },
    computed: {
        ...mapGetters(["funds", "portfolioStocks", "skippedDays"]),
    },
    created() {
        if (firebase.auth().currentUser) {
            this.getData()
            this.setUser(firebase.auth().currentUser.email)
        }
    },
    watch: {
        funds(value) {
            if (value < 100 && this.portfolioStocks == 0) {
                this.alertCustomError()
            }
        },
        skippedDays(value) {
            const arr = stocks.filter((stock) => {
                return stock.price <= this.funds
            })
            if (value == 3 && arr.length == 0 && this.portfolioStocks == 0) {
                this.alertCustomError()
            }
        },
        $route(to) {
            document.title = to.meta.title || "Stock Trader"
        },
    },
}
</script>

<style lang="scss" src="@/assets/variables.scss">
.fade-enter {
    opacity: 0;
}
.fade-enter-active {
    animation: fade-in 1s cubic-bezier(0.39, 0.575, 0.565, 1) both;
}
.fade-leave-active {
    animation: fade-out 1s ease-out both;
    opacity: 0;
}

@keyframes fade-in {
    0% {
        opacity: 0;
    }
    100% {
        opacity: 1;
    }
}

@keyframes fade-out {
    0% {
        opacity: 1;
    }
    100% {
        opacity: 0;
    }
}
</style>
