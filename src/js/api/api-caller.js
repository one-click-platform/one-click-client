import axios from 'axios'
import { store, vuexTypes } from '@/vuex'
import { isEmpty } from 'lodash'

const methods = Object.freeze({
  PATCH: 'PATCH',
  POST: 'POST',
  PUT: 'PUT',
  GET: 'GET',
  DELETE: 'DELETE',
})

export class ApiCaller {
  constructor(opts = {}) {
    this._axios = axios.create()
    if (opts.baseURL) {
      this.useBaseURL(opts.baseURL)
    }
  }

  get(endpoint, query, needSign = false) {
    return this._call({
      method: methods.GET,
      needSign,
      endpoint,
      query,
      isEmptyBodyAllowed: true,
    })
  }

  getRaw(endpoint, query) {
    return this._call({
      method: methods.GET,
      needRaw: true,
      endpoint,
      query,
    })
  }

  post(endpoint, data, needSign = false) {
    return this._call({
      method: methods.POST,
      needSign,
      endpoint,
      data,
    })
  }

  patch(endpoint, data, needSign = false) {
    return this._call({
      method: methods.PATCH,
      needSign,
      endpoint,
      data,
    })
  }

  put(endpoint, data, needSign = false) {
    return this._call({
      method: methods.PUT,
      needSign,
      endpoint,
      data,
    })
  }

  delete(endpoint, data, needSign = false) {
    return this._call({
      method: methods.DELETE,
      needSign,
      endpoint,
      data,
      isEmptyBodyAllowed: true,
    })
  }

  async _call(opts) {
    let config = {
      baseURL: this._baseURL,
      params: opts.query || {},
      paramsSerializer: function (params) {
        return Object.entries(params)
          .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
          .join('&')
      },
      data: opts.isEmptyBodyAllowed && !opts.data ? undefined : opts.data || {},
      method: opts.method,
      url: opts.endpoint,
      withCredentials: true,
    }

    const authToken = store.getters[vuexTypes.authToken]

    if (opts.needSign) {
      config.headers = {
        Authorization: authToken,
      }
    }

    let response

    try {
      response = await this._axios(config)
    } catch (e) {
      console.error(e)
    }

    if (!opts.needRaw) {
      if (!isEmpty(response.links)) {
        if (opts.needSign) {
          response.makeLinkCallersWithSignature(this)
        } else {
          response.makeLinkCallers(this)
        }
      }
    }

    return response
  }

  useBaseURL(baseURL) {
    this._baseURL = baseURL
  }
}
