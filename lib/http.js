import http from 'k6/http';

export class Http {

    sendGetRequest(url, params = {}) {
        return http.get(url, params);
    }

    sendPostRequest(url, body, params = {}) {
        return http.post(url, body, params);
    }

    sendPatchRequest(url, body, params = {}) {
        return http.patch(url, body, params);
    }

    sendPutRequest(url, body, params = {}) {
        return http.put(url, body, params);
    }

    sendDeleteRequest(url, body = null, params = {}) {
        return http.del(url, body, params);
    }
}
