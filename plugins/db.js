import moment from "moment";
import PouchDB from "pouchdb-browser";
import omit from "lodash/omit";
import forIn from "lodash/forIn";

const notNaN = v => isNaN(v) ? 0 : v

const reCalcAvgs = (assets) => {
  forIn(assets.list, (asset, key) => {
    asset.total = 0;
    asset.avgPrice = 0;

    asset.records = asset.records.map((record, i) => {
      record = {
        ...record,
        fee: notNaN(record.fee),
        pnl: notNaN(record.pnl),
        price: notNaN(record.price)
      }

      if (record.quantity > 0) {
        const transValue = Math.abs(record.quantity * record.price);
        asset.avgPrice =
          (transValue + asset.avgPrice * asset.total) /
          (asset.total + record.quantity);
      }

      asset.total += record.quantity;

      return record;
    })

    assets.list[key] = asset
  })

  return assets;
}

export default ({ store }, inject) => {
  const db = new PouchDB("fortpolio");

  inject("db", {
    async getAssets(mutate = false) {
      let assets = null;

      try {
        assets = await db.get("assets");
      } catch (error) {
        assets = { list: {} };
      }

      assets = reCalcAvgs(assets);

      if (mutate) store.commit("setAssets", assets);

      return assets;
    },

    async deleteAsset({ id }) {
      const allAssets = await this.getAssets();
      allAssets.list = omit(allAssets.list, id);

      await db.put({
        ...allAssets,
        _id: "assets"
      });

      store.commit("setAssets", allAssets);
    },

    async addTrans({ id, symbol, name }, quantity, price, fee, date) {
      quantity = notNaN(parseFloat(quantity));
      price = notNaN(parseFloat(price));

      const feePrice = Math.abs((quantity * price * fee) / 100);

      const allAssets = await this.getAssets();
      const oldAsset = allAssets.list[id];

      const asset = {
        id,
        symbol,
        name,
        total: 0,
        avgPrice: 0,
        records: [],
        ...(oldAsset && oldAsset.total ? oldAsset : {})
      };

      let pnl = 0;

      // It's a buy order
      if (quantity > 0) {
        quantity *= 1 - fee / 100;

        pnl = -feePrice;
      }

      const transValue = Math.abs(quantity * price);

      // It's a sell order
      if (quantity < 0) {
        pnl = transValue - Math.abs(quantity * asset.avgPrice);

        if (fee > 0) pnl -= feePrice;
      }

      if (quantity > 0) {
        asset.avgPrice =
          (transValue + asset.avgPrice * asset.total) /
          (asset.total + quantity);
      }

      asset.total += quantity;

      asset.records.push({
        quantity,
        price,
        fee: feePrice,
        pnl,
        created_at: date ? date : moment().format("YYYY-MM-DD hh:mm:ss")
      });

      allAssets.list[id] = asset;

      await db.put({
        ...allAssets,
        _id: "assets"
      });

      store.commit("setAssets", allAssets);
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
    },

    async deleteWatchlist(coin) {
      const watchlist = await this.getWatchlist();

      watchlist.list = omit(watchlist.list, [coin.id]);

      await db.put({
        ...watchlist,
        _id: "watchlist"
      });

      store.commit("setWatchlist", watchlist);
    },

    async purge() {
      const empty = { list: {} };

      const assets = await this.getAssets();
      const watchlist = await this.getWatchlist();

      try {
        await db.remove(assets);
      } catch (error) { }

      try {
        await db.remove(watchlist);
      } catch (error) { }

      store.commit("setAssets", empty);
      store.commit("setWatchlist", empty);
    }
  });
};
