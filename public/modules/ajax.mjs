(function() {
    const noop = () => null;

    const AJAX_METHODS = {
        GET: 'GET',
        POST: 'POST'
    }

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
                console.log(body)
                xhr.send(JSON.stringify(body));
                return;
            }
            xhr.send();
        }

        get({url, callback}) {
            this.#ajax({
                method: AJAX_METHODS.GET,
                url,
                callback
            });
        }

        post({url, body, callback}) {
            this.#ajax({
                method: AJAX_METHODS.POST,
                url,
                body,
                callback
            });
        }

        async getUsingFetch({
            url = "/",
            callback = noop,
            errorCallback = noop,
        } = {}) {
            return fetch(url)
            .then((response) => response.json())
            .then((result) => {
                callback(result);
                return result;
            })
            .catch((error) => {
                errorCallback(error);
                return error;
            });
        }

        async postUsingFetch({
            url = "/",
            body = null,
            callback = noop,
            errorCallback = noop,
        } = {}) {
            return fetch(url, {
                method: AJAX_METHODS.POST,
                // mode: 'cors',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify(body)
            })
            .then((response) => {
                callback(response);
                return response;
            })
            .catch((error) => {
               errorCallback(error);
               return error;
            });
        }
    }

    window.Ajax = new Ajax();
})();