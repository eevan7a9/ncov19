import { defineStore } from "pinia";

export const useGeojsonStore = defineStore('geojson', {
    state: () => ({
        countriesGeoJSON: {} as CountriesGeoJSON | {} 
    }),
    actions: {
        setGeoJSONCountries(cases: CountriesGeoJSON | {}) {
            this.countriesGeoJSON = cases
        }
    }
}) 