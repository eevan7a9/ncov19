const state = () => {
  return {
    summaryCases: []
  }
}

const getters = {
  getSummaryCases: (state) => state.summaryCases
}

const actions = {
  async fetchSummaryCases({ commit }) {
    const result = await this.$axios.get('https://api.covid19api.com/summary')
    commit('SET_SUMMARY_CASES', result.data.Countries)
    return result.data.Countries
  }
}
const mutations = {
  SET_SUMMARY_CASES: (state, data) => (state.summaryCases = data)
}

export default {
  state,
  getters,
  actions,
  mutations
}
