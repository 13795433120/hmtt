import axios from 'axios'
const request = axios.create({
  baseURL: 'http://geek.itheima.net'
})
export default ({ url, method = 'GET', params = {}, data = {}, headers = {} }) => {
  return request({
    url,
    method,
    params,
    data,
    headers
  })
}
