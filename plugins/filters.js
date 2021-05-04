import Vue from "vue";

Vue.filter("usd", value => {
  const dollarUS = Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2
  });

  return dollarUS.format(value);
});
