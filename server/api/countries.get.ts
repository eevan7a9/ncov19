export default defineEventHandler(async (event) => {
  return await useStorage('myFileSystem').getItem('countries-list.json');
})