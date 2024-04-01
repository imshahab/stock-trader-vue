import { SnackbarProgrammatic as Snackbar } from "buefy"
import stocks from "@/data/stocks.js"
import firebase from "firebase"

export const skipDay = (context) => {
    context.commit("skipDay")
}

export const resetSkippedDays = (context) => {
    context.commit("resetSkippedDays")
}

export const getData = (context) => {
    firebase
        .database()
        .ref(`users/${firebase.auth().currentUser.uid}/gameData`)
        .once("value")
        .then((snapshot) => {
            if (snapshot.val()) {
                const data = snapshot.val()
                context.commit("setStocks", data.stocks)
                context.commit("updateFunds", data.funds)
                context.commit("updatePortfolioStocks", data.portfolioStocks)
                context.commit("updateSkippedDays", data.skippedDays)
                Snackbar.open(`Data loaded!`)
            } else {
                context.commit("setStocks", stocks)
            }
        })
        .catch((err) => {
            Snackbar.open(err.message)
        })
}

export const setUser = (context, userEmail) => {
    context.commit("setUser", userEmail)
}
