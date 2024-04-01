<template lang="en">
    <section class="hero is-medium">
        <div class="hero-body">
            <div class="container has-text-centered">
                <h1 class="has-text-weight-semibold is-size-1-desktop is-size-3-tablet is-size-4-mobile has-text-centered">Master the Markets🤑</h1> 
                <h6 v-if="isLoggedIn" class="has-text-weight-light is-size-6-desktop is-size-7-mobile has-text-centered">Don't forget to save your data</h6> 
                <h6 v-if="isLoggedIn" class="is-size-6-desktop is-size-7-mobile has-text-centered">Click on "End Day" to begin a new day</h6>
                <h6 v-if="!isLoggedIn" class="is-size-6-desktop is-size-7-mobile has-text-centered">Trade, Win, Repeat – Your Virtual Stock Market Playground!</h6>
                <br v-if="isLoggedIn">
                <p v-if="isLoggedIn" class="has-text-weight-semibold has-text-centered">Your funds: {{ toDollars(funds) }}</p>
                <br>
                <b-button v-if="isLoggedIn" type="is-primary" tag="router-link" :to="{ name: 'Stocks' }">Let's trade!</b-button>
                <b-button v-if="!isLoggedIn" type="is-primary" tag="router-link" :to="{ name: 'Register' }">Get Started!</b-button>
            </div>
        </div>
    </section>
</template>
<script>
import { mapGetters } from "vuex"
export default {
    computed: {
        ...mapGetters(["funds", "isLoggedIn"]),
    },
}
</script>
<style></style>
