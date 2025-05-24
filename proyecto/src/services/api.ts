// API service for DummyJSON integration
const BASE_URL = 'https://dummyjson.com';

// Authentication
export const login = async (username: string, password: string) => {
  try {
    const response = await fetch(`${BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });
    
    if (!response.ok) {
      throw new Error('Credenciales inválidas');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error en login:', error);
    throw error;
  }
};

// Users
export const fetchUsers = async () => {
  try {
    const response = await fetch(`${BASE_URL}/users?limit=20`);
    
    if (!response.ok) {
      throw new Error('Error al obtener usuarios');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};

export const fetchUser = async (userId: number) => {
  try {
    const response = await fetch(`${BASE_URL}/users/${userId}`);
    
    if (!response.ok) {
      throw new Error('Error al obtener detalles del usuario');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching user details:', error);
    throw error;
  }
};

// Products
export const fetchProducts = async () => {
  try {
    const response = await fetch(`${BASE_URL}/products?limit=100`);
    
    if (!response.ok) {
      throw new Error('Error al obtener productos');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

export const fetchProduct = async (productId: number) => {
  try {
    const response = await fetch(`${BASE_URL}/products/${productId}`);
    
    if (!response.ok) {
      throw new Error('Error al obtener detalles del producto');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching product details:', error);
    throw error;
  }
};

// Carts
export const fetchCarts = async () => {
  try {
    const response = await fetch(`${BASE_URL}/carts?limit=20`);
    
    if (!response.ok) {
      throw new Error('Error al obtener carritos');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching carts:', error);
    throw error;
  }
};

export const fetchCart = async (cartId: number) => {
  try {
    const response = await fetch(`${BASE_URL}/carts/${cartId}`);
    
    if (!response.ok) {
      throw new Error('Error al obtener detalles del carrito');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching cart details:', error);
    throw error;
  }
};