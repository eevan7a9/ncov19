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
          // we set radius to help visualize
          if (country.TotalConfirmed > 100000) {
            country.radius = 400000
          } else if (country.TotalConfirmed > 80000) {
            country.radius = 300000
          } else if (country.TotalConfirmed > 50000) {
            country.radius = 200000
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
