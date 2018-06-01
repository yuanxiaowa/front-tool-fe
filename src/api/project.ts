import axios from 'axios'
import getAxios from './axios';
import { listPatternFiles } from './common';

var instance = getAxios('project')

export function fetchDirs() {
  return instance.get('dir')
}

export function addDir(item: { name: string, value: string }) {
  return instance.post('dir/add', item)
}
export function fetchProjects(dir: string) {
  return listPatternFiles(dir + '/src/projects/*')
}
export function fetchModules(dir: string) {
  return listPatternFiles(dir + '/modules/*')
}
export function fetchImages(dir: string) {
  return listPatternFiles(dir + '/**/*.{png,jpg,jpeg,svg,gif,webp,ico}')
}

export function fetchDatas(dir: string) {
  return listPatternFiles(dir + '/data/*.{json,jsonc}')
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