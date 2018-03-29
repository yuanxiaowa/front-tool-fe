
import axios from 'axios'
var instance = axios.create({
  baseURL: '/api/devserver'
});
import { getAData } from '../util'

export function fetchList() {
  return instance.get('list').then(getAData)
}
export function add(data: {
  name: string
  dir: string
  port: number
  open: boolean
}) {
  return instance.post('add', data).then(getAData)
}
export function start(dir: string) {
  return instance.get('start', {
    params: {
      dir
    }
  }).then(getAData)
}
export function stop(dir: string) {
  return instance.get('stop', {
    params: {
      dir
    }
  }).then(getAData)
}