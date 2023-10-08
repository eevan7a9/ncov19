import { defineStore } from "pinia";

export const useCovidCasesStore = defineStore('covidCases', {
    state: () => ({
        globalCases: [] as CountriesTotalCase[]
    }),
    actions: {
        setGlobalCases(cases = []) {
            this.globalCases = cases
        }
    }
}) 