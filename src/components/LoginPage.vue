<template>
    <section class="section">
        <div class="columns is-centered">
            <div class="column is-one-third-fullhd is-half-tablet">
                <h1
                    class="has-text-weight-semibold is-size-1-desktop is-size-3-tablet is-size-4-mobile has-text-centered"
                >
                    Login
                </h1>
                <b-field label="Email">
                    <b-input type="email" v-model="email" maxlength="30">
                    </b-input>
                </b-field>
                <b-field label="Password">
                    <b-input type="password" v-model="password" password-reveal>
                    </b-input>
                </b-field>
                <b-field class="mt-5">
                    <b-button type="is-primary" @click="login()"
                        >Log In</b-button
                    >
                </b-field>
                <p>
                    Don't have an account?
                    <router-link
                        class="is-underlined has-text-primary"
                        :to="{ name: 'Register' }"
                        >Register!</router-link
                    >
                </p>
            </div>
        </div>
    </section>
</template>
<script>
import firebase from "firebase"
import { mapActions } from "vuex"
export default {
    data() {
        return {
            email: "",
            password: "",
        }
    },
    methods: {
        ...mapActions([]),
        login() {
            firebase
                .auth()
                .signInWithEmailAndPassword(this.email, this.password)
                .then(
                    (data) => {
                        this.showToast(`Logged in as ${data.user.email}!`)
                        this.$router.go({ path: this.$router.path })
                    },
                    (err) => {
                        this.showToast(err.message)
                    }
                )
        },
        showToast(message) {
            this.$buefy.toast.open({
                duration: 5000,
                message: message,
                position: "is-bottom",
                type: "is-danger",
            })
        },
    },
}
</script>
<style></style>
