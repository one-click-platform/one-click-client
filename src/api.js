import { ApiCaller } from '@/js/api/api-caller'
// import config from '@/config'

export const api = new ApiCaller()

export async function initApi() {
  api.useBaseURL('')
}
