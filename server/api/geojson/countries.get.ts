export default defineEventHandler(async () => {
  return await useStorage('myFileSystem').getItem('geojson/countries-geo.json') as GeoJSON;
})