const state = () => {
  return {
    summaryCases: []
  }
}

const getters = {
  getSummaryCases: (state) => state.summaryCases
}

const actions = {
  fetchSummaryCases: ({ commit }, data) => {
    commit('SET_SUMMARY_CASES', data.Countries)
    return data
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
