const API_URL = 'https://6a73075e4d741b02b1f80377.mockapi.io/api/products';

export const fetchProducts = async () => {
    const res = await fetch(API_URL);
    if (!res.ok) throw new Error('Failed to fetch products');
    return await res.json();
};

export const createProduct = async (productData) => {
    const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(productData),
    });
    if (!res.ok) throw new Error('Failed to create product');
    return await res.json();
};

export const updateProduct = async (id, productData) => {
    const res = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(productData),
    });
    if (!res.ok) throw new Error('Failed to update product');
    return await res.json();
};

export const deleteProduct = async (id) => {
    const res = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
    });
    if (!res.ok) throw new Error('Failed to delete product');
    return await res.json();
};