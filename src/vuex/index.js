import Vuex from 'vuex'
import { vuexTypes } from '@/vuex/types'
import { api } from '../api'

export const rootModule = {
  actions: {
    async [vuexTypes.CREATE_NETWORK]({ commit }, { sshKey, networkName }) {
      console.log(api)
      console.log(sshKey, networkName)
      let data = {
        privateSsh:
          'SSSHHSODHQHODQOSSSHHSODHQHODQOSSSHHSODHQHODQOSSSHHSODHQHODQOSSSHHSODHQHODQOSSSHHSODHQHODQOSSSHHSODHQHODQOSSSHHSODHQHODQOSSSHHSODHQHODQOSSSHHSODHQHODQOSSSHHSODHQHODQOSSSHHSODHQHODQOSSSHHSODHQHODQOSSSHHSODHQHODQOSSSHHSODHQHODQO',
        privateValidator: 'Kqwdkqwpjdqwpdp',
      }
      let { privateSsh, privateValidator } = data

      commit(vuexTypes.SET_PRIVATE_SSH, privateSsh)
      commit(vuexTypes.SET_PRIVATE_VALIDATOR, privateValidator)
      return data
    },
  },

  mutations: {
    [vuexTypes.SET_PRIVATE_SSH](state, privateSsh) {
      state.privateSsh = privateSsh
    },
    [vuexTypes.SET_PRIVATE_VALIDATOR](state, privateValidator) {
      state.privateValidator = privateValidator
    },
  },
  getters: {
    [vuexTypes.privateSsh]: (state) => {
      return state.privateSsh
    },
    [vuexTypes.privateValidator]: (state) => {
      return state.privateValidator
    },
  },
  state: {
    privateSsh: '',
    privateValidator: '',
  },
}

let store
function buildStore() {
  store = new Vuex.Store({
    ...rootModule,
    modules: {},
  })

  return store
}
buildStore()

export { store, buildStore }
export { vuexTypes } from './types'
