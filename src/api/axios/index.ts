import axios from 'axios'


interface DataRes {
  data: { code: number, data: any, msg: string }
}
export default function getAxios(baseURL: string) {
  if (!baseURL.startsWith('/')) {
    baseURL = '/api/' + baseURL
  }
  var instance = axios.create({
    baseURL,
    responseType: 'json'
  })
  instance.interceptors.response.use(interceptor)
  return instance
}

export function interceptor({ data: { code, data, msg } }: DataRes) {
  if (code === 0) {
    return data
  }
  throw msg;
}