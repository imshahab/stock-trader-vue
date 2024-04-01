const state = {
    stocks: [],
}

const getters = {
    stocks(state) {
        return state.stocks
    },
}

const mutations = {
    setStocks(state, stocks) {
        state.stocks = stocks
    },
    randomizeStocks(state) {
        state.stocks = state.stocks.map((stock) => {
            const randomPrice = Math.floor(
                Math.random() * (1000 - 100 + 1) + 100
            )
            return {
                id: stock.id,
                name: stock.name,
                price: randomPrice,
            }
        })
    },
}

const actions = {
    buyStocks(context, order) {
        context.commit("buyStocks", order)
    },
    randomizeStocks(context) {
        context.commit("randomizeStocks")
    },
}

export default {
    state: state,
    mutations: mutations,
    actions: actions,
    getters: getters,
}
