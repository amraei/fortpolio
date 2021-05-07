<template>
  <button class="btn btn-secondary" @click="$bvModal.show('watch-modal')">
    <b-icon-eye />
    <span v-if="!Object.keys(watchlist.list).length" class="ml-2">Watch</span>

    <b-modal :id="'watch-modal'" hide-footer>
      <div class="modal-body">
        <coin-selector v-model="coin" />

        <button class="btn btn-primary btn-block mt-5" @click="add">
          Add to watchlist
        </button>
      </div>
    </b-modal>
  </button>
</template>

<script>
import { mapState } from "vuex";
import CoinSelector from "@/components/CoinSelector";

export default {
  components: {
    CoinSelector
  },

  data() {
    return {
      coin: null
    };
  },
  computed: {
    ...mapState(["watchlist"])
  },

  methods: {
    add() {
      this.$db.addWatchlist(this.coin);
      this.$bvModal.hide("watch-modal");
    }
  }
};
</script>
