<template>
  <div
    :class="[
      'container my-4 flex-grow-1',
      { 'd-flex flex-column justify-content-center': !funds.records.length }
    ]"
  >
    <div v-if="funds.records.length" class="d-flex flex-column">
      <div class="row justify-content-between align-items-center">
        <div class="col-md-6">
          <h3 class="mb-0">Your Portfolio</h3>
          <h6 class="text-muted">Track your crypto assets.</h6>
        </div>
        <div
          class="mt-4 mt-md-0 col-md-6 d-flex align-items-center justify-content-md-end"
        >
          <button v-b-modal.refuel-modal class="btn btn-link mr-3">
            <b-icon-cash class="mr-2" />
            Manage Funds
          </button>

          <button v-b-modal.transaction-modal class="btn btn-primary">
            <b-icon-plus class="mr-2" />
            Add Asset
          </button>
        </div>
      </div>

      <div class="rounded border mt-5">
        <div
          class="px-2 py-3 d-flex justify-content-between align-items-center"
        >
          <h4 class="mb-0">Your assets</h4>

          <div class="text-right">
            <div class="text-muted">
              Capital<span class="d-none d-md-inline"> (approximate)</span>:
            </div>
            <h4 class="mb-0">{{ capital.toFixed(2) | usd }}</h4>
          </div>
        </div>
        <div>
          <table
            v-if="Object.keys(assets.list).length"
            class="table table-striped table-hover mb-0"
          >
            <thead>
              <tr class="small">
                <th>Name</th>
                <th class="text-right">Price</th>
                <th class="text-right d-none d-md-table-cell">24hr Change</th>
                <th class="text-right d-none d-md-table-cell">Holdings</th>
                <th class="text-right">Profit/Loss</th>
                <!-- <th></th> -->
              </tr>
            </thead>
            <tbody>
              <template v-for="coin in assets.list">
                <tr
                  v-if="market[coin.id]"
                  :key="`coin-${coin.id}`"
                  :set="(calcs = getCalcs(coin.id))"
                >
                  <td class="py-4 align-middle">
                    <strong class="d-block d-md-inline">{{ coin.name }}</strong>
                    <small class="text-muted d-block d-md-inline">
                      {{ coin.symbol.toUpperCase() }}
                    </small>
                    <small class="d-block d-md-none">{{ coin.total }}</small>
                  </td>
                  <td class="py-4 align-middle text-right">
                    <div>
                      {{ market[coin.id].usd | usd }}
                    </div>
                    <div
                      :class="[
                        'small d-md-none',
                        { 'text-success': market[coin.id].usd_24h_change >= 0 },
                        { 'text-danger': market[coin.id].usd_24h_change < 0 }
                      ]"
                    >
                      <b-icon-caret-up-fill
                        v-if="market[coin.id].usd_24h_change > 0"
                      />
                      <b-icon-caret-down-fill
                        v-if="market[coin.id].usd_24h_change < 0"
                      />
                      <span>
                        {{
                          Math.abs(market[coin.id].usd_24h_change).toFixed(2)
                        }}%
                      </span>
                    </div>
                  </td>
                  <td
                    :class="[
                      'py-4 align-middle text-right d-none d-md-table-cell',
                      { 'text-success': market[coin.id].usd_24h_change >= 0 },
                      { 'text-danger': market[coin.id].usd_24h_change < 0 }
                    ]"
                  >
                    <b-icon-caret-up-fill
                      v-if="market[coin.id].usd_24h_change > 0"
                    />
                    <b-icon-caret-down-fill
                      v-if="market[coin.id].usd_24h_change < 0"
                    />
                    <span>
                      {{ Math.abs(market[coin.id].usd_24h_change).toFixed(2) }}%
                    </span>
                  </td>
                  <td
                    class="py-4 align-middle text-right d-none d-md-table-cell"
                  >
                    <div>
                      <span class="text-muted ml2">
                        {{ coin.symbol.toUpperCase() }}
                      </span>
                      {{ coin.total }}
                    </div>
                    <div class="small">
                      {{ calcs.valueUSD.toFixed(2) | usd }}
                    </div>
                  </td>
                  <td class="py-4 align-middle text-right">
                    <div>
                      {{ calcs.pnlUSD > 0 ? "+" : ""
                      }}{{ calcs.pnlUSD.toFixed(2) | usd }}
                    </div>
                    <div
                      :class="[
                        'small',
                        { 'text-success': calcs.pnlUSDChange >= 0 },
                        { 'text-danger': calcs.pnlUSDChange < 0 }
                      ]"
                    >
                      <b-icon-caret-up-fill v-if="calcs.pnlUSDChange > 0" />
                      <b-icon-caret-down-fill v-if="calcs.pnlUSDChange < 0" />
                      {{ Math.abs(calcs.pnlUSDChange).toFixed(2) }}%
                    </div>
                  </td>
                  <!-- <td></td> -->
                </tr>
              </template>
            </tbody>
          </table>

          <div v-else class="text-center py-5 rounded">
            <h4>Your portfolio is empty!</h4>
            <p class="text-muted">Please add some transactions.</p>
          </div>
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
      market: {}
    };
  },

  computed: {
    ...mapState(["funds", "assets"]),

    capital() {
      return (
        this.funds.amount +
        Object.values(this.assets.list).reduce((total, asset) => {
          if (this.market[asset.id])
            return total + asset.total * this.market[asset.id].usd;

          return total;
        }, 0)
      );
    }
  },

  watch: {
    assets: {
      deep: true,
      handler(assets) {
        clearTimeout(this.$options.timeout);

        if (Object.keys(assets.list).length) this.syncMarket();
      }
    }
  },

  mounted() {
    this.syncMarket();
  },

  destroyed() {
    clearTimeout(this.$options.timeout);
  },

  methods: {
    async syncMarket() {
      const tokens = Object.keys(this.assets.list);

      if (tokens.length) {
        const data = await this.$cgc.simple.price({
          ids: Object.keys(this.assets.list),
          vs_currencies: ["usd"],
          include_24hr_change: true
        });

        this.market = data.data;

        this.$options.timeout = setTimeout(this.syncMarket, 10000);
      }
    },

    getCalcs(id) {
      const coin = this.assets.list[id];

      const orderUSD = coin.total * coin.avgPrice;
      const valueUSD = coin.total * this.market[coin.id].usd;

      const pnlUSD = valueUSD - orderUSD;

      return {
        valueUSD,
        pnlUSD,
        pnlUSDChange: (valueUSD / orderUSD - 1) * 100
      };
    }
  }
};
</script>
