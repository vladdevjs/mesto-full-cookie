export const BASE_URL = 'http://localhost:4000';

export const register = (email, password) => {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify({ password, email }),
  }).then((response) => {
    if (response.ok) {
      return response.json();
    } else {
      response.json().then((data) => console.error(data.error));
      throw new Error();
    }
  });
};

export const authorize = (email, password) => {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify({ password, email }),
  })
    .then((response) => {
      if (response.status === 200) {
        return response.json();
      } else {
        response.json().then((data) => console.error(data.message));
        throw new Error();
      }
    })
    .catch((err) => {
      throw err;
    });
};

export const logout = () => {
  return fetch(`${BASE_URL}/logout`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        response.json().then((data) => console.error(data.message));
        throw new Error();
      }
    })
    .catch((err) => {
      throw err;
    });
};

export const checkToken = () => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return res.json().then((err) => {
      throw new Error(err.message);
    });
  });
};
