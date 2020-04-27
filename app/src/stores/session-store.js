import {get, writable} from 'svelte/store';

function persist(key, value) {
  sessionStorage.setItem(key, JSON.stringify(value));
  return value
}

function read(key) {
  const value = sessionStorage.getItem(key)
  console.log(value)
  return value && JSON.parse(value)
}

export function writableSession(key, initialValue) {
  if(typeof sessionStorage !== 'object') return writable(initialValue)
  let sessionValue = read(key);

  if (initialValue !== undefined && !sessionValue) sessionValue = persist(key, initialValue);

  const store = writable(sessionValue);
  store.subscribe(value => persist(key, value));
  return store;
}