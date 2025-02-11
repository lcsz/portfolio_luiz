class RestHelper {

    baseUrl = "https://my-json-server.typicode.com/lcsz/portfolio_luiz";

    constructor(path) {
        this.path = path;
        this.url = `${this.baseUrl}/${this.path}`;
    }

    get(filtros) {        
        return fetch(`${this.url}?${filtros}`).then(response => response.json());        
    }

    post(data) {
        return fetch(this.url, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        }).then(response => response.json());
    }

    put(id, data) {
        return fetch(`${this.url}/${id}`, {
            method: 'PUT',
            body: JSON.stringify(data),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        }).then(response => response.json());
    }

    patch(id, data) {
        return fetch(`${this.url}/${id}`, {
            method: 'PATCH',
            body: JSON.stringify(data),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        }).then(response => response.json());
    }

    delete(id) {
        return fetch(`${this.url}/${id}`, {
            method: 'DELETE',
        }).then(response => response.json());
    }

}