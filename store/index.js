export const state = () => ({
  assets: null,
  funds: null
});

export const mutations = {
  setAssets(state, assets) {
    state.assets = assets;
  },
  
  setFunds(state, fund) {
    state.funds = fund;
  }
};
