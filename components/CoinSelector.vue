<template>
  <vue-bootstrap-typeahead
    :data="coins"
    :serializer="s => s.name"
    placeholder="Choose a coin ..."
    @hit="selectedCoin = $event"
  >
    <template slot="suggestion" slot-scope="{ data, htmlText }">
      <span v-html="htmlText"></span>&nbsp;
      <small class="text-muted">{{ data.symbol.toUpperCase() }}</small>
    </template>
  </vue-bootstrap-typeahead>
</template>

<script>
import "@/node_modules/vue-bootstrap-typeahead/dist/VueBootstrapTypeahead.css";
import VueBootstrapTypeahead from "vue-bootstrap-typeahead";
import coins from "assets/coins";

export default {
  components: {
    VueBootstrapTypeahead
  },

  props: {
    value: Object
  },

  data() {
    return {
      coins,
      selectedCoin: this.value
    };
  },

  watch: {
    selectedCoin(value) {
      this.$emit("input", value);
    }
  }
};
</script>
