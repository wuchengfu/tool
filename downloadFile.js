export default {
    formtatJson(params) {
        let str = '';
        for (let key in params) {
            str += key + '=' + (params[key] === null ? '' : params[key]) + '&';
        }
        return str;
    },
    downloadFile(path, params, name) {
        const xhr = new XMLHttpRequest()
        xhr.open('get', path + '?' + this.formtatJson(params))
        xhr.responseType = 'blob'
        xhr.send()
        xhr.onload = function() {
            if(this.status === 200 || this.status === 304) {
                const url = URL.createObjectURL(this.response)
                const a = document.createElement('a');
                a.style.display = 'none';
                a.href = url;
                a.download = name;
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                URL.revokeObjectURL(url);
            }
        }
    },
    
}