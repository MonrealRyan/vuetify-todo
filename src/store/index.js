import { createStore } from 'vuex'
import createPersistedState from "vuex-persistedstate"

import app from './app'

export default createStore({
  modules: {
    app,
  },
  plugins: [createPersistedState()]
})
