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
            // we set radius to help visualize
            if (country.TotalConfirmed > 300000) {
              country.radius = 300000
            } else if (country.TotalConfirmed > 100000) {
              country.radius = 200000
            } else if (country.TotalConfirmed > 50000) {
              country.radius = 150000
            } else if (country.TotalConfirmed > 25000) {
              country.radius = 100000
            } else if (country.TotalConfirmed > 10000) {
              country.radius = 80000
            } else if (country.TotalConfirmed > 5000) {
              country.radius = 60000
            } else if (country.TotalConfirmed > 1000) {
              country.radius = 35000
            } else if (country.TotalConfirmed > 500) {
              country.radius = 20000
            } else {
              country.radius = 10000
            }
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
      const cases = await this.$axios.get(
        `https://covid-193.p.rapidapi.com/history?country=${country}`,
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
