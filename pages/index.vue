<template>
  <div
    :class="[
      'container my-4 flex-grow-1',
      { 'd-flex flex-column justify-content-center': !tokens.length }
    ]"
  >
    <div v-if="assetList.length" class="d-flex flex-column">
      <div class="row justify-content-between align-items-center">
        <div class="col-md-6">
          <h3 class="mb-0">Your Portfolio</h3>
          <h6 class="text-muted">Track your crypto assets.</h6>
        </div>
        <div
          class="mt-4 mt-md-0 col-md-6 d-flex align-items-center justify-content-md-end"
        >
          <button v-b-modal.transaction-modal class="btn btn-primary">
            <b-icon-plus class="mr-2" />
            Add transaction
          </button>

          <b-dropdown variant="light" class="ml-2" no-caret right>
            <template #button-content>
              <b-icon-three-dots-vertical />
            </template>
            <b-dropdown-item-button v-b-modal.purge-modal>
              <span class="text-danger">
                <b-icon-trash class="mr-1" />
                Purge your portfolio
              </span>
            </b-dropdown-item-button>
          </b-dropdown>
        </div>
      </div>

      <div class="mb-3 mt-5 d-flex align-items-start">
        <watch-button class="btn-sm" />

        <div class="d-flex flex-wrap">
          <template v-for="coin in watchlist.list">
            <span
              v-if="market[coin.id]"
              :key="coin.id"
              class="ml-2 mb-2 border rounded px-2 py-1 small"
            >
              <strong>{{ coin.symbol.toUpperCase() }}</strong>
              {{ market[coin.id].usd | usd }}

              <span
                :class="[
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

                {{ Math.abs(market[coin.id].usd_24h_change).toFixed(2) }}%
              </span>

              <b-icon-x class="pointer" @click="$db.deleteWatchlist(coin)" />
            </span>
          </template>
        </div>
      </div>

      <div class="rounded border">
        <div
          class="px-2 py-3 d-flex justify-content-between align-items-center"
        >
          <h4 class="mb-0">Your assets</h4>

          <div class="text-right">
            <div class="text-muted">
              Capital<span class="d-none d-md-inline"> (approximate)</span>:
            </div>
            <h4 class="mb-0">{{ capital.total | usd }}</h4>
            <small
              :class="[
                { 'text-success': capital.pnlUSD >= 0 },
                { 'text-danger': capital.pnlUSD < 0 }
              ]"
            >
              <b-icon-caret-up-fill v-if="capital.pnlUSD > 0" />
              <b-icon-caret-down-fill v-if="capital.pnlUSD < 0" />
              {{ capital.pnlUSD > 0 ? "+" : "" }}
              {{ capital.pnlUSD | usd }}
            </small>
          </div>
        </div>
        <div>
          <table
            v-if="assetList.length"
            class="table table-striped table-hover mb-0"
          >
            <thead>
              <tr class="small">
                <th>Name</th>
                <th class="text-right">Price</th>
                <th class="text-right d-none d-md-table-cell">24hr Change</th>
                <th class="text-right d-none d-md-table-cell">Holdings</th>
                <th class="text-right">Profit/Loss</th>
                <th style="width: 0px"></th>
              </tr>
            </thead>
            <tbody>
              <template v-for="coin in assetList">
                <tr
                  v-if="market[coin.id] && coin.total"
                  :key="`coin-${coin.id}`"
                >
                  <td class="py-4 align-middle">
                    <strong class="d-block d-md-inline">{{ coin.name }}</strong>
                    <!-- <small class="text-muted d-block d-md-inline">
                      {{ coin.symbol.toUpperCase() }}
                    </small> -->
                    <small class="d-block d-md-none">{{ coin.total }}</small>
                  </td>

                  <td class="py-4 align-middle text-right">
                    <div>
                      {{ market[coin.id].usd ?? "-" | usd }}
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
                    <div class="small text-muted">
                      Avg: {{ coin.avgPrice | usd }}
                    </div>
                  </td>

                  <td
                    v-if="market[coin.id].usd"
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
                    v-else
                    class="py-4 align-middle text-center d-none d-md-table-cell"
                  >
                    ∞
                  </td>

                  <td
                    class="py-4 align-middle text-right d-none d-md-table-cell"
                  >
                    <div>
                      <span class="text-muted ml-2">
                        {{ coin.symbol.toUpperCase() }}
                      </span>
                      {{ coin.total | fnum }}
                    </div>
                    <div class="small">
                      {{ coin.valueUSD | usd }}
                    </div>
                  </td>

                  <td class="py-4 align-middle text-right">
                    <div>
                      {{ coin.pnlUSD > 0 ? "+" : "" }}
                      {{ coin.pnlUSD | usd }}
                    </div>
                    <div
                      :class="[
                        'small',
                        { 'text-success': coin.pnlUSDChange >= 0 },
                        { 'text-danger': coin.pnlUSDChange < 0 }
                      ]"
                    >
                      <b-icon-caret-up-fill v-if="coin.pnlUSDChange > 0" />
                      <b-icon-caret-down-fill v-if="coin.pnlUSDChange < 0" />

                      {{
                        isFinite(coin.pnlUSDChange)
                          ? Math.abs(coin.pnlUSDChange).toFixed(2) + "%"
                          : "&infin;"
                      }}
                    </div>
                  </td>
                  <td class="py-4 align-middle">
                    <button
                      class="btn btn-link text-danger btn-sm"
                      @click="$db.deleteAsset(coin)"
                    >
                      <b-icon-trash />
                    </button>
                  </td>
                </tr>
              </template>
            </tbody>
          </table>

          <div v-else class="text-center py-5 rounded">
            <h4>Your portfolio is empty!</h4>
            <p class="text-muted">Add your some transactions.</p>
          </div>
        </div>
      </div>
    </div>

    <div v-else class="text-center">
      <h1 class="display-1"><span class="text-primary">F</span>ortpolio</h1>
      <h4>Free, open source & privacy-first portfolio tracker</h4>
      <h5 class="text-muted">for crypto lovers</h5>

      <h6 class="mt-7">
        Add a transaction to setting up your portfolio.<br />
        <small class="text-muted">(All data are stored on your browser.)</small>
      </h6>

      <button v-b-modal.transaction-modal class="btn btn-primary mt-2">
        Add a transaction
      </button>

      <div class="mt-5">
        We're on
        <a
          href="https://github.com/amraei/fortpolio"
          target="_blank"
          class="text-dark"
        >
          <b-icon-github /> github.
        </a>
      </div>
    </div>

    <b-modal
      id="purge-modal"
      title="Purge your portfolio"
      header-text-variant="white"
      header-bg-variant="danger"
      ok-variant="danger"
      ok-title="Purge it"
      @ok="$db.purge()"
    >
      Are you sure to purge all data in your portfolio? It <b>CANNOT</b> be
      undone and everthing will be deleted permanently.
    </b-modal>

    <transaction-modal />
  </div>
</template>

<script>
import { mapState } from "vuex";
import coins from "assets/coins";
import TransactionModal from "@/components/Modals/TransactionModal";
import WatchButton from "~/components/WatchButton.vue";

export default {
  components: { TransactionModal, WatchButton },

  middleware: ["init"],

  interval: null,

  data() {
    return {
      coins,
      market: {}
    };
  },

  computed: {
    ...mapState(["assets", "watchlist"]),

    tokens() {
      return Object.keys(this.assets.list).concat(
        Object.keys(this.watchlist.list)
      );
    },

    assetList() {
      const list = [];

      for (const key in this.assets.list) {
        const coin = this.assets.list[key];

        if (this.market[coin.id]) {
          const orderUSD = coin.total * this.notNaN(coin.avgPrice);

          let valueUSD = 0;
          let pnlUSD = 0;
          let pnlUSDChange = 0;

          if (this.market[coin.id].usd) {
            valueUSD = coin.total * this.market[coin.id].usd;
            pnlUSD = valueUSD - orderUSD;
            pnlUSDChange = (valueUSD / orderUSD - 1) * 100;
          }

          list.push({
            ...coin,
            valueUSD,
            pnlUSD,
            pnlUSDChange
          });
        }
      }

      return list.sort(function(a, b) {
        return a.valueUSD > b.valueUSD ? -1 : b.valueUSD > a.valueUSD ? 1 : 0;
      });
    },

    capital() {
      // this.funds.amount +
      return Object.values(this.assetList).reduce(
        (capital, asset) => {
          capital.total += asset.valueUSD;
          capital.pnlUSD += asset.pnlUSD;

          return capital;
        },
        {
          total: 0,
          pnlUSD: 0
        }
      );
    }
  },

  watch: {
    tokens() {
      this.syncMarket();
    }
  },

  mounted() {
    this.$options.interval = setInterval(this.syncMarket, 10000);
    this.syncMarket();
  },

  destroyed() {
    clearTimeout(this.$options.interval);
  },

  methods: {
    async syncMarket() {
      if (this.tokens.length) {
        const data = await this.$cgc.simple.price({
          ids: this.tokens,
          vs_currencies: ["usd"],
          include_24hr_change: true
        });

        this.market = data.data;
      }
    },

    notNaN(value) {
      return isNaN(value) ? 0 : value;
    },
    }
  }
};
</script>

<style scoped>
.pointer {
  cursor: pointer;
}
</style>
