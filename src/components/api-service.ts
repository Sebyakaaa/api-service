class ApiService {
    base_url: string;
    constructor(base_url = 'https://fakestoreapi.com') {
        this.base_url = base_url
    }

    async get(resource: string, id?: number) {
        try {
            const url = id
                ? `${this.base_url}/${resource}/${id}`
                : `${this.base_url}/${resource}`;
            const response = await fetch(url);
            const data = await response.json();
            return data;
        } catch (error) {
            throw new Error("Empty response from server");
        }
    }

    async post(resource: string, title: string, price: number) {
        const url = `${this.base_url}/${resource}`;
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title, price }),
        })
        return response.json();
    }

    getPromise = (resource: string, id?: number) => {
        const url = id
            ? `${this.base_url}/${resource}/${id}`
            : `${this.base_url}/${resource}`;
        return fetch(url)
            .then(response => response.json())
            .catch(error => {
                throw new Error("Empty response from server");
            });
    }

    postPromise(resource: string, title: string, price: number) {
        const url = `${this.base_url}/${resource}`;
        return fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title, price }),
        })
            .then(response => response.json())
    }

    putPromise(resource: string, id: number, title: string, price: number) {
        const url = `${this.base_url}/${resource}/${id}`;
        return fetch(url, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title, price }),
        })
            .then(response => {
                if (!response.ok) {
                    return { error: "Wrong Product id" };
                }
                return response.json();
            })
            .catch(error => {
                return { error: "Wrong Product id" };
            });
    }

    deletePromise(resource: string, id: number) {
        const url = `${this.base_url}/${resource}/${id}`;
        return fetch(url, {
            method: 'DELETE'
        })
            .then(response => {
                if (!response.ok) {
                    return { error: "Wrong Product id" };
                }
                return response.json();
            })
            .catch(() => {
                return { error: "Wrong Product id" };
            });
    }
}

const api = new ApiService();

async function getProduct(id?: number) {
    return await api.get('products', id);
}

async function addProduct(title: string, price: number) {
    return await api.post('products', title, price);
}

function getProductPromise(id?: number) {
    return api.getPromise('products', id)
        .then(result => {
            return result;
        });
}

function addProductPromise(title: string, price: number) {
    return api.postPromise('products', title, price)
        .then(result => {
            return result;
        });
}

function updateProductPromise(id: number, title: string, price: number) {
    return api.putPromise('products', id, title, price)
        .then(result => {
            return result;
        });
}

function deleteProductPromise(id: number) {
    return api.deletePromise('products', id)
        .then(result => {
            return result;
        });
}


export { getProduct, addProduct, getProductPromise, addProductPromise, updateProductPromise, deleteProductPromise }
