export const state = () => {
  return {
    sidebar: true
  }
}

export const getters = {
  leftSidebar: (state) => state.sidebar
}

export const actions = {
  toggleLeftSidebar: ({ commit }) => commit('SET_LEFT_SIDEBAR')
}

export const mutations = {
  SET_LEFT_SIDEBAR: (state) => (state.sidebar = !state.sidebar)
}
