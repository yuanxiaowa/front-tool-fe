
import getAxios from './axios';
var instance = getAxios('devserver')

export function fetchList() {
  return instance.get('list')
}
export function add(data: {
  name: string
  dir: string
  port: number
  open: boolean
}) {
  return instance.post('add', data)
}
export function start(dir: string) {
  return instance.get('start', {
    params: {
      dir
    }
  })
}
export function stop(dir: string) {
  return instance.get('stop', {
    params: {
      dir
    }
  })
}