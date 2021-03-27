import { ApiCaller } from '@/js/api/api-caller'

export const api = new ApiCaller()

export async function initApi() {
  const API_URL = ''
  api.useBaseURL(API_URL)
}
