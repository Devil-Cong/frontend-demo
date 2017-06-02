import { _products } from './mock';

export function fetchLists () {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(_products);
        }, 200);
    });
};

export function fetchItem (id) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const item = _products.find((val, key) => {
                return val.id == id;
            });
            resolve(item);
        });
    });
};
