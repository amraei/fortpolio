<template>
  <b-modal
    id="refuel-modal"
    title="Refuel your wallet "
    hide-footer
    @show="intial"
  >
    <div class="modal-body">
      <form v-if="!view" novalidate @submit.prevent="refuel">
        <div class="form-group">
          <buy-sell-radio v-model="type" />
        </div>
        <div class="form-group">
          <label>Amount</label>
          <div class="d-flex align-items-center postion-relative">
            <span class="position-absolute ml-2">$</span>
            <input
              v-model="amount"
              type="number"
              step="0.01"
              class="form-control flex-grow-1 pl-4"
              placeholder="0.00"
            />
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
          :disabled="isInvalid"
        >
          Add funds
        </button>
      </form>

      <form v-if="view === 'date'" @submit.prevent="setDatetime">
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
import BuySellRadio from "@/components/BuySellRadio";

export default {
  components: { BuySellRadio },

  data() {
    return {
      view: null,
      amount: null,
      type: null,
      datetime: null,
      selectedDate: null,
      selectedTime: null
    };
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
      this.$db.addFund(
        this.amount * (this.type === "buy" ? 1 : -1),
        this.datetime
      );
      this.$bvModal.hide("refuel-modal");
    },

    setDatetime() {
      this.datetime = this.selectedDate + " " + this.selectedTime;
      this.view = null;
    },

    intial() {
      this.type = "buy";
      this.amount = null;
      this.selectedDate = this.$moment().format("YYYY-MM-DD");
      this.selectedTime = this.$moment().format("HH:mm");

      this.setDatetime();
    }
  }
};
</script>
