(function() {
    const noop = () => null;

    class Ajax {
        #ajax({
            method = 'GET',
            url = '/',
            body = null,
            callback = noop,
        } = {}) {
            const xhr = new XMLHttpRequest();
            xhr.open(method, url, true);
            xhr.withCredentials = true;        
            xhr.addEventListener('readystatechange', function() {
                if (xhr.readyState !== XMLHttpRequest.DONE) 
                    return;
                callback(xhr.status, xhr.responseText);
            });
            if (body) {
                xhr.setRequestHeader('Content-type', 'application/json; charset=utf8');
                xhr.send(JSON.stringify(body));
                return;
            }
            xhr.send();
        }

        get(params = {}) {
            this.#ajax({
                ...params,
                method: 'GET',
            });
        }

        getPromise(params = {}) {
            return new Promise((resolve, reject) => {
                this.#ajax({
                    ...params,
                    method: 'GET',
                    callback: (status, responseText) => {
                        if (status < 300) {
                            resolve({status, responseText});
                            return;
                        }
                        reject({status, responseText});
                    },
                });
            });
        }

        async getFetch(params = {}) {
            let status;
            const response = await fetch(params.url, {
                method: 'GET'
            });
            status = response.status;
            const parsedJson = await response.json();
            return {
                status,
                parsedJson,
            };
        }

        post(params = {}) {
            this.#ajax({
                ...params,
                method: 'POST',
            });
        }
    }

    window.HttpModule = new Ajax();
})();