  var html, css, js, resources = [];
  
  function loadcode() {
    window.document.body.innerHTML=window.html;
    window.document.head.innerHTML = "<style>"+window.css+"</style>";
    var titles = document.getElementsByTagName("title");
    if (!titles.length) {
        document.title = "NCE View";
    }
    window.resources.forEach((resource) => {
        if (resource[1] === "css") {
            var newResource = document.createElement("link");
            
            newResource.rel = "stylesheet";
            newResource.href = resource[0];
            
            window.document.head.appendChild(newResource);
        } else if (resource[1] === "javascript") {
            var newResource = document.createElement("script");
            
            newResource.src = resource[0];
            
            window.document.head.appendChild(newResource);
        }
    })
    var newScript = document.createElement("script");
    newScript.innerHTML = window.js;
    window.document.body.appendChild(newScript);
}
  
  function validate(Data) {
    window.html = decodeURIComponent(Data.html);
    window.css = decodeURIComponent(Data.css);
    window.js = decodeURIComponent(Data.js);
    window.resources = Data.sources;
    loadcode();
  }

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
    if (queryString["id"] != null) {
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
