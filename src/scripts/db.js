// import { openDB, deleteDB, wrap, unwrap } from '../../lib/idb.js';

var DEV = false;

window.onerror = function (msg, url, linenumber) {
  if (DEV === true) {
    alert(
      'Error message: ' + msg + '\nURL: ' + url + '\nLine Number: ' + linenumber
    );
  }
  return true;
};

let store_name;
let db_version;

function successMsg(msg) {
  console.info(msg);
}

function errorMsg(msg) {
  console.error(msg);
}

async function get(key) {
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
  return data;
}

async function set(key, val) {
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
  return data;
}
async function del(key) {
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
  return data;
}

async function clear() {
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
  return data;
}
async function keys() {
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
  return data;
}

window.get = get;
window.set = set;
window.del = del;
window.clear = clear;
window.keys = keys;
