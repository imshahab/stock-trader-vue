<template>
    <div
        class="column is-one-quarter-fullhd is-one-third-widescreen is-half-tablet mb-4"
    >
        <div class="panel">
            <p class="panel-heading">
                {{ stock.name }}
                <span class="is-size-7 has-text-weight-normal"
                    >(Price: {{ toDollars(stock.price) }} | Quantity:
                    {{ stock.quantity }})</span
                >
            </p>
            <div class="columns p-4">
                <div class="column is-9">
                    <b-field :type="{ 'is-danger': insufficientQuantity }">
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
                        @click="sellStock()"
                        :disabled="
                            insufficientQuantity ||
                            quantity <= 0 ||
                            !Number.isInteger(quantity)
                        "
                        type="is-link is-fullwidth"
                        >Sell</b-button
                    >
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { mapActions } from "vuex"
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
        insufficientQuantity() {
            return this.quantity > this.stock.quantity
        },
    },
    methods: {
        ...mapActions(["sellStocks", "resetSkippedDays"]),
        sellStock() {
            const order = {
                stockId: this.stock.id,
                stockPrice: this.stock.price,
                stockQuantity: this.quantity,
            }
            this.sellStocks(order)
            this.resetSkippedDays()
            this.quantity = 0
        },
    },
}
</script>
<style></style>
