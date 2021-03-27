const mutations = {
  SET_TOKEN: 'SET_TOKEN',
  SET_PRIVATE_SSH: 'SET_PRIVATE_SSH',
  SET_PRIVATE_VALIDATOR: 'SET_PRIVATE_VALIDATOR',
}

const actions = {
  CREATE_NETWORK: 'CREATE_NETWORK',
}

const getters = {
  privateSsh: 'privateSsh',
  privateValidator: 'privateValidator',
  token: 'token',
}

export const vuexTypes = {
  ...mutations,
  ...actions,
  ...getters,
}
