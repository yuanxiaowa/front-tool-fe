
import axios from 'axios'
var instance = axios.create({
  baseURL: '/api/ssh'
});
import { getAData } from '../util'

export function fetchInfos() {
  return instance.get('info').then(getAData)
}
export function fetchInfo(id: number) {
  return instance.get('info/' + id).then(getAData)
}

export function addInfo(data: { host: string, port: number, username: string, password: string }) {
  return instance.post('add', data)
}