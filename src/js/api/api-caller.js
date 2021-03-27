import axios from 'axios'
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
    this._baseURL = opts.baseURL
  }

  post(endpoint, data) {
    return this._call({
      method: methods.POST,
      endpoint,
      data,
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
      url: opts.endpoint,
    }

    let response

    try {
      response = await this._axios(config)
    } catch (e) {
      console.error(e)
    }

    if (!opts.needRaw) {
      if (!isEmpty(response.links)) {
        response.makeLinkCallers(this)
      }
    }

    return response
  }
}
