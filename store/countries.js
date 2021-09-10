import countriesAffected from '@/assets/countries-affected.json'
import countriesInfo from '@/assets/countries-info.json' // lat-long, country-code etc.
import rapidApi from '@/assets/rapidapi.js'

export const state = () => {
  return {
    countriesAffected: JSON.parse(
      JSON.stringify(countriesAffected.countries)
    ).sort((a, b) => a.localeCompare(b)),
    countriesCases: [], // case summary of all countries
    countryDetailedCases: [] // country with detailed cases
  }
}

export const getters = {
  countries: (state) => state.countriesAffected,
  getCountriesCases: (state) => state.countriesCases,
  getCountryDetailedCases: (state) => state.countryDetailedCases
}

export const actions = {
  filterCountries: ({ commit }, word) => {
    // sort alphabeticaly
    let countries = JSON.parse(
      JSON.stringify(countriesAffected.countries)
    ).sort((a, b) => a.localeCompare(b))

    if (word) {
      countries = countries.filter((country) =>
        country.toLowerCase().includes(word.toLowerCase())
      )
      // we remove duplicates
      countries = countries.filter(
        (thing, index, self) => self.findIndex((t) => t === thing) === index
      )
    }
    commit('SET_COUNTRIES', countries)
  },
  setCountriesInfo: ({ commit, rootState }) => {
    if (rootState.summaryCases) {
      let countries = []
      rootState.summaryCases.forEach((country) => {
        if (country.Country) {
          // we try to find the country in countriesInfo
          const foundCountry = countriesInfo.countries.find(
            (data) => data.country_code === country.CountryCode
          )
          if (foundCountry) {
            // if country if found assign the country latLang
            country.latLang = foundCountry.latlng
            if (foundCountry.name_2nd) {
              country.name = foundCountry.name_2nd
            } else {
              country.name = foundCountry.name
            }
            country.radius = 600000
            countries.push(country)
          }
        }
      })
      countries = countries
        .sort((a, b) => b.TotalConfirmed - a.TotalConfirmed)
        .filter((country) => country !== undefined)
      commit('SET_COUNTRIES_CASES', countries)
    }
  },
  async fetchCountryDetailedCases({ commit }, country) {
    try {
      const dt = new Date()
      dt.setDate(dt.getDate() - 1)
      let m = dt.getMonth() + 1
      let d = dt.getDate()
      m = m > 9 ? m : '0' + m
      d = d > 9 ? d : '0' + d
      const day = `${dt.getFullYear()}-${m}-${d}`
      const cases = await this.$axios.get(
        `https://covid-193.p.rapidapi.com/history?country=${country}&day=${day}`,
        {
          headers: {
            'x-rapidapi-host': rapidApi.host,
            'x-rapidapi-key': rapidApi.key
          }
        }
      )
      commit('SET_COUNTRY_DETAILS', cases.data.response)
      return cases.data.response
    } catch (error) {
      alert(error)
    }
  }
}

export const mutations = {
  SET_COUNTRIES: (state, countries) => (state.countriesAffected = countries),
  SET_COUNTRIES_CASES: (state, countries) => (state.countriesCases = countries),
  SET_COUNTRY_DETAILS: (state, country) =>
    (state.countryDetailedCases = country)
}
