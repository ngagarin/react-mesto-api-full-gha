const BASE_URL = 'https://mesto.ngagarin.com/api';

const checkResponse = (res) => {
  return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
}

const signUp = (email, password) => {
  const requestUrl = BASE_URL + '/signup';
  return fetch(requestUrl, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password }),
  }).then(checkResponse);
}

const signIn = (email, password) => {
  const requestUrl = BASE_URL + '/signin';
  return fetch(requestUrl, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password }),
  }).then(checkResponse);
}

const checkToken = (token) => {
  const requestUrl = BASE_URL + '/users/me';
  return fetch(requestUrl, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
  }).then(checkResponse);
}

export {signUp, signIn, checkToken};

/*
export const baseUrl = 'https://mesto.ngagarin.com/api';

const request = ({
  url,
  method = 'POST',
  token,
  data
}) => {
  return fetch(`${baseUrl}${url}`, {
    method,
    headers: {
      'Content-type': 'application/json',
      ...!!token && { 'authorization': `Bearer ${token}` }
    },
    ...!!data && { body: JSON.stringify(data) }
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(res);
    });
}

export const signUp = (email, password) => {
  return request({
    url: '/signup',
    data: { password: password, email: email }
  });
}

export const signIn = (email, password) => {
  return request({
    url: '/signin',
    data: { password, email }
  });
}

export const checkToken = (token) => {
  return request({
    url: '/users/me',
    method: 'GET',
    token
  });
}
*/

/*
const BASE_URL = 'https://mesto.ngagarin.com/api';

const request = ({
  url,
  method = 'POST',
  token,
  data
}) => {
  return fetch(`${BASE_URL}${url}`, {
    method,
    headers: {
      //'Accept': 'application/json',
      'Content-type': 'application/json',
      ...!!token && { 'authorization': `Bearer ${token}` }
    },
    ...!!data && { body: JSON.stringify(data) }
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(res);
    });
}

const signIn = (email, password) => {
  return request({
    url: '/signup',
    data: { password: password, email: email }
  });
}

const signUp = (email, password) => {
  return request({
    url: '/signin',
    data: { password, email }
  });
}

const checkToken = (token) => {
  return request({
    url: '/users/me',
    method: 'GET',
    token
  });
}

export {
  signUp,
  signIn,
  checkToken
};
*/
