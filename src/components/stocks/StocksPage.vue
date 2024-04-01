<template lang="en">
    <section class="section">
        <div class="columns is-multiline is-variable is-4">
            <stock-el v-for="item of stocks" :stock="item"></stock-el>
        </div>
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
        ...mapGetters(["stocks"]),
    },
}
</script>
<style></style>
