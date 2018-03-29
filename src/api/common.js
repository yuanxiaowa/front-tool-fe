import axios from 'axios';
export function explore(path) {
    return axios.get('/api/explore', {
        params: {
            path
        }
    });
}
export function getScript(url) {
    var ele = document.createElement('script');
    ele.src = url;
    document.body.appendChild(ele);
    document.body.removeChild(ele);
    return new Promise((resolve, reject) => {
        ele.onload = resolve;
        ele.onerror = reject;
    });
}
export function getFileUrl(path) {
    return '/api/file?path=' + path;
}
export function getUploadUrl() {
    return '/api/upload';
}
