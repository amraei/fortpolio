import moment from "moment";
import PouchDB from "pouchdb-browser";

export default ({ store }, inject) => {
  const db = new PouchDB("fortpolio");

  inject("db", {
    async getFunds(mutate = false) {
      let funds = null;

      try {
        funds = await db.get("funds");
      } catch (error) {
        funds = {
          amount: 0,
          records: []
        };
      }

      if (mutate) store.commit("setFunds", funds);

      return funds;
    },

    async addFund(amount, date) {
      amount = parseFloat(amount);

      if (!date) date = moment().format("YYYY-MM-DD hh:mm:ss");

      const funds = await this.getFunds();

      funds.records.push({
        created_at: date,
        amount
      });

      funds.amount += amount;

      await db.put({
        ...funds,
        _id: "funds"
      });

      store.commit("setFunds", funds);
    },

    async getAssets(mutate = false) {
      let assets = null;

      try {
        assets = await db.get("assets");
      } catch (error) {
        assets = { list: {} };
      }

      if (mutate) store.commit("setAssets", assets);

      return assets;
    },

    async addTrans(coin, quantity, price, date) {
      quantity = parseFloat(quantity);
      price = parseFloat(price);

      if (!date) date = moment().format("YYYY-MM-DD hh:mm:ss");

      const oldAssets = await this.getAssets();
      const oldAsset = oldAssets.list[coin.id];

      const newAsset = {
        id: coin.id,
        symbol: coin.symbol,
        name: coin.name,
        total: oldAsset && oldAsset.total ? oldAsset.total : quantity,
        avgPrice: oldAsset && oldAsset.total ? oldAsset.avgPrice : price,
        records: oldAsset ? oldAsset.records : []
      };

      const newAssetValue = quantity * price;

      let pnl = 0;

      if (newAssetValue < 0 && newAsset.avgPrice > 0) {
        pnl = quantity * newAsset.avgPrice - newAssetValue;
      }

      if (oldAsset && oldAsset.total) {
        if (quantity > 0) {
          newAsset.avgPrice =
            (quantity * price + newAsset.avgPrice * newAsset.total) /
            (newAsset.total + quantity);
        }

        newAsset.total += quantity;
      }

      newAsset.records.push({
        created_at: date,
        quantity,
        price,
        pnl
      });

      this.addFund(-newAssetValue, date);

      oldAssets.list[coin.id] = newAsset;

      await db.put({
        ...oldAssets,
        _id: "assets"
      });

      store.commit("setAssets", oldAssets);
    },

    async getWatchlist(mutate = false) {
      let watchlist = null;

      try {
        watchlist = await db.get("watchlist");
      } catch (error) {
        watchlist = { list: {} };
      }

      if (mutate) store.commit("setWatchlist", watchlist);

      return watchlist;
    },

    async addWatchlist(coin) {
      const watchlist = await this.getWatchlist();

      watchlist.list[coin.id] = coin;

      await db.put({
        ...watchlist,
        _id: "watchlist"
      });

      store.commit("setWatchlist", watchlist);
    }
  });
};
