export default defineEventHandler(async (event) => {
  return (await useStorage("myFileSystem").getItem(
    "global-total-case.json"
  )) as CountriesTotalCase[];
});
// await useStorage("myFileSystem").setItem("exported-global-cases.json", globalCases);
