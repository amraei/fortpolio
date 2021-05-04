const CoinGecko = require('coingecko-api');

export default (ctx, inject) => {
  const CoinGeckoClient = new CoinGecko();
  
  inject("cgc", CoinGeckoClient);
};
