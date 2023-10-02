import Vue from "vue";

function commify(n) {
  const parts = n.toString().split(".");

  const numberPart = parts[0];
  const decimalPart = parts[1];
  const thousands = /\B(?=(\d{3})+(?!\d))/g;
  return numberPart.replace(thousands, ",") + (decimalPart ? "." + decimalPart : "");
}

Vue.filter("fnum", value => {
  if (isNaN(parseFloat(value))) return value;

  return commify(value);
});

Vue.filter("usd", value => {
  if (isNaN(parseFloat(value))) return value;

  let dec = 2;
  const abv = Math.abs(value)

  if (abv < 0.000000009) dec = 15
  else if (abv < 0.000009) dec = 12
  else if (abv < 0.0009) dec = 9
  else if (abv < 0.009) dec = 6
  else if (abv < 0.09) dec = 4

  value = parseFloat(value).toFixed(dec).replace(/\.?0+$/, '');

  return ('$' + commify(value)).replace('$-', '-$')
});
