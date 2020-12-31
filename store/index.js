/* eslint-disable no-console */
import countriesAlpha3 from 'assets/countries-alpha3'
const state = () => {
  return {
    summaryCases: [],
    timelineCases: []
  }
}

const getters = {
  getSummaryCases: (state) => state.summaryCases,
  getTotalNumbers: (state) => {
    if (state.summaryCases.length) {
      const cases = state.summaryCases
        .map((country) => country.TotalConfirmed)
        .reduce((a, b) => a + b)
      const death = state.summaryCases
        .map((country) => country.TotalDeaths)
        .reduce((a, b) => a + b)
      const treated = state.summaryCases
        .map((country) => country.TotalRecovered)
        .reduce((a, b) => a + b)
      const active = cases - (death + treated)
      return { content: true, cases, death, treated, active }
    } else {
      return { content: false, cases: [], death: [], treated: [], active: [] }
    }
  }
}

const actions = {
  async fetchSummaryCases({ commit }) {
    try {
      const result = await this.$axios.get('https://api.covid19api.com/summary')
      const countries = result.data.Countries
      for (let i = 0; i < countries.length; i++) {
        const country = countries[i]
        const foundCountry = countriesAlpha3.find(
          (item) => item['alpha-2'] === country.CountryCode
        )
        if (foundCountry) {
          country.alpha3 = foundCountry['alpha-3']
        } else {
          country.alpha3 = ''
        }
      }
      commit('SET_SUMMARY_CASES', countries)
      return result.data.Countries
    } catch (error) {
      if (error) {
        this.$router.push({ name: 'Error-maintenance' })
      }
    }
  }
}
const mutations = {
  SET_SUMMARY_CASES: (state, data) => (state.summaryCases = data),
  SET_TIMELINE_CASES: (state, data) => (state.timelineCases = data)
}

export default {
  state,
  getters,
  actions,
  mutations
}
