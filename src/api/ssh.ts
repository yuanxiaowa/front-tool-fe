
import getAxios from './axios';

var instance = getAxios('ssh')

export function fetchInfos() {
  return instance.get('info')
}
export function fetchInfo(id: number) {
  return instance.get('info/' + id)
}

export function addInfo(data: { host: string, port: number, username: string, password: string }) {
  return instance.post('add', data)
}