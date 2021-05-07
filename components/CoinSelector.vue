<template>
  <vue-bootstrap-typeahead
    ref="test"
    :data="coins"
    :serializer="s => s.name + ' ' + s.symbol.toUpperCase()"
    placeholder="Choose a coin ..."
    @hit="selectedCoin = $event"
  >
    <template slot="suggestion" slot-scope="{ data }">
      <span>{{ data.name }}</span
      >&nbsp;
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
    value: Object,
    autoFocus: Boolean
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
  },

  mounted() {
    
  }
};
</script>
