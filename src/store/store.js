import Vue from "vue"
import Vuex from "vuex"
import stocks from "./modules/stocks"
import portfolio from "./modules/portfolio"
import state from "./state"
import * as actions from "./actions"
import * as mutations from "./mutations"
import * as getters from "./getters"

Vue.use(Vuex)

export default new Vuex.Store({
    state: state,
    getters: getters,
    mutations: mutations,
    actions: actions,
    modules: {
        stocks,
        portfolio,
    },
})
