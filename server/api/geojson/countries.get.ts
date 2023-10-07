interface GeoJSON {
  type: string;
  features: {
    type: string,
    id: string,
    properties: {
      name: string,
      alpha2?: string
    },
    geometry: {
      type: string;
      coordinates: [][]
    }[]
  }[]
}

export default defineEventHandler(async () => {
  return await useStorage('myFileSystem').getItem('geojson/countries-geo.json') as GeoJSON;
})