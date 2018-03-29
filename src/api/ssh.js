import axios from 'axios';
var instance = axios.create({
    baseURL: '/api/ssh'
});
import { getAData } from '../util';
export function fetchInfos() {
    return instance.get('info').then(getAData);
}
export function fetchInfo(id) {
    return instance.get('info/' + id).then(getAData);
}
export function addInfo(data) {
    return instance.post('add', data);
}
