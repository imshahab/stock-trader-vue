<template lang="en">
    <section class="section">
        <transition name="fade" mode="out-in">
            <div class="container" v-if="portfolioStocks.length == 0" key="warning">
                <b-message type="is-danger">
                    You haven't purchased any stocks yet. Go to the <router-link to="/stocks">Stocks</router-link> section to purchase some.
                </b-message>
            </div>
            <div class="columns is-multiline is-variable is-4" v-else key="port">
                <stock-el v-for="item of portfolioStocks" :stock="item"></stock-el>
            </div>
        </transition>
    </section>
</template>
<script>
import { mapGetters } from "vuex"
import StockEl from "./StockEl.vue"
export default {
    components: {
        "stock-el": StockEl,
    },
    computed: {
        ...mapGetters(["portfolioStocks"]),
    },
}
</script>
<style>
.fade-enter {
    opacity: 0;
}
.fade-enter-active {
    animation: fade-in 0.5s cubic-bezier(0.39, 0.575, 0.565, 1) both;
}
.fade-leave {
}
.fade-leave-active {
    animation: fade-out 0.5s ease-out both;
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
