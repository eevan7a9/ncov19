import { defineStore } from "pinia";

export const useGeojsonStore = defineStore('geojson', {
    state: () => ({
        countries: {} as CountriesGeoJSON
    }),
    actions: {
        setGeoJSONCountries(cases: CountriesGeoJSON) {
            this.countries = cases
        }
    }
}) 