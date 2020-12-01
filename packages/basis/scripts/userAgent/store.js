const state = () => ({
  browserName: null,
  os: null,
  platform: null,
})

const getters = {
  os: (state) => state.os,
  platform: (state) => state.platform,
  browserName: (state) => state.browserName,
}

const mutations = {
  UPDATE(state, { name, payload }) {
    state[name] = payload
  },
}

const actions = {
  update({ commit }, payload) {
    for (const prop in payload) {
      if (prop) {
        commit('UPDATE', { name: prop, payload: payload[prop] })
      }
    }
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  getters,
  actions,
}
