import countriesList from '@/assets/countries-list.json'

export const state = () => {
  return {
    countriesList: JSON.parse(JSON.stringify(countriesList.countries))
  }
}

export const getters = {
  countries: (state) => state.countriesList
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
  }
}

export const mutations = {
  setCountries: (state, countries) => (state.countriesList = countries)
}
