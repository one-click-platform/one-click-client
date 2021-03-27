import { ApiCaller } from '@/js/api/api-caller'
import config from './config'

export const api = new ApiCaller({ baseURL: config.BACKEND_URL })
