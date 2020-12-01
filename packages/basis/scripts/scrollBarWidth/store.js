const state = () => ({
  value: 0,
})

const mutations = {
  UPDATE_VALUE(state, payload) {
    state.value = payload
  },
}

const actions = {
  update({ commit }, value) {
    commit('UPDATE_VALUE', value)
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
}
