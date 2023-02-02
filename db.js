import { openDB, deleteDB, wrap, unwrap } from './idb.js';

let store_name;
let db_version;

function successMsg(msg) {
  console.info(msg);
}

function errorMsg(msg) {
  console.error(msg);
}

export async function get(key) {
  store_name = window.localStorage.getItem('li');
  if (window.localStorage.getItem('db_version') !== null) {
    db_version = parseInt(window.localStorage.getItem('db_version'));
  } else {
    db_version = 1;
  }
  let dbPromise = openDB('nce', db_version, {
    upgrade: (db, oldVersion, newVersion, transaction) => {
      if (oldVersion < newVersion) {
        db.createObjectStore(store_name);
      }
    },
  });
  let data = (await dbPromise).get(store_name, key);
  successMsg('successfully retrieved data.');
  return data;
}
export async function set(key, val) {
  store_name = window.localStorage.getItem('li');
  if (window.localStorage.getItem('db_version') !== null) {
    db_version = parseInt(window.localStorage.getItem('db_version'));
  } else {
    db_version = 1;
  }
  let dbPromise = openDB('nce', db_version, {
    upgrade: (db, oldVersion, newVersion, transaction) => {
      if (oldVersion < newVersion) {
        db.createObjectStore(store_name);
      }
    },
  });
  let data = (await dbPromise).put(store_name, val, key);
  successMsg('successfully set data.');
  return data;
}
export async function del(key) {
  store_name = window.localStorage.getItem('li');
  if (window.localStorage.getItem('db_version') !== null) {
    db_version = parseInt(window.localStorage.getItem('db_version'));
  } else {
    db_version = 1;
  }
  let dbPromise = openDB('nce', db_version, {
    upgrade: (db, oldVersion, newVersion, transaction) => {
      if (oldVersion < newVersion) {
        db.createObjectStore(store_name);
      }
    },
  });
  let data = (await dbPromise).delete(store_name, key);
  successMsg('successfully deleted data.');
  return data;
}
export async function clear() {
  store_name = window.localStorage.getItem('li');
  if (window.localStorage.getItem('db_version') !== null) {
    db_version = parseInt(window.localStorage.getItem('db_version'));
  } else {
    db_version = 1;
  }
  let dbPromise = openDB('nce', db_version, {
    upgrade: (db, oldVersion, newVersion, transaction) => {
      if (oldVersion < newVersion) {
        db.createObjectStore(store_name);
      }
    },
  });
  let data = (await dbPromise).clear(store_name);
  successMsg('successfully deleted data.');
  return data;
}
export async function keys() {
  store_name = window.localStorage.getItem('li');
  if (window.localStorage.getItem('db_version') !== null) {
    db_version = parseInt(window.localStorage.getItem('db_version'));
  } else {
    db_version = 1;
  }
  let dbPromise = openDB('nce', db_version, {
    upgrade: (db, oldVersion, newVersion, transaction) => {
      if (oldVersion < newVersion) {
        db.createObjectStore(store_name);
      }
    },
  });
  let data = (await dbPromise).getAllKeys(store_name);
  successMsg('successfully deleted data.');
  return data;
}
