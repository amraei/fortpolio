<template>
  <b-modal
    id="refuel-modal"
    title="Refuel your wallet "
    hide-footer
    @hidden="reset"
  >
    <div class="modal-body">
      <form @submit.prevent="refuel">
        <div class="form-group">
          <buy-sell-radio v-model="type" />
        </div>
        <div class="form-group d-flex align-items-center postion-relative">
          <span class="position-absolute ml-2">$</span>
          <input
            v-model="amount"
            type="number"
            class="form-control flex-grow-1 pl-4"
            placeholder="0.00"
          />
        </div>
        <button
          type="submit"
          class="btn btn-primary btn-block my-3"
          :disabled="isInvalid"
        >
          Add funds
        </button>
      </form>
    </div>
  </b-modal>
</template>

<script>
import { mapState } from "vuex";
import BuySellRadio from "@/components/BuySellRadio";

export default {
  components: { BuySellRadio },

  data() {
    return { amount: null, type: null };
  },

  computed: {
    ...mapState(["funds"]),

    isInvalid() {
      return (
        !this.amount ||
        !this.type ||
        (this.type === "sell" && this.amount > this.funds.amount)
      );
    }
  },

  methods: {
    refuel() {
      this.$db.addFund(this.amount * (this.type === "buy" ? 1 : -1));
      this.$bvModal.hide("refuel-modal");
    },

    reset() {
      this.type = null;
      this.amount = null;
    }
  }
};
</script>
