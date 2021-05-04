export default async ({ app }) => {
  await app.$db.getFunds(true);
  await app.$db.getAssets(true);
};
