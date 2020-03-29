import countriesList from '@/assets/countries-list.json'
import countriesInfo from '@/assets/countries-info.json' // lat-long, country-code etc.

export const state = () => {
  return {
    countriesList: JSON.parse(JSON.stringify(countriesList.countries)),
    countriesCases: []
  }
}

export const getters = {
  countries: (state) => state.countriesList,
  getCountriesCases: (state) => state.countriesCases
}

export const actions = {
  filterCountries: ({ commit }, word) => {
    let countries = JSON.parse(JSON.stringify(countriesList.countries))

    if (word) {
      countries = countries.filter((country) =>
        country.Country.toLowerCase().includes(word.toLowerCase())
      )
    }
    commit('setCountries', countries)
  },
  getCountriesInfo: ({ commit }, countriesCases) => {
    let countries = countriesCases.map((country) => {
      const countryName = country.Country.trim().toLowerCase()
      if (countryName) {
        const foundCountry = countriesInfo.countries.find(
          (data) => data.name.trim().toLowerCase() === countryName
        )
        if (foundCountry) {
          country.latLang = foundCountry.latlng
          return country
        }
      }
    })
    countries = countries
      .sort((a, b) => b.TotalConfirmed - a.TotalConfirmed)
      .filter((country) => country !== undefined)
    // console.log(countries)
    commit('setCasesSummary', countries)
  }
}

export const mutations = {
  setCountries: (state, countries) => (state.countriesList = countries),
  setCasesSummary: (state, countries) => (state.countriesCases = countries)
}
