const state = {
    funds: 10000,
    stocks: [],
}

const getters = {
    portfolioStocks(state, getters) {
        return state.stocks.map((stock) => {
            const record = getters.stocks.find(
                (element) => element.id == stock.id
            )
            return {
                name: record.name,
                id: stock.id,
                quantity: stock.quantity,
                price: record.price,
            }
        })
    },
    funds(state) {
        return state.funds
    },
}

const mutations = {
    buyStocks(state, order) {
        const record = state.stocks.find((stock) => stock.id == order.stockId)
        if (record) {
            record.quantity += order.stockQuantity
        } else {
            state.stocks.push({
                id: order.stockId,
                quantity: order.stockQuantity,
            })
        }
        state.funds -= order.stockPrice * order.stockQuantity
    },
    sellStocks(state, order) {
        const record = state.stocks.find((stock) => stock.id == order.stockId)
        if (record.quantity > order.stockQuantity) {
            record.quantity -= order.stockQuantity
        } else {
            state.stocks.splice(state.stocks.indexOf(record), 1)
        }
        state.funds += order.stockPrice * order.stockQuantity
    },
    resetStocks(state) {
        state.stocks = []
    },
    resetFunds(state) {
        state.funds = 10000
    },
    updateFunds(state, funds) {
        state.funds = funds
    },
    updatePortfolioStocks(state, portfolioStocks) {
        state.stocks = portfolioStocks
    },
}

const actions = {
    sellStocks(context, order) {
        context.commit("sellStocks", order)
    },
    resetStocks(context) {
        context.commit("resetStocks")
    },
    resetFunds(context) {
        context.commit("resetFunds")
    },
}

export default {
    state: state,
    getters: getters,
    mutations: mutations,
    actions: actions,
}
