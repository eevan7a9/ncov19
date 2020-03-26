export const state = {
  sidebar: true
}

export const getters = {
  leftSidebar: (state) => state.sidebar
}

export const actions = {
  toggleLeftSidebar: ({ commit }) => commit('setLeftSidebar')
}

export const mutations = {
  setLeftSidebar: (state) => (state.sidebar = !state.sidebar)
}
