<template>
  <div class="d-flex">
    <button
      :class="[
        'btn flex-grow-1',
        { 'btn-light': !state },
        { 'btn-success': state == 'buy' }
      ]"
      type="button"
      @click="state = 'buy'"
    >
      Buy
    </button>
    <button
      :class="[
        'btn flex-grow-1',
        { 'btn-light': !state },
        { 'btn-danger': state == 'sell' }
      ]"
      type="button"
      @click="state = 'sell'"
    >
      Sell
    </button>
  </div>
</template>

<script>
export default {
  props: {
    value: String
  },

  data() {
    return {
      state: this.value
    };
  },

  watch: {
    state(value) {
      this.$emit("input", value);
    }
  }
};
</script>
