const API_BASE_URL = 'http://localhost:5000/api';

export async function fetchProducts() {
  const response = await fetch(`${API_BASE_URL}/products`);

  if (!response.ok) {
    throw new Error('Unable to load products. Please try again.');
  }

  return response.json();
}

export async function fetchProductById(id) {
  const response = await fetch(`${API_BASE_URL}/products/${id}`);

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || 'Product not found.');
  }

  return response.json();
}

export async function loginUser(email, password) {
  const response = await fetch(`${API_BASE_URL}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password })
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Login failed.');
  }

  return data;
}

export async function fetchOrders(token) {
  const response = await fetch(`${API_BASE_URL}/orders`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Unable to fetch orders.');
  }

  return data;
}

export async function placeOrder(cartItems, token) {
  const response = await fetch(`${API_BASE_URL}/orders`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({ cartItems })
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Unable to place order.');
  }

  return data;
}
