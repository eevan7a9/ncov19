const state = {
  dummyData: 'The Dummy Data'
}

const getters = {
  myDummyData: (state) => state.dummyData
}

const actions = {
  changeDummyData: ({ commit }, data) => {
    commit('setDummyData', data)
  }
}
const mutations = {
  setDummyData: (state, data) => (state.dummyData = data)
}

export default {
  state,
  getters,
  actions,
  mutations
}
