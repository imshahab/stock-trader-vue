<template>
    <div
        class="column is-one-quarter-fullhd is-one-third-widescreen is-half-tablet mb-4"
    >
        <div class="panel">
            <p class="panel-heading">
                {{ stock.name }}
                <span class="is-size-7 has-text-weight-normal"
                    >(Price: {{ toDollars(stock.price) }})</span
                >
            </p>
            <div class="columns p-4">
                <div class="column is-9">
                    <b-field :type="{ 'is-danger': insufficientFunds }">
                        <b-numberinput
                            min="0"
                            type="is-light"
                            placeholder="Quantity"
                            v-model="quantity"
                        />
                    </b-field>
                </div>
                <div class="column is-3">
                    <b-button
                        @click="buyStock()"
                        :disabled="
                            insufficientFunds ||
                            quantity <= 0 ||
                            !Number.isInteger(quantity)
                        "
                        type="is-success is-fullwidth"
                        >Buy</b-button
                    >
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { mapActions } from "vuex"
import { mapGetters } from "vuex"
export default {
    data() {
        return {
            quantity: 0,
        }
    },
    props: {
        stock: Object,
    },
    computed: {
        ...mapGetters(["funds"]),
        insufficientFunds() {
            return this.quantity * this.stock.price > this.funds
        },
    },
    methods: {
        ...mapActions(["buyStocks"]),
        buyStock() {
            const order = {
                stockId: this.stock.id,
                stockPrice: this.stock.price,
                stockQuantity: this.quantity,
            }
            this.buyStocks(order)
            this.quantity = 0
        },
    },
}
</script>
<style></style>
