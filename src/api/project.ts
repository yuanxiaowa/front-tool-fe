
import axios from 'axios'
var instance = axios.create({
  baseURL: '/api/project'
});
import { getAData } from '../util'

export function fetchDirs() {
  return instance.get('dir').then(getAData)
}

export function addDir(item: { name: string, value: string }) {
  return instance.post('dir/add', item)
}
export function fetchProjects(dir: string) {
  return axios.get('/api/files', {
    params: {
      pattern: dir + '/src/projects/*'
    }
  }).then(getAData)
}
export function fetchModules(dir: string) {
  return axios.get('/api/files', {
    params: {
      pattern: dir + '/modules/*'
    }
  }).then(getAData)
}
export function fetchImages(dir: string) {
  return axios.get('/api/files', {
    params: {
      pattern: dir + '/**/*.{png,jpg,jpeg,svg,gif,webp,ico}'
    }
  }).then(getAData)
}

export function fetchDatas(dir: string) {
  return axios.get('/api/files', {
    params: {
      pattern: dir + '/data/*.{json,jsonc}'
    }
  }).then(getAData)
}

export function getData(path: string) {
  return axios.get('/api/file', {
    params: {
      path
    },
    responseType: 'json'
  }).then(res => res.data)
}

export function saveData(path: string, data: any) {
  return axios.put('/api/upload', data, {
    params: {
      path
    }
  })
}