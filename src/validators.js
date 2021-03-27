// import WAValidator from 'wallet-address-validator'
import moment from 'moment'

export const required = (value) => Boolean(value)
export const amount = (value) => Number(value) && Number(value) > 0
export const requiredAtLeastOne = (value) => !!value.length
export const maxDecimalPoints = (points) => (value) => {
  const splittedValue = value.split('.')
  if (splittedValue.length < 2) {
    return true
  } else {
    return splittedValue[splittedValue.length - 1].length <= Number(points)
  }
}
export const minDate = (minDate) => (value) => {
  return moment(value).isAfter(moment(minDate))
}
export const maxDate = (maxDate) => (value) => {
  return moment(value).isBefore(moment(maxDate))
}

// export const address = (asset) => (value) => {
//   switch (asset) {
//     case ASSETS.btc:
//       return WAValidator.validate(value, ASSETS.btc, 'both')
//     case ASSETS.eth:
//       return /^(0x)?[0-9a-f]{40}$/i.test(value)
//     default:
//       return true
//   }
// }

export const exactLength = (len) => (value) => {
  return value.length === len
}
