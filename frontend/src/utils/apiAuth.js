const checkResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
    return Promise.reject(res.status);
}

const BASE_URL = 'https://mesto.ngagarin.com/api';

const signUp = (email, password) => {
  const requestUrl = BASE_URL + '/signup';
  return fetch(requestUrl, {
    method: 'POST',
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({ email, password }),
  }).then(checkResponse);
}

const signIn = (email, password) => {
  const requestUrl = BASE_URL + '/signin';
  return fetch(requestUrl, {
    method: 'POST',
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({ email, password }),
  }).then(checkResponse);
}

const checkToken = (token) => {
  const requestUrl = BASE_URL + '/users/me';
  return fetch(requestUrl, {
    method: 'GET',
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
  }).then(checkResponse);
}

export {signUp, signIn, checkToken};

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
