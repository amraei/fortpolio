import Vue from "vue";

Vue.filter("usd", value => {
  const dollarUS = Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 6
  });

  return dollarUS.format(value).replace(/0+$/, '');
});
