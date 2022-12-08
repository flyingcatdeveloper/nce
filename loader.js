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
    if (queryString["id"] !== null && queryString["f"] !== null) {
        var data = null;
        
        var xhr = new XMLHttpRequest();
        xhr.withCredentials = false;
        
        xhr.addEventListener("readystatechange", function () {
            if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
                validate(JSON.parse(xhr.responseText));
            } else if (xhr.readyState === XMLHttpRequest.DONE) {
                alert("id is invalid.");
                window.location.replace("./index.html");
            }
        })
        
        xhr.open("GET", "https://zball-ec41.restdb.io/rest/editor/" + queryString["id"]);
        xhr.setRequestHeader("content-type", "application/json");
        xhr.setRequestHeader("x-apikey", "6228c7c7dced170e8c83a0b8");
        xhr.setRequestHeader("cache-control", "no-cache");
        
        xhr.send(data);
    }
};

function getCookie(cname) {
	let name = cname + "=";
	let cokie = document.cookie;
	let ca = cokie.split(';');
	for(let i = 0; i < ca.length; i++) {
	  let c = ca[i];
	  while (c.charAt(0) == ' ') {
		c = c.substring(1);
	  }
	  if (c.indexOf(name) == 0) {
		return c.substring(name.length, c.length);
	  }
	}
	return "";
  }

var afs = {}, resources = [], fls, tds, tdf, s, acc;
  
  function loadcode() {
      var splitData = window.acc.split(";");
      var sad = splitData[0].split(":");
      var access;
      if (s["Preview Visibility"] === "Only Me") {
          if (sad[0] === getCookie("li")) {
              access = true;
          } else {
              access = false;
          }
      } else if (s["Preview Visibility"] === "Shared With") {
          access = true;
      }
      if (access === true) {
        var newResource;
        var url, filename, paths, folder, styl, count=-1;
        var split = queryString["f"].split(".");
        document.body.innerHTML=window.afs[split[0][decodeURIComponent(split[1])];
        var titles = document.getElementsByTagName("title");
        if (!titles.length) {
            document.title = "NCE View";
        } else {
            document.title = titles[0].innerHTML;
        }
        var scripts = document.getElementsByTagName('script');
        var styles = document.getElementsByTagName('link');
        Array.from({length: styles.length}, () => {
            count += 1;
            if (styles[count].hasAttribute('rel')) {
                if (styles[count].getAttribute('rel') === "stylesheet") {
                    url = styles[count].href;
                    paths = url.split('/');
                    folder = paths[paths.length - 2];
                    filename = paths[paths.length - 1];
                    tds = filename.split(".");
                    tdf = window.Base64.encode(tds[0]) + "-" + tds[1];
                    styl = document.createElement('style');
                    if (window.afs[folder] !== undefined) {
                        styl.innerHTML = window.afs[folder][tdf];
                    } else {
                        styl.innerHTML = window.afs["main"][tdf];
                    }
                    document.head.appendChild(styl);
                }
            }
        })
        count=-1;
        Array.from({length: scripts.length}, () => {
            count += 1;
            if (scripts[count].hasAttribute('src')) {
                url = scripts[count].src;
                paths = url.split('/');
                folder = paths[paths.length - 2];
                filename = paths[paths.length - 1];
                tds = filename.split(".");
                tdf = window.Base64.encode(tds[0]) + "-" + tds[1];
                if (window.afs[folder] !== undefined) {
                    window.eval(window.afs[folder][tdf]);
                } else {
                    window.eval(window.afs["main"][tdf]);
                }
            } else {
                window.eval(scripts[count].innerHTML);
            }
        })
        window.resources.forEach((resource) => {
            if (resource[1] === "css") {
                newResource = document.createElement("link");
            
                newResource.rel = "stylesheet";
                newResource.href = resource[0];
            
                document.head.appendChild(newResource);
            } else if (resource[1] === "javascript") {
                newResource = document.createElement("script");
            
                newResource.src = resource[0];
            
                document.head.appendChild(newResource);
            }
        });
      } else if (access === false) {
          document.body.innerHTML = "Access Denied";
      } else {
          document.body.innerHTML = "Undefined Error";
      }
}
  
  function validate(Data) {
    var c = -1;
    window.afs = JSON.parse(window.LZString.decompress(window.Base64.decode(Data["afs"])));
    window.resources = JSON.parse(window.LZString.decompress(window.Base64.decode(Data["sources"])));
    window.s = Data["settings"];
    window.acc = Data["account"];
    loadcode();
  }
