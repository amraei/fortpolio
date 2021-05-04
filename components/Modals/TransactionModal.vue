<template>
  <b-modal
    id="transaction-modal"
    title="Add new transaction"
    hide-footer
    @show="intial"
  >
    <div class="modal-body">
      <form v-show="!view" novalidate @submit.prevent="add">
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
                step="0.01"
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
                  step="0.000001"
                  class="form-control pl-4"
                  placeholder="0.00"
                />
              </div>
            </div>
          </div>
        </div>
        <div class="form-group">
          <button
            class="btn btn-sm btn-light"
            type="button"
            @click="view = 'date'"
          >
            <strong>
              <b-icon-calendar class="mr-1" />
              {{ $moment(datetime).format("MMMM DD, YYYY, hh:mm A") }}
            </strong>
          </button>
        </div>

        <button
          type="submit"
          class="btn btn-primary btn-block mt-5"
        >
          Add transaction
        </button>
      </form>

      <form v-show="view === 'date'" @submit.prevent="setDatetime">
        <div class="form-group">
          <b-calendar v-model="selectedDate" locale="en-US" block></b-calendar>
        </div>
        <div class="form-group text-center">
          <b-time v-model="selectedTime" locale="en" block></b-time>
        </div>

        <div class="d-flex mt-5">
          <button class="btn btn-light mr-3" type="button" @click="view = null">
            <b-icon-arrow-left-short />
          </button>
          <button type="submit" class="btn btn-primary flex-grow-1">
            Set date & time
          </button>
        </div>
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
      view: null,
      type: null,
      coin: null,
      quantity: null,
      price: null,
      datetime: null,
      selectedDate: null,
      selectedTime: null
    };
  },

  computed: {
    ...mapState(["funds"])
  },

  methods: {
    add() {
      const quantity = this.quantity * (this.type === "buy" ? 1 : -1);

      this.$db.addTrans(this.coin, quantity, this.price, this.datetime);
      this.$bvModal.hide("transaction-modal");
    },

    setDatetime() {
      this.datetime = this.selectedDate + " " + this.selectedTime;
      this.view = null;
    },

    intial() {
      this.type = "buy";
      this.coin = null;
      this.quantity = null;
      this.price = null;
      this.selectedDate = this.$moment().format("YYYY-MM-DD");
      this.selectedTime = this.$moment().format("HH:mm");

      this.setDatetime();
    }
  }
};
</script>
