export const updateStore = async (store, payload) => {
    const allowedFields = ["name", "description", "address"];

    allowedFields.forEach((field) => {
        if (payload[field] !== undefined) {
            store[field] = payload[field];
        }
    });

    await store.save();

    return store;
};