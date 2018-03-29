import axios from 'axios';
var instance = axios.create({
    baseURL: '/api/devserver'
});
import { getAData } from '../util';
export function fetchList() {
    return instance.get('list').then(getAData);
}
export function add(data) {
    return instance.post('add', data).then(getAData);
}
export function start(dir) {
    return instance.get('start', {
        params: {
            dir
        }
    }).then(getAData);
}
export function stop(dir) {
    return instance.get('stop', {
        params: {
            dir
        }
    }).then(getAData);
}
