<template>
  <b-modal
    id="transaction-modal"
    title="Add new transaction"
    hide-footer
    @hidden="reset"
  >
    <div class="modal-body">
      <form @submit.prevent="add">
        <div class="form-group">
          <coin-selector v-model="coin" />
        </div>
        <div class="form-group">
          <buy-sell-radio v-model="type" />
        </div>
        <div class="form-group">
          <div class="row">
            <div class="col-6">
              <label>Quantity</label>
              <input
                v-model="quantity"
                type="number"
                class="form-control"
                placeholder="0.00"
              />
            </div>
            <div class="col-6">
              <label>Price per coin</label>
              <div class="d-flex align-items-center postion-relative">
                <span class="position-absolute ml-2">$</span>
                <input
                  v-model="price"
                  type="number"
                  step="0.01"
                  class="form-control pl-4"
                  placeholder="0.00"
                />
              </div>
            </div>
          </div>
        </div>
        <button
          type="submit"
          class="btn btn-primary btn-block mt-5"
        >
          Add transaction
        </button>
      </form>
    </div>
  </b-modal>
</template>

<script>
import { mapState } from "vuex";
import CoinSelector from "@/components/CoinSelector";
import BuySellRadio from "@/components/BuySellRadio";
export default {
  components: { BuySellRadio, CoinSelector },

  data() {
    return {
      type: null,
      coin: null,
      quantity: null,
      price: null
    };
  },

  computed: {
    ...mapState(["funds"])
  },

  methods: {
    add() {
      const quantity = this.quantity * (this.type === "buy" ? 1 : -1);

      this.$db.addTrans(this.coin, quantity, this.price);
      this.$bvModal.hide("transaction-modal");
    },

    reset() {
      this.type = null;
      this.coin = null;
      this.quantity = null;
      this.price = null;
    }
  }
};
</script>
