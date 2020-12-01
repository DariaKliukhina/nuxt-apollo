const state = () => ({
  value: 'desktop',
  mqKey: 'sm',
  list: [
    {
      key: 'sm',
      value: 768,
    },
    {
      key: 'md',
      value: 1024,
    },
    {
      key: 'lg',
      value: Infinity,
    },
  ],
})

const mutations = {
  UPDATE_VALUE(state, payload) {
    state.value = payload.currentMediaName
    state.mqKey = payload.currentMediaKey
  },
}
const getters = {
  currentMq(state) {
    return state.value
  },
  isDesktopMq(state) {
    return state.value === 'desktop'
  },
  isMobileMq(state) {
    return state.value === 'mobile'
  },
}

const actions = {
  update({ commit }, mediaQuery) {
    commit('UPDATE_VALUE', mediaQuery)
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
}
