
import axios from 'axios'
var instance = axios.create({
  baseURL: '/api/svn'
});
import { getAData } from '../util'

export function fetchPaths() {
  return instance.get('paths').then(getAData)
}

export function addPath(params: { path: string, name: string }) {
  return instance.post('path', params)
}

export function fetchStatus(path: string) {
  return instance.get('status', {
    params: {
      path
    }
  }).then(getAData)
}

export function fetchInfo(path: string) {
  return instance.get('info', {
    params: {
      path
    }
  }).then(getAData)
}

export function fetchStructure(path: string, base?: string) {
  return instance.get('/structure', {
    params: {
      path,
      base
    }
  }).then(getAData)
}

export function fetchLogs(params: {
  path: string,
  page: number,
  rowsPerPage: number
}) {
  return instance.get('log', {
    params
  }).then(getAData)
}

export function update(path: string) {
  return instance.post('update', { path }).then(getAData)
}

export function resolveFiles(paths: string[], path: string) {
  return instance.post('resolve', {
    path,
    paths
  }).then(getAData)
}

export function merge(path: string, url: string, revisions: number[]) {
  return instance.post('merge', {
    path,
    url,
    revisions
  }).then(getAData)
}

export function mergeinfo(path: string, url: string) {
  return instance.get('mergeinfo', {
    params: {
      path,
      url
    }
  }).then(getAData)
}

export function addFiles(paths: string[], path: string) {
  return instance.post('add', { paths, path }).then(getAData)
}

export function delFiles(paths: string[], path: string) {
  return instance.post('del', { paths, path }).then(getAData)
}

export function commitFiles(path: string, paths: string[], msg: string) {
  return instance.post('commit', { path, msg, paths }).then(getAData)
}