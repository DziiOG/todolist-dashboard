import axios from 'axios'
import QueryString from 'query-string'
import { replaceURI } from 'helpers/misc'
/**
 *
 *
 * @class HttpFacade
 * @description provides axios request methods for making api calls
 */
class HttpFacade {
  constructor() {
    this.http = axios.create({
      headers: { 'Content-Type': 'application/json' }
    })
    this.http.interceptors.request.use(
      config => {
        const token = window.sessionStorage.getItem('_cft')
        if (token) config.headers.Authorization = `Bearer ${token}`
        return config
      },
      error => Promise.reject(error)
    )

    this.http.interceptors.response.use(
      response => response,
      error => {
        if ([401, 403].includes(error?.response?.status)) {
          replaceURI('AUTH', '/redirects?from=GROWER_ADMIN&off=false')
        }
        return Promise.reject(error.response)
      }
    )
  }

  post = async ({ url, body }) => {
    const response = await this.http.post(url, body)
    return response.data
  }

  patch = async ({ url, body }) => {
    const response = await this.http.patch(url, body)
    return response.data
  }

  get = async ({ url, query }) => {
    const qs = QueryString.stringify(query)
    const response = await this.http.get(`${url}?${qs}`)
    return response.data
  }

  delete = async ({ url }) => {
    const response = await this.http.delete(url)
    return response.data
  }

  put = async ({ url, body }) => {
    const response = await this.http.put(url, body)
    return response.data
  }
}
export default new HttpFacade()
