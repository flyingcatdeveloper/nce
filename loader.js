import { get, set, del, clear, keys } from './db.js';

var DEV = false;

window.onerror = function (msg, url, linenumber) {
  if (DEV === true) {
    alert(
      'Error message: ' + msg + '\nURL: ' + url + '\nLine Number: ' + linenumber
    );
  }
  return true;
};

var queryString = new Array();
window.onload = function () {
  if (queryString.length == 0) {
    if (window.location.search.split('?').length > 1) {
      var params = window.location.search.split('?')[1].split('&');
      for (var i = 0; i < params.length; i++) {
        var key = params[i].split('=')[0];
        var value = decodeURIComponent(params[i].split('=')[1]);
        queryString[key] = value;
      }
    }
  }
  if (
    queryString['id'] !== null &&
    queryString['f'] !== null &&
    window.localStorage.getItem('offline') !== 'true'
  ) {
    var data = null;

    var xhr = new XMLHttpRequest();
    xhr.withCredentials = false;

    xhr.addEventListener('readystatechange', function () {
      if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
        validate(JSON.parse(xhr.responseText));
      } else if (xhr.readyState === XMLHttpRequest.DONE) {
        alert('id is invalid.');
        window.location.replace('./index.html');
      }
    });

    xhr.open(
      'GET',
      'https://zball-ec41.restdb.io/rest/editor/' + queryString['id']
    );
    xhr.setRequestHeader('content-type', 'application/json');
    xhr.setRequestHeader('x-apikey', '6228c7c7dced170e8c83a0b8');
    xhr.setRequestHeader('cache-control', 'no-cache');

    xhr.send(data);
  } else if (queryString['id'] !== null && queryString['f'] !== undefined) {
    get(queryString['id']).then((val) => {
      validate(val);
    });
  }
};

function getCookie(cname) {
  let name = cname + '=';
  let cokie = document.cookie;
  let ca = cokie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return '';
}

var afs,
  resources = [],
  fls,
  tds,
  tdf,
  s,
  acc;

function loadcode() {
  var access;
  if (window.localStorage.getItem('offline') !== 'true') {
    var splitData = window.acc.split(';');
    var sad = splitData[0].split(':');
    if (s['Preview Visibility'] === 'Only Me') {
      if (sad[0] === getCookie('li')) {
        access = true;
      } else {
        access = false;
      }
    } else if (s['Preview Visibility'] === 'Shared With') {
      access = true;
    }
  } else {
    access = true;
  }
  if (access === true) {
    var newResource;
    var url,
      filename,
      paths,
      folder,
      styl,
      count = -1;
    var split = queryString['f'].split('.');
    document.getElementsByTagName("html")[0].innerHTML = window.afs[split[0]][decodeURIComponent(split[1])];
    var titles = document.getElementsByTagName('title');
    if (!titles.length) {
      document.title = 'NCE View';
    } else {
      document.title = titles[0].innerHTML;
    }
    var scripts = document.querySelectorAll('script');
    var styles = document.querySelectorAll('link');
    var links = document.querySelectorAll('a');
    
    Array.from({ length: links.length }, () => {
      count += 1;
      if (links[count].hasAttribute('href')) {
        url = links[count].href;
        var splitHost = url.split("/");
        var host = splitHost[2];
        if (host === window.location.host) {
          paths = url.split('/');
          folder = paths[paths.length - 2];
          filename = paths[paths.length - 1];
          tds = filename.split('.');
          tdf = encodeURIComponent(window.Base64.encode(tds[0])) + '-' + tds[1];
          if (window.afs[folder] !== undefined) {
            links[count].href =
              './view.html?id=' +
              queryString['id'] +
              '&f=' +
              folder +
              '.' +
              tdf;
          } else {
            var splitFol = queryString["f"].split(".");
            links[count].href =
              './view.html?id=' + queryString['id'] + '&f=' + splitFol[0] + '.' + tdf;
          }
        }
      }
    });
    count = -1;
    Array.from({ length: styles.length }, () => {
      count += 1;
      if (styles[count].hasAttribute('rel')) {
        if (styles[count].getAttribute('rel') === 'stylesheet') {
          url = styles[count].href;
          var splitHost = url.split("/");
          var host = splitHost[2];
          if (host === window.location.hostname) {
            paths = url.split('/');
            folder = paths[paths.length - 2];
            filename = paths[paths.length - 1];
            tds = filename.split('.');
            tdf = window.Base64.encode(tds[0]) + '-' + tds[1];
            styl = document.createElement('style');
            if (window.afs[folder] !== undefined) {
              styl.innerHTML = window.afs[folder][tdf];
            } else {
              var splitFol = queryString["f"].split(".");
              styl.innerHTML = window.afs[splitFol[0]][tdf];
            }
            styles[count].parentNode.removeChild(styles[count]);
            document.head.appendChild(styl);
          }
        }
      }
    });
    count = -1;
    Array.from({ length: scripts.length }, () => {
      count += 1;
      if (scripts[count].hasAttribute('src')) {
        
        url = scripts[count].src;
        var splitHost = url.split("/");
        var host = splitHost[2];
        if (host === window.location.hostname) {
            paths = url.split('/');
            folder = paths[paths.length - 2];
            filename = paths[paths.length - 1];
            tds = filename.split('.');
            tdf = window.Base64.encode(tds[0]) + '-' + tds[1];
            if (window.afs[folder] !== undefined) {
              var code = window.afs[folder][tdf];
              var a = code.split(';');
              a.forEach((item) => {
                if (
                  item.includes('window.location.replace') === true ||
                  item.includes('location.replace') === true
                ) {
                  var toBracket = item.split('(')[1];
                  if (toBracket.includes("'") === true) {
                    var toQuotation1 = toBracket.split("'")[1];
                    var toQuotation2 = toQuotation1.split("'")[0];
                    if (toQuotation2.includes('./') === true) {
                      var splitDotSlash = toQuotation2.split('./')[1];
                      if (splitDotSlash.includes('/') === true) {
                        var splitFolder = splitDotSlash.split('/');
                        var folder = splitFolder[0];
                        var file = splitFolder[1];
                        var splitFile = file.split('.');
                        var piece = item + ';';
                        code = code.replace(
                          piece,
                          "window.location.replace('" +
                            './view.html?id=' +
                            queryString['id'] +
                            '&f=' +
                            folder +
                            '.' +
                            encodeURIComponent(window.Base64.encode(splitFile[0])) +
                            '-' +
                            splitFile[1] +
                            "');"
                        );
                      } else {
                        var file = splitDotSlash;
                        var splitFolder = queryString['f'].split(".");
                        var folder = splitFolder[0];
                        var splitFile = file.split('.');
                        var piece = item + ';';
                        code = code.replace(
                          piece,
                          "window.location.replace('" +
                            './view.html?id=' +
                            queryString['id'] +
                            '&f=' + folder +
                            '.' +
                            encodeURIComponent(window.Base64.encode(splitFile[0])) +
                            '-' +
                            splitFile[1] +
                            "');"
                        );
                      }
                    } else {
                      if (toQuotation2.includes('/') === true) {
                        var splitFolder = toQuotation2.split('/');
                        var folder = splitFolder[0];
                        var file = splitFolder[1];
                        var splitFile = file.split('.');
                        var piece = item + ';';
                        code = code.replace(
                          piece,
                          "window.location.replace('" +
                            './view.html?id=' +
                            queryString['id'] +
                            '&f=' +
                            folder +
                            '.' +
                            encodeURIComponent(window.Base64.encode(splitFile[0])) +
                            '-' +
                            splitFile[1] +
                            "');"
                        );
                      } else {
                        var file = toQuotation2;
                        var splitFolder = queryString["f"].split(".");
                        var folder = splitFolder[0];
                        var splitFile = file.split('.');
                        var piece = item + ';';
                        code = code.replace(
                          piece,
                          "window.location.replace('" +
                            './view.html?id=' +
                            queryString['id'] +
                            '&f=' + folder +
                            '.' +
                            encodeURIComponent(window.Base64.encode(splitFile[0])) +
                            '-' +
                            splitFile[1] +
                            "');"
                        );
                      }
                    }
                  } else if (toBracket.includes('"') === true) {
                    var toQuotation1 = toBracket.split('"')[1];
                    var toQuotation2 = toQuotation1.split('"')[0];
                    if (toQuotation2.includes('./') === true) {
                      var splitDotSlash = toQuotation2.split('./')[1];
                      if (splitDotSlash.includes('/') === true) {
                        var splitFolder = splitDotSlash.split('/');
                        var folder = splitFolder[0];
                        var file = splitFolder[1];
                        var splitFile = file.split('.');
                        var piece = item + ';';
                        code = code.replace(
                          piece,
                          "window.location.replace('" +
                            './view.html?id=' +
                            queryString['id'] +
                            '&f=' +
                            folder +
                            '.' +
                            encodeURIComponent(window.Base64.encode(splitFile[0])) +
                            '-' +
                            splitFile[1] +
                            "');"
                        );
                      } else {
                        var file = splitDotSlash;
                        var splitFolder = queryString["f"].split(".");
                        var folder = splitFolder[0];
                        var splitFile = file.split('.');
                        var piece = item + ';';
                        code = code.replace(
                          piece,
                          "window.location.replace('" +
                            './view.html?id=' +
                            queryString['id'] +
                            '&f=' + folder +
                            '.' +
                            encodeURIComponent(window.Base64.encode(splitFile[0])) +
                            '-' +
                            splitFile[1] +
                            "');"
                        );
                      }
                    } else {
                      if (toQuotation2.includes('/') === true) {
                        var splitFolder = toQuotation2.split('/');
                        var folder = splitFolder[0];
                        var file = splitFolder[1];
                        var splitFile = file.split('.');
                        var piece = item + ';';
                        code = code.replace(
                          piece,
                          "window.location.replace('" +
                            './view.html?id=' +
                            queryString['id'] +
                            '&f=' +
                            folder +
                            '.' +
                            encodeURIComponent(window.Base64.encode(splitFile[0])) +
                            '-' +
                            splitFile[1] +
                            "');"
                        );
                      } else {
                        var file = toQuotation2;
                        var splitFolder = queryString["f"].split(".");
                        var folder = splitFolder[0];
                        var splitFile = file.split('.');
                        var piece = item + ';';
                        code = code.replace(
                          piece,
                          "window.location.replace('" +
                            './view.html?id=' +
                            queryString['id'] +
                            '&f=' + folder +
                            '.' +
                            encodeURIComponent(window.Base64.encode(splitFile[0])) +
                            '-' +
                            splitFile[1] +
                            "');"
                        );
                      }
                    }
                  }
                } else if (
                  item.includes('location.href') === true ||
                  item.includes('window.location.href') === true
                ) {
                  var toEqual = item.split('=')[1];
                  if (toEqual.includes("'") === true) {
                    var toQuotation = toEqual.split("'")[1];
                    if (toQuotation.includes('./') === true) {
                      var splitDotSlash = toQuotation.split('./')[1];
                      if (splitDotSlash.includes('/') === true) {
                        var splitFolder = splitDotSlash.split('/');
                        var folder = splitFolder[0];
                        var file = splitFolder[1];
                        var splitFile = file.split('.');
                        var piece = item + ';';
                        code = code.replace(
                          piece,
                          "window.location.href = './view.html?id=" +
                            queryString['id'] +
                            '&f=' +
                            folder +
                            '.' +
                            encodeURIComponent(window.Base64.encode(splitFile[0])) +
                            '-' +
                            splitFile[1] +
                            "';"
                        );
                      } else {
                        var file = splitDotSlash;
                        var splitFolder = queryString["f"].split(".");
                        var folder = splitFolder[0];
                        var splitFile = file.split('.');
                        var piece = item + ';';
                        code = code.replace(
                          piece,
                          "window.location.href = './view.html?id=" +
                            queryString['id'] +
                            '&f=' + folder + 
                            '.' +
                            encodeURIComponent(window.Base64.encode(splitFile[0])) +
                            '-' +
                            splitFile[1] +
                            "';"
                        );
                      }
                    } else {
                      if (toQuotation.includes('/') === true) {
                        var splitFolder = toQuotation.split('/');
                        var folder = splitFolder[0];
                        var file = splitFolder[1];
                        var splitFile = file.split('.');
                        var piece = item + ';';
                        code = code.replace(
                          piece,
                          "window.location.href = './view.html?id=" +
                            queryString['id'] +
                            '&f=' +
                            folder +
                            '.' +
                            encodeURIComponent(window.Base64.encode(splitFile[0])) +
                            '-' +
                            splitFile[1] +
                            "';"
                        );
                      } else {
                        var file = toQuotation;
                        var splitFolder = queryString["f"].split(".");
                        var folder = splitFolder[0];
                        var splitFile = file.split('.');
                        var piece = item + ';';
                        code = code.replace(
                          piece,
                          "window.location.href = './view.html?id=" +
                            queryString['id'] +
                            '&f=' + folder +
                            '.' +
                            encodeURIComponent(window.Base64.encode(splitFile[0])) +
                            '-' +
                            splitFile[1] +
                            "';"
                        );
                      }
                    }
                  } else if (toEqual.includes('"') === true) {
                    var toQuotation = toEqual.split('"')[1];
                    if (toQuotation.includes('./') === true) {
                      var splitDotSlash = toQuotation.split('./')[1];
                      if (splitDotSlash.includes('/') === true) {
                        var splitFolder = splitDotSlash.split('/');
                        var folder = splitFolder[0];
                        var file = splitFolder[1];
                        var splitFile = file.split('.');
                        var piece = item + ';';
                        code = code.replace(
                          piece,
                          "window.location.href = './view.html?id=" +
                            queryString['id'] +
                            '&f=' +
                            folder +
                            '.' +
                            encodeURIComponent(window.Base64.encode(splitFile[0])) +
                            '-' +
                            splitFile[1] +
                            "';"
                        );
                      } else {
                        var file = splitDotSlash;
                        var splitFolder = queryString["f"].split(".");
                        var folder = splitFolder[0];
                        var splitFile = file.split('.');
                        var piece = item + ';';
                        code = code.replace(
                          piece,
                          "window.location.href = './view.html?id=" +
                            queryString['id'] +
                            '&f=' + folder +
                            '.' +
                            encodeURIComponent(window.Base64.encode(splitFile[0])) +
                            '-' +
                            splitFile[1] +
                            "';"
                        );
                      }
                    } else {
                      if (toQuotation.includes('/') === true) {
                        var splitFolder = toQuotation.split('/');
                        var folder = splitFolder[0];
                        var file = splitFolder[1];
                        var splitFile = file.split('.');
                        var piece = item + ';';
                        code = code.replace(
                          piece,
                          "window.location.href = './view.html?id=" +
                            queryString['id'] +
                            '&f=' +
                            folder +
                            '.' +
                            encodeURIComponent(window.Base64.encode(splitFile[0])) +
                            '-' +
                            splitFile[1] +
                            "';"
                        );
                      } else {
                        var file = toQuotation;
                        var splitFolder = queryString["f"].split(".");
                        var folder = splitFolder[0];
                        var splitFile = file.split('.');
                        var piece = item + ';';
                        code = code.replace(
                          piece,
                          "window.location.href = './view.html?id=" +
                            queryString['id'] +
                            '&f=' + folder +
                            '.' +
                            encodeURIComponent(window.Base64.encode(splitFile[0])) +
                            '-' +
                            splitFile[1] +
                            "';"
                        );
                      }
                    }
                  }
                }
              });
              scripts[count].parentNode.removeChild(scripts[count]);
              window.eval(code);
            } else {
              var splitFolder = queryString['f'].split(".");
              var folder = splitFolder[0];
              var code = window.afs[folder][tdf];
              var a = code.split(';');
              a.forEach((item) => {
                if (
                  item.includes('window.location.replace') === true ||
                  item.includes('location.replace') === true
                ) {
                  var toBracket = item.split('(')[1];
                  if (toBracket.includes("'") === true) {
                    var toQuotation1 = toBracket.split("'")[1];
                    var toQuotation2 = toQuotation1.split("'")[0];
                    if (toQuotation2.includes('./') === true) {
                      var splitDotSlash = toQuotation2.split('./')[1];
                      if (splitDotSlash.includes('/') === true) {
                        var splitFolder = splitDotSlash.split('/');
                        var folder = splitFolder[0];
                        var file = splitFolder[1];
                        var splitFile = file.split('.');
                        var piece = item + ';';
                        code = code.replace(
                          piece,
                          "window.location.replace('" +
                            './view.html?id=' +
                            queryString['id'] +
                            '&f=' +
                            folder +
                            '.' +
                            encodeURIComponent(window.Base64.encode(splitFile[0])) +
                            '-' +
                            splitFile[1] +
                            "');"
                        );
                      } else {
                        var file = splitDotSlash;
                        var splitFolder = queryString["f"].split(".");
                        var folder = splitFolder[0];
                        var splitFile = file.split('.');
                        var piece = item + ';';
                        code = code.replace(
                          piece,
                          "window.location.replace('" +
                            './view.html?id=' +
                            queryString['id'] +
                            '&f=' + folder + 
                            '.' +
                            encodeURIComponent(window.Base64.encode(splitFile[0])) +
                            '-' +
                            splitFile[1] +
                            "');"
                        );
                      }
                    } else {
                      if (toQuotation2.includes('/') === true) {
                        var splitFolder = toQuotation2.split('/');
                        var folder = splitFolder[0];
                        var file = splitFolder[1];
                        var splitFile = file.split('.');
                        var piece = item + ';';
                        code = code.replace(
                          piece,
                          "window.location.replace('" +
                            './view.html?id=' +
                            queryString['id'] +
                            '&f=' +
                            folder +
                            '.' +
                            encodeURIComponent(window.Base64.encode(splitFile[0])) +
                            '-' +
                            splitFile[1] +
                            "');"
                        );
                      } else {
                        var file = toQuotation2;
                        var splitFolder = queryString["f"].split(".");
                        var folder = splitFolder[0];
                        var splitFile = file.split('.');
                        var piece = item + ';';
                        code = code.replace(
                          piece,
                          "window.location.replace('" +
                            './view.html?id=' +
                            queryString['id'] +
                            '&f=' + folder +
                            '.' +
                            encodeURIComponent(window.Base64.encode(splitFile[0])) +
                            '-' +
                            splitFile[1] +
                            "');"
                        );
                      }
                    }
                  } else if (toBracket.includes('"') === true) {
                    var toQuotation1 = toBracket.split('"')[1];
                    var toQuotation2 = toQuotation1.split('"')[0];
                    if (toQuotation2.includes('./') === true) {
                      var splitDotSlash = toQuotation2.split('./')[1];
                      if (splitDotSlash.includes('/') === true) {
                        var splitFolder = splitDotSlash.split('/');
                        var folder = splitFolder[0];
                        var file = splitFolder[1];
                        var splitFile = file.split('.');
                        var piece = item + ';';
                        code = code.replace(
                          piece,
                          "window.location.replace('" +
                            './view.html?id=' +
                            queryString['id'] +
                            '&f=' +
                            folder +
                            '.' +
                            encodeURIComponent(window.Base64.encode(splitFile[0])) +
                            '-' +
                            splitFile[1] +
                            "');"
                        );
                      } else {
                        var file = splitDotSlash;
                        var splitFolder = queryString["f"].split(".");
                        var folder = splitFolder[0];
                        var splitFile = file.split('.');
                        var piece = item + ';';
                        code = code.replace(
                          piece,
                          "window.location.replace('" +
                            './view.html?id=' +
                            queryString['id'] +
                            '&f=' + folder + 
                            '.' +
                            encodeURIComponent(window.Base64.encode(splitFile[0])) +
                            '-' +
                            splitFile[1] +
                            "');"
                        );
                      }
                    } else {
                      if (toQuotation2.includes('/') === true) {
                        var splitFolder = toQuotation2.split('/');
                        var folder = splitFolder[0];
                        var file = splitFolder[1];
                        var splitFile = file.split('.');
                        var piece = item + ';';
                        code = code.replace(
                          piece,
                          "window.location.replace('" +
                            './view.html?id=' +
                            queryString['id'] +
                            '&f=' +
                            folder +
                            '.' +
                            encodeURIComponent(window.Base64.encode(splitFile[0])) +
                            '-' +
                            splitFile[1] +
                            "');"
                        );
                      } else {
                        var file = toQuotation2;
                        var splitFolder = queryString["f"].split(".");
                        var folder = splitFolder[0];
                        var splitFile = file.split('.');
                        var piece = item + ';';
                        code = code.replace(
                          piece,
                          "window.location.replace('" +
                            './view.html?id=' +
                            queryString['id'] +
                            '&f=' + folder +
                            '.' +
                            encodeURIComponent(window.Base64.encode(splitFile[0])) +
                            '-' +
                            splitFile[1] +
                            "');"
                        );
                      }
                    }
                  }
                } else if (
                  item.includes('location.href') === true ||
                  item.includes('window.location.href') === true
                ) {
                  var toEqual = item.split('=')[1];
                  if (toEqual.includes("'") === true) {
                    var toQuotation = toEqual.split("'")[1];
                    if (toQuotation.includes('./') === true) {
                      var splitDotSlash = toQuotation.split('./')[1];
                      if (splitDotSlash.includes('/') === true) {
                        var splitFolder = splitDotSlash.split('/');
                        var folder = splitFolder[0];
                        var file = splitFolder[1];
                        var splitFile = file.split('.');
                        var piece = item + ';';
                        code = code.replace(
                          piece,
                          "window.location.href = './view.html?id=" +
                            queryString['id'] +
                            '&f=' +
                            folder +
                            '.' +
                            encodeURIComponent(window.Base64.encode(splitFile[0])) +
                            '-' +
                            splitFile[1] +
                            "';"
                        );
                      } else {
                        var file = splitDotSlash;
                        var splitFolder = queryString["f"].split(".");
                        var folder = splitFolder[0];
                        var splitFile = file.split('.');
                        var piece = item + ';';
                        code = code.replace(
                          piece,
                          "window.location.href = './view.html?id=" +
                            queryString['id'] +
                            '&f=' + folder +
                            '.' +
                            encodeURIComponent(window.Base64.encode(splitFile[0])) +
                            '-' +
                            splitFile[1] +
                            "';"
                        );
                      }
                    } else {
                      if (toQuotation.includes('/') === true) {
                        var splitFolder = toQuotation.split('/');
                        var folder = splitFolder[0];
                        var file = splitFolder[1];
                        var splitFile = file.split('.');
                        var piece = item + ';';
                        code = code.replace(
                          piece,
                          "window.location.href = './view.html?id=" +
                            queryString['id'] +
                            '&f=' +
                            folder +
                            '.' +
                            encodeURIComponent(window.Base64.encode(splitFile[0])) +
                            '-' +
                            splitFile[1] +
                            "';"
                        );
                      } else {
                        var file = toQuotation;
                        var splitFolder = queryString["f"].split(".");
                        var folder = splitFolder[0];
                        var splitFile = file.split('.');
                        var piece = item + ';';
                        code = code.replace(
                          piece,
                          "window.location.href = './view.html?id=" +
                            queryString['id'] +
                            '&f=' + folder +
                            '.' +
                            encodeURIComponent(window.Base64.encode(splitFile[0])) +
                            '-' +
                            splitFile[1] +
                            "';"
                        );
                      }
                    }
                  } else if (toEqual.includes('"') === true) {
                    var toQuotation = toEqual.split('"')[1];
                    if (toQuotation.includes('./') === true) {
                      var splitDotSlash = toQuotation.split('./')[1];
                      if (splitDotSlash.includes('/') === true) {
                        var splitFolder = splitDotSlash.split('/');
                        var folder = splitFolder[0];
                        var file = splitFolder[1];
                        var splitFile = file.split('.');
                        var piece = item + ';';
                        code = code.replace(
                          piece,
                          "window.location.href = './view.html?id=" +
                            queryString['id'] +
                            '&f=' +
                            folder +
                            '.' +
                            encodeURIComponent(window.Base64.encode(splitFile[0])) +
                            '-' +
                            splitFile[1] +
                            "';"
                        );
                      } else {
                        var file = splitDotSlash;
                        var splitFolder = queryString["f"].split(".");
                        var folder = splitFolder[0];
                        var splitFile = file.split('.');
                        var piece = item + ';';
                        code = code.replace(
                          piece,
                          "window.location.href = './view.html?id=" +
                            queryString['id'] +
                            '&f=' + folder +
                            '.' +
                            encodeURIComponent(window.Base64.encode(splitFile[0])) +
                            '-' +
                            splitFile[1] +
                            "';"
                        );
                      }
                    } else {
                      if (toQuotation.includes('/') === true) {
                        var splitFolder = toQuotation.split('/');
                        var folder = splitFolder[0];
                        var file = splitFolder[1];
                        var splitFile = file.split('.');
                        var piece = item + ';';
                        code = code.replace(
                          piece,
                          "window.location.href = './view.html?id=" +
                            queryString['id'] +
                            '&f=' +
                            folder +
                            '.' +
                            encodeURIComponent(window.Base64.encode(splitFile[0])) +
                            '-' +
                            splitFile[1] +
                            "';"
                        );
                      } else {
                        var file = toQuotation;
                        var splitFolder = queryString["f"].split(".");
                        var folder = splitFolder[0];
                        var splitFile = file.split('.');
                        var piece = item + ';';
                        code = code.replace(
                          piece,
                          "window.location.href = './view.html?id=" +
                            queryString['id'] +
                            '&f=' + folder +
                            '.' +
                            encodeURIComponent(window.Base64.encode(splitFile[0])) +
                            '-' +
                            splitFile[1] +
                            "';"
                        );
                      }
                    }
                  }
                } else {
                  return;
                }
              });
              var newScript = document.createElement('script');
              newScript.innerHTML = code;
              document.body.appendChild(newScript);
            }
          } else {
            function makeHttpObject() {
              try {return new XMLHttpRequest();}
              catch (error) {}
              try {return new ActiveXObject("Msxml2.XMLHTTP");}
              catch (error) {}
              try {return new ActiveXObject("Microsoft.XMLHTTP");}
              catch (error) {}
            
              throw new Error("Could not create HTTP request object.");
            }
            
            var request = makeHttpObject();
            request.open("GET", url, true);
            request.send(null);
            request.onreadystatechange = function() {
              if (request.readyState == 4)
                window.eval(request.responseText);
            };
          }
        } else {
            var code = scripts[count].innerHTML;
            var a = code.split(';');
            a.forEach((item) => {
              if (
                item.includes('window.location.replace') === true ||
                item.includes('location.replace') === true
              ) {
                var toBracket = item.split('(')[1];
                if (toBracket.includes("'") === true) {
                  var toQuotation1 = toBracket.split("'")[1];
                  var toQuotation2 = toQuotation1.split("'")[0];
                  if (toQuotation2.includes('./') === true) {
                    var splitDotSlash = toQuotation2.split('./')[1];
                    if (splitDotSlash.includes('/') === true) {
                      var splitFolder = splitDotSlash.split('/');
                      var folder = splitFolder[0];
                      var file = splitFolder[1];
                      var splitFile = file.split('.');
                      var piece = item + ';';
                      code = code.replace(
                        piece,
                        "window.location.replace('" +
                          './view.html?id=' +
                          queryString['id'] +
                          '&f=' +
                          folder +
                          '.' +
                          encodeURIComponent(window.Base64.encode(splitFile[0])) +
                          '-' +
                          splitFile[1] +
                          "');"
                      );
                    } else {
                      var file = splitDotSlash;
                      var splitFolder = queryString["f"].split(".");
                      var folder = splitFolder[0];
                      var splitFile = file.split('.');
                      var piece = item + ';';
                      code = code.replace(
                        piece,
                        "window.location.replace('" +
                          './view.html?id=' +
                          queryString['id'] +
                          '&f=' + folder +
                          '.' +
                          encodeURIComponent(window.Base64.encode(splitFile[0])) +
                          '-' +
                          splitFile[1] +
                          "');"
                      );
                    }
                  } else {
                    if (toQuotation2.includes('/') === true) {
                      var splitFolder = toQuotation2.split('/');
                      var folder = splitFolder[0];
                      var file = splitFolder[1];
                      var splitFile = file.split('.');
                      var piece = item + ';';
                      code = code.replace(
                        piece,
                        "window.location.replace('" +
                          './view.html?id=' +
                          queryString['id'] +
                          '&f=' +
                          folder +
                          '.' +
                          encodeURIComponent(window.Base64.encode(splitFile[0])) +
                          '-' +
                          splitFile[1] +
                          "');"
                      );
                    } else {
                      var splitFolder = queryString["f"].split(".");
                      var folder = splitFolder[0];
                      var file = toQuotation2;
                      var splitFile = file.split('.');
                      var piece = item + ';';
                      code = code.replace(
                        piece,
                        "window.location.replace('" +
                          './view.html?id=' +
                          queryString['id'] +
                          '&f=' + folder +
                          '.' +
                          encodeURIComponent(window.Base64.encode(splitFile[0])) +
                          '-' +
                          splitFile[1] +
                          "');"
                      );
                    }
                  }
                } else if (toBracket.includes('"') === true) {
                  var toQuotation1 = toBracket.split('"')[1];
                  var toQuotation2 = toQuotation1.split('"')[0];
                  if (toQuotation2.includes('./') === true) {
                    var splitDotSlash = toQuotation2.split('./')[1];
                    if (splitDotSlash.includes('/') === true) {
                      var splitFolder = splitDotSlash.split('/');
                      var folder = splitFolder[0];
                      var file = splitFolder[1];
                      var splitFile = file.split('.');
                      var piece = item + ';';
                      code = code.replace(
                        piece,
                        "window.location.replace('" +
                          './view.html?id=' +
                          queryString['id'] +
                          '&f=' +
                          folder +
                          '.' +
                          encodeURIComponent(window.Base64.encode(splitFile[0])) +
                          '-' +
                          splitFile[1] +
                          "');"
                      );
                    } else {
                      var splitFolder = queryString["f"].split(".");
                      var folder = splitFolder[0];
                      var file = splitDotSlash;
                      var splitFile = file.split('.');
                      var piece = item + ';';
                      code = code.replace(
                        piece,
                        "window.location.replace('" +
                          './view.html?id=' +
                          queryString['id'] +
                          '&f=' + folder +
                          '.' +
                          encodeURIComponent(window.Base64.encode(splitFile[0])) +
                          '-' +
                          splitFile[1] +
                          "');"
                      );
                    }
                  } else {
                    if (toQuotation2.includes('/') === true) {
                      var splitFolder = toQuotation2.split('/');
                      var folder = splitFolder[0];
                      var file = splitFolder[1];
                      var splitFile = file.split('.');
                      var piece = item + ';';
                      code = code.replace(
                        piece,
                        "window.location.replace('" +
                          './view.html?id=' +
                          queryString['id'] +
                          '&f=' +
                          folder +
                          '.' +
                          encodeURIComponent(window.Base64.encode(splitFile[0])) +
                          '-' +
                          splitFile[1] +
                          "');"
                      );
                    } else {
                      var file = toQuotation2;
                      var splitFolder = queryString["f"].split(".");
                      var folder = splitFolder[0];
                      var splitFile = file.split('.');
                      var piece = item + ';';
                      code = code.replace(
                        piece,
                        "window.location.replace('" +
                          './view.html?id=' +
                          queryString['id'] +
                          '&f=' + folder +
                          '.' +
                          encodeURIComponent(window.Base64.encode(splitFile[0])) +
                          '-' +
                          splitFile[1] +
                          "');"
                      );
                    }
                  }
                }
              } else if (
                item.includes('location.href') === true ||
                item.includes('window.location.href') === true
              ) {
                var toEqual = item.split('=')[1];
                if (toEqual.includes("'") === true) {
                  var toQuotation = toEqual.split("'")[1];
                  if (toQuotation.includes('./') === true) {
                    var splitDotSlash = toQuotation.split('./')[1];
                    if (splitDotSlash.includes('/') === true) {
                      var splitFolder = splitDotSlash.split('/');
                      var folder = splitFolder[0];
                      var file = splitFolder[1];
                      var splitFile = file.split('.');
                      var piece = item + ';';
                      code = code.replace(
                        piece,
                        "window.location.href = './view.html?id=" +
                          queryString['id'] +
                          '&f=' +
                          folder +
                          '.' +
                          encodeURIComponent(window.Base64.encode(splitFile[0])) +
                          '-' +
                          splitFile[1] +
                          "';"
                      );
                    } else {
                      var file = splitDotSlash;
                      var splitFolder = queryString["f"].split(".");
                      var folder = splitFolder[0];
                      var splitFile = file.split('.');
                      var piece = item + ';';
                      code = code.replace(
                        piece,
                        "window.location.href = './view.html?id=" +
                          queryString['id'] +
                          '&f=' + folder +
                          '.' +
                          encodeURIComponent(window.Base64.encode(splitFile[0])) +
                          '-' +
                          splitFile[1] +
                          "';"
                      );
                    }
                  } else {
                    if (toQuotation.includes('/') === true) {
                      var splitFolder = toQuotation.split('/');
                      var folder = splitFolder[0];
                      var file = splitFolder[1];
                      var splitFile = file.split('.');
                      var piece = item + ';';
                      code = code.replace(
                        piece,
                        "window.location.href = './view.html?id=" +
                          queryString['id'] +
                          '&f=' +
                          folder +
                          '.' +
                          encodeURIComponent(window.Base64.encode(splitFile[0])) +
                          '-' +
                          splitFile[1] +
                          "';"
                      );
                    } else {
                      var file = toQuotation;
                      var splitFolder = queryString["f"].split(".");
                      var folder = splitFolder[0];
                      var splitFile = file.split('.');
                      var piece = item + ';';
                      code = code.replace(
                        piece,
                        "window.location.href = './view.html?id=" +
                          queryString['id'] +
                          '&f=' + folder +
                          '.' +
                          encodeURIComponent(window.Base64.encode(splitFile[0])) +
                          '-' +
                          splitFile[1] +
                          "';"
                      );
                    }
                  }
                } else if (toEqual.includes('"') === true) {
                  var toQuotation = toEqual.split('"')[1];
                  if (toQuotation.includes('./') === true) {
                    var splitDotSlash = toQuotation.split('./')[1];
                    if (splitDotSlash.includes('/') === true) {
                      var splitFolder = splitDotSlash.split('/');
                      var folder = splitFolder[0];
                      var file = splitFolder[1];
                      var splitFile = file.split('.');
                      var piece = item + ';';
                      code = code.replace(
                        piece,
                        "window.location.href = './view.html?id=" +
                          queryString['id'] +
                          '&f=' +
                          folder +
                          '.' +
                          encodeURIComponent(window.Base64.encode(splitFile[0])) +
                          '-' +
                          splitFile[1] +
                          "';"
                      );
                    } else {
                      var file = splitDotSlash;
                      var splitFolder = queryString["f"].split(".");
                      var folder = splitFolder[0];
                      var splitFile = file.split('.');
                      var piece = item + ';';
                      code = code.replace(
                        piece,
                        "window.location.href = './view.html?id=" +
                          queryString['id'] +
                          '&f=' + folder +
                          '.' +
                          encodeURIComponent(window.Base64.encode(splitFile[0])) +
                          '-' +
                          splitFile[1] +
                          "';"
                      );
                    }
                  } else {
                    if (toQuotation.includes('/') === true) {
                      var splitFolder = toQuotation.split('/');
                      var folder = splitFolder[0];
                      var file = splitFolder[1];
                      var splitFile = file.split('.');
                      var piece = item + ';';
                      code = code.replace(
                        piece,
                        "window.location.href = './view.html?id=" +
                          queryString['id'] +
                          '&f=' +
                          folder +
                          '.' +
                          encodeURIComponent(window.Base64.encode(splitFile[0])) +
                          '-' +
                          splitFile[1] +
                          "';"
                      );
                    } else {
                      var file = toQuotation;
                      var splitFolder = queryString["f"].split(".");
                      var folder = splitFolder[0];
                      var splitFile = file.split('.');
                      var piece = item + ';';
                      code = code.replace(
                        piece,
                        "window.location.href = './view.html?id=" +
                          queryString['id'] +
                          '&f=' + folder +
                          '.' +
                          encodeURIComponent(window.Base64.encode(splitFile[0])) +
                          '-' +
                          splitFile[1] +
                          "';"
                      );
                    }
                  }
                }
              } else {
                return;
              }
            });
            scripts[count].parentNode.removeChild(scripts[count]);
            window.eval(code);
        }
    });
    window.resources.forEach((resource) => {
      if (resource[1] === 'css') {
        newResource = document.createElement('link');

        newResource.rel = 'stylesheet';
        newResource.href = resource[0];

        document.head.appendChild(newResource);
      } else if (resource[1] === 'javascript') {
        newResource = document.createElement('script');

        newResource.src = resource[0];

        document.head.appendChild(newResource);
      }
    });
    var newLoadScript = document.createElement("script");
    var newLZStringScript = document.createElement("script");
    var newBase64Script = document.createElement("script");
    var newConsoleScript = document.createElement("script");
    var newMsgScript = document.createElement("script");
    var newManifestFile = document.createElement('link');
    
    newLoadScript.src = "./loader.js";
    newLZStringScript.src = "./lz-string.js";
    newBase64Script.src = "./base64.js";
    newConsoleScript.src = "./console";
    newMsgScript.innerHTML = "var MSG = function (m) { parent.postMessage(m, '*'); };";
    newManifestFile.rel = "manifest";
    newManifestFile.href = "./manifest.json";
    
    document.head.appendChild(newLoadScript);
    document.head.appendChild(newLZStringScript);
    document.head.appendChild(newBase64Script);
    document.head.appendChild(newConsoleScript);
    document.head.appendChild(newMsgScript);
    document.head.appendChild(newManifestFile);
  } else if (access === false) {
    document.body.innerHTML = 'Access Denied';
  } else {
    document.body.innerHTML = 'Undefined Error';
  }
}

function validate(Data) {
  var c = -1;
  if (Data['settings']['Compressed'] === 'true') {
    window.afs = JSON.parse(
      window.LZString.decompress(window.Base64.decode(Data['afs']))
    );
    window.resources = JSON.parse(
      window.LZString.decompress(window.Base64.decode(Data['sources']))
    );
  } else {
    window.afs = Data['afs'];
    window.resources = Data['sources'];
  }
  window.s = Data['settings'];
  window.acc = Data['account'];
  loadcode();
}
