const API_BASE_URL = 'https://script.google.com/macros/s/AKfycbzQaohv36okhZhVJ_UOODXEGor6fGfqNWEq1ceWiNg8YbPHsy2i-7MSkTDYTwU9ZfNo1w/exec';

/*
Ejemplo:
const API_BASE_URL = 'https://script.google.com/macros/s/AKfycbxxxxxxxxxxxxxxxx/exec';
*/

async function apiGet(action, params = {}) {
  const url = new URL(API_BASE_URL);
  url.searchParams.set('action', action);

  Object.keys(params).forEach((key) => {
    const value = params[key];
    if (value !== undefined && value !== null) {
      url.searchParams.set(key, value);
    }
  });

  const response = await fetch(url.toString(), {
    method: 'GET'
  });

  if (!response.ok) {
    throw new Error('Error HTTP GET: ' + response.status);
  }

  return await response.json();
}

async function apiPost(action, payload = {}) {
  const response = await fetch(API_BASE_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'text/plain;charset=utf-8'
    },
    body: JSON.stringify({
      action: action,
      payload: payload
    })
  });

  if (!response.ok) {
    throw new Error('Error HTTP POST: ' + response.status);
  }

  return await response.json();
}