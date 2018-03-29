import axios from 'axios';
var instance = axios.create({
    baseURL: '/api/svn'
});
import { getAData } from '../util';
export function fetchPaths() {
    return instance.get('paths').then(getAData);
}
export function addPath(params) {
    return instance.post('path', params);
}
export function fetchStatus(path) {
    return instance.get('status', {
        params: {
            path
        }
    }).then(getAData);
}
export function fetchInfo(path) {
    return instance.get('info', {
        params: {
            path
        }
    }).then(getAData);
}
export function fetchStructure(path, base) {
    return instance.get('/structure', {
        params: {
            path,
            base
        }
    }).then(getAData);
}
export function fetchLogs(params) {
    return instance.get('log', {
        params
    }).then(getAData);
}
export function update(path) {
    return instance.post('update', { path }).then(getAData);
}
export function resolveFiles(paths, path) {
    return instance.post('resolve', {
        path,
        paths
    }).then(getAData);
}
export function merge(path, url, revisions) {
    return instance.post('merge', {
        path,
        url,
        revisions
    }).then(getAData);
}
export function mergeinfo(path, url) {
    return instance.get('mergeinfo', {
        params: {
            path,
            url
        }
    }).then(getAData);
}
export function addFiles(paths, path) {
    return instance.post('add', { paths, path }).then(getAData);
}
export function delFiles(paths, path) {
    return instance.post('del', { paths, path }).then(getAData);
}
export function commitFiles(path, paths, msg) {
    return instance.post('commit', { path, msg, paths }).then(getAData);
}
