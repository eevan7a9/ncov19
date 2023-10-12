import { defineStore } from "pinia";
import countries from "../assets/countries-code-latlng.json"

export const useCovidCasesStore = defineStore('covidCases', {
    state: () => ({
        globalCases: [] as CountriesTotalCase[],
        countries: [] as Country[]
    }),
    getters: {
        getTopThree: (state) => {
            return state.globalCases.sort(
                (curr, next) =>
                    Number(next?.casesCumulativeTotal) - Number(curr?.casesCumulativeTotal))
                    // index 0 is Global and not a country
                    .slice(1, 4)
                    .map(topCountry => {
                        if(!topCountry.countryCode) {
                            return topCountry;
                        }
                        const foundCountry = countries.find(country => country.alpha2 === topCountry.countryCode)
                        if(foundCountry) {
                            topCountry.latlng = [foundCountry.latitude, foundCountry.longitude]
                        }
                        return topCountry;
                    })
        }
    },
    actions: {
        setGlobalCases(cases: CountriesTotalCase[] = []) {
            this.globalCases = cases
        },
        setCountriesList(countries: Country[] = []) {
            this.countries = countries
        }
    }
}) 