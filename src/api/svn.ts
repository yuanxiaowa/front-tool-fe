
import getAxios from './axios';

var instance = getAxios('svn')

export function fetchPaths() {
  return instance.get('paths')
}

export function addPath(params: { path: string, name: string }) {
  return instance.post('path', params)
}

export function fetchStatus(path: string) {
  return instance.get('status', {
    params: {
      path
    }
  })
}

export function fetchInfo(path: string) {
  return instance.get('info', {
    params: {
      path
    }
  })
}

export function fetchStructure(path: string, base?: string) {
  return instance.get('/structure', {
    params: {
      path,
      base
    }
  })
}

export function fetchLogs(params: {
  path: string,
  page: number,
  rowsPerPage: number
}) {
  return instance.get('log', {
    params
  })
}

export function update(path: string) {
  return instance.post('update', { path })
}

export function resolveFiles(paths: string[], path: string) {
  return instance.post('resolve', {
    path,
    paths
  })
}

export function merge(path: string, url: string, revisions: number[]) {
  return instance.post('merge', {
    path,
    url,
    revisions
  })
}

export function mergeinfo(path: string, url: string) {
  return instance.get('mergeinfo', {
    params: {
      path,
      url
    }
  })
}

export function addFiles(paths: string[], path: string) {
  return instance.post('add', { paths, path })
}

export function delFiles(paths: string[], path: string) {
  return instance.post('del', { paths, path })
}

export function commitFiles(path: string, paths: string[], msg: string) {
  return instance.post('commit', { path, msg, paths })
}