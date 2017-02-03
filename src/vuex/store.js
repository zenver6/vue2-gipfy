import Vue from 'vue'
import Vuex from 'vuex'
import { CHANGE_KEYWORD, SEARCH } from './mutation-types'

Vue.use(Vuex)

const state = {
  keyword: '',
  gifs: []
}
const actions = {
  [CHANGE_KEYWORD] ({ commit }, keyword) {
    commit(CHANGE_KEYWORD, keyword)
  },

  [SEARCH] ({commit, state}) {
    getGIFs(state.keyword)
    .then(data => {
      commit(SEARCH, data)
    })
  }
}
const getters = {
  gifs: state => state.gifs
}
const mutations = {
  [CHANGE_KEYWORD] (state, keyword) {
    state.keyword = keyword
  },
  [SEARCH] (state, gifs) {
    state.gifs = gifs.data
  }
}

export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations
})

/* eslint-env browser */
function getGIFs (query) {
  const params = encodeURIComponent(query).replace(/%20/g, '+')
  return fetch('http://api.giphy.com/v1/gifs/search?q=' + params + '&api_key=dc6zaTOxFJmzC')
        .then(res => res.json())
}
