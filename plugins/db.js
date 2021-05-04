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

      const assets = await this.getAssets();

      const newCoin = {
        id: coin.id,
        symbol: coin.symbol,
        name: coin.name,
        total: 0,
        avgPrice: 0,
        records: !assets.list[coin.id] ? [] : assets.list[coin.id].records
      };

      newCoin.records.push({
        created_at: date,
        quantity,
        price
      });

      newCoin.records.forEach(record => {
        newCoin.avgPrice =
          (record.quantity * record.price + newCoin.avgPrice * newCoin.total) /
          (newCoin.total + record.quantity);

        newCoin.total += record.quantity;
      });

      assets.list[coin.id] = newCoin;

      await db.put({
        ...assets,
        _id: "assets"
      });

      this.addFund(-(quantity * price), date);

      store.commit("setAssets", assets);
    }
  });
};
