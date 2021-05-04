<template>
  <div
    :class="[
      'container-fluid my-4 flex-grow-1',
      { 'd-flex flex-column justify-content-center': !funds.records.length }
    ]"
  >
    <div v-if="funds.records.length" class="d-flex flex-column">
      <div class="d-flex justify-content-between align-items-center">
        <div>
          <h3 class="mb-0">Your Portfolio</h3>
          <h6 class="text-muted">Track your crypto assets.</h6>
        </div>
        <div class="d-flex align-items-center">
          <button v-b-modal.refuel-modal class="btn btn-link mr-3">
            <b-icon-cash class="mr-2" />
            Manage Funds
          </button>

          <button v-b-modal.transaction-modal class="btn btn-primary">
            <b-icon-plus class="mr-2" />
            Add Transaction
          </button>
        </div>
      </div>

      <div class="rounded border mt-5">
        <div
          class="px-4 py-3 d-flex justify-content-between align-items-center"
        >
          <h4 class="mb-0">Your assets</h4>

          <div class="text-right">
            <div>Capital (approximate):</div>
            <h4 class="mb-0">{{ funds.amount | usd }}</h4>
          </div>
        </div>
        <div>
          <table class="table table-striped table-hover mb-0">
            <thead>
              <tr class="small">
                <th>Name</th>
                <th>Price</th>
                <th>24H</th>
                <th class="text-right">Holdings</th>
                <th class="text-right">Profit/Loss</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="coin in assets.list" :key="`coin-${coin.id}`">
                <td class="py-4">
                  <strong>{{ coin.name }}</strong>
                  <small class="text-muted">
                    {{ coin.symbol.toUpperCase() }}
                  </small>
                </td>
                <td class="py-4">
                  <span v-if="marketData[coin.id]">
                    {{ marketData[coin.id].usd | usd }}
                  </span>
                </td>
                <td class="py-4">
                  <span v-if="marketData[coin.id]">
                    {{ marketData[coin.id].usd_24h_change.toFixed(2) }}%
                  </span>
                </td>
                <td class="py-4 text-right">
                  <div v-if="marketData[coin.id]">
                    {{ (coin.total * marketData[coin.id].usd) | usd }}
                  </div>
                  {{ coin.total }}
                  <small class="text-muted ml2">
                    {{ coin.symbol.toUpperCase() }}
                  </small>
                </td>
                <td class="py-4 text-right">
                  {{ 114 | usd }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <div v-else class="text-center">
      <h2>You have no funds!</h2>
      <h6 class="text-muted">Add some funds to setting up your portfolio.</h6>

      <button v-b-modal.refuel-modal class="btn btn-primary mt-5">
        <b-icon-cash class="mr-2" />
        Add Funds
      </button>
    </div>

    <refuel-modal />
    <transaction-modal />
  </div>
</template>

<script>
import { mapState } from "vuex";
import coins from "assets/coins";
import RefuelModal from "@/components/Modals/RefuelModal";
import TransactionModal from "@/components/Modals/TransactionModal";

export default {
  components: { RefuelModal, TransactionModal },

  middleware: ["init"],

  timeout: null,

  data() {
    return {
      coins,
      marketData: {}
    };
  },

  computed: {
    ...mapState(["funds", "assets"])
  },

  // watch: {
  //   assets: {
  //     deep: true,
  //     handler(assets) {
  //       if (assets.list.length) this.syncPrices();
  //       else clearTimeout(this.$options.timeout);
  //     }
  //   }
  // },
  mounted() {
    this.syncPrices();
  },

  destroyed() {
    clearTimeout(this.$options.timeout);
  },

  methods: {
    async syncPrices() {
      const data = await this.$cgc.simple.price({
        ids: Object.keys(this.assets.list),
        vs_currencies: ["usd"],
        include_24hr_change: true
      });

      this.marketData = data.data;

      this.$options.timeout = setTimeout(this.syncPrices, 10000);
    }
  }
};
</script>
