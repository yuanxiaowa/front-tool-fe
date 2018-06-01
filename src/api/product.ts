
import getAxios from './axios';
var instance = getAxios('product')

export function list() {
  return instance.get('list')
}

export function zip(path: string) {
  return instance.get('zip', {
    params: {
      path
    }
  })
}