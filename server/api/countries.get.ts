export default defineEventHandler(async (event): Promise<Country[]> => {
  return (await useStorage("myFileSystem").getItem(
    "countries-list.json"
  )) as Country[];
});
// await useStorage("myFileSystem").setItem("countries-list", newFormat);
