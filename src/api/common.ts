import getAxios from "./axios";

var instance = getAxios('/api')

export function explore(path: string) {
  return instance.get('explore', {
    params: {
      path
    }
  })
}

export function getScript(url: string) {
  var ele = document.createElement('script');
  ele.src = url;
  document.body.appendChild(ele);
  document.body.removeChild(ele);
  return new Promise((resolve, reject) => {
    ele.onload = resolve;
    ele.onerror = reject;
  })
}

export function getFileUrl(path: string) {
  return '/api/file?path=' + path
}

export function getUploadUrl() {
  return '/api/file/upload'
}

export function listFiles(path: string) {
  return instance.get('file/list', {
    params: {
      path
    }
  })
}

export function listPatternFiles(pattern: string) {
  return instance.get('file/list', {
    params: {
      pattern
    }
  })
}

export function delFile(path: string) {
  return instance.delete('file', {
    params: {
      path
    }
  })
}