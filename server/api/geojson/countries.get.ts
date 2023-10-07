export default defineEventHandler(async (event) => {
    return await useStorage('myFileSystem').getItem('geojson/countries-geo.json');
  })