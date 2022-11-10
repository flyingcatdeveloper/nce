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

var afs = {}, resources = [], fls, tds, tdf;
  
  function loadcode() {
    var newResource;
        var url, filename, styl, count=-1;
        document.body.innerHTML=decodeURIComponent(window.afs[queryString["f"]]);
        var titles = document.getElementsByTagName("title");
        if (!titles.length) {
            document.title = "NCE View";
        } else {
            document.title = titles[0].innerHTML;
        }
        var scripts = document.getElementsByTagName('script');
        var styles = document.getElementsByTagName('link');
        Array.from({length: scripts.length}, () => {
            count += 1;
            if (scripts[count].hasAttribute('src')) {
                url = scripts[count].src;
                filename = url.substring(url.lastIndexOf('/')+1);
                tds = filename.split(".");
                tdf = tds[0] + "-" + tds[1];
                window.eval(decodeURIComponent(window.afs[tdf]));
            } else {
                window.eval(scripts[count].innerHTML);
            }
        })
        count=-1;
        Array.from({length: styles.length}, () => {
            count += 1;
            if (styles[count].hasAttribute('rel')) {
                if (styles[count].getAttribute('rel') === "stylesheet") {
                    url = styles[count].href;
                    filename = url.substring(url.lastIndexOf('/')+1);
                    tds = filename.split(".");
                    tdf = tds[0] + "-" + tds[1];
                    styl = document.createElement('style');
                    styl.innerHTML = decodeURIComponent(window.afs[tdf]);
                    document.head.appendChild(styl);
                }
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
}
  
  function validate(Data) {
    var c = -1;
    window.fls = Data["afs"];
    Array.from({length: window.fls.length}, () => {
        c += 1;
        window.afs[window.fls[c]] = Data[window.fls[c]];
    })
    window.resources = Data["sources"];
    loadcode();
  }
