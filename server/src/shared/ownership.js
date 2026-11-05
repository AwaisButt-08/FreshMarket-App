import React from 'react'
import { Store } from '../modules/stores/store.model'

export const assertStoreOwner = async (storeId, userId) => {
    const store = await Store.findById(storeId);

    if (!store) {
        const error = new Error("Store does not exist")
        error.status = 404;
        throw error;
    }

    if(store.userId.toString() !== userId.toString()){
        const error = new Error("You do not own this store")
        error.status = 403;
        throw error;
    }

    return store;
};
