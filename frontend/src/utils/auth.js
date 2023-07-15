export const BASE_URL = 'https://api.vladdevs.nomoreparties.sbs';

const checkResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return res.json().then(data => Promise.reject(`Ошибка ${res.status}: ${data.message} `));
}

const options = {
  headers: {
    'Content-Type': 'application/json',
  },
  credentials: 'include'
}

export const register = (email, password) => {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    ...options,
    body: JSON.stringify({ password, email }),
  }).then((res) => checkResponse(res));
};

export const authorize = (email, password) => {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    ...options,
    body: JSON.stringify({ password, email }),
  }).then((res) => checkResponse(res));
};

export const logout = () => {
  return fetch(`${BASE_URL}/logout`, {
    method: 'POST',
    ...options,
  }).then((res) => checkResponse(res));
};

export const checkToken = () => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    ...options,
  }).then((res) => checkResponse(res));
};
