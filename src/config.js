import _isEmpty from 'lodash/isEmpty'

const config = {}

const env = _isEmpty(document.ENV) ? process.env : document.ENV

Object.keys(env).forEach((varName) => {
  const value = normalize(env[varName])
  if (varName.startsWith('VUE_APP')) {
    let key = varName.replace('VUE_APP_', '')
    config[key] = value
  } else {
    config[varName] = value
  }
})

function normalize(value) {
  if (value === 'true') {
    return true
  }

  if (value === 'false') {
    return false
  }

  return value
}

export default Object.assign(
  {
    BACKEND_URL: 'http://3.212.145.152/api',
  },
  process.env ? config : process.env,
  document.ENV ? config : document.ENV
)
