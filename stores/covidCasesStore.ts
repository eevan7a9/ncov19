import { defineStore } from "pinia";

export const useCovidCasesStore = defineStore('covidCases', {
    state: () => ({
        globalCases: [] as CountriesTotalCase[],
        countries: [] as Country[]
    }),
    getters: {
        getTopThree: (state) => state.globalCases.sort((curr, next) =>
            Number(next?.casesCumulativeTotal) - Number(curr?.casesCumulativeTotal)).slice(0, 3)

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