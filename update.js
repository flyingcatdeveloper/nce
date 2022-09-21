  
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
                var editorData = JSON.parse(xhr.responseText);
                if (getCookie("li") != null && getCookie("li") != undefined && getCookie("li") != "") {
                    var data2 = null;
                    
                    var xhr2 = new XMLHttpRequest();
                    xhr2.withCredentials = false;
                    
                    xhr2.addEventListener("readystatechange", () => {
                        if (xhr2.readyState === XMLHttpRequest.DONE && xhr2.status === 200) {
                            var accountData = JSON.parse(xhr2.responseText);
                            
                            if (accountData.editor != "") {
                                var data3 = JSON.stringify({
                                    "editor": accountData.editor + ";" + editorData._id + ":" + editorData.name,
                                    "editors": accountData.editors + 1
                                })
                            } else {
                                var data3 = JSON.stringify({
                                    "editor": editorData._id + ":" + editorData.name,
                                    "editors": accountData.editors + 1
                                })
                            }
                            
                            var xhr3 = new XMLHttpRequest();
                            xhr3.withCredentials = false;
                            
                            xhr3.addEventListener("readystatechange", () => {
                                if (xhr3.readyState === XMLHttpRequest.DONE && xhr3.status === 200) {
                                    var np = accountData.editors + 1;
                                    var data4 = JSON.stringify({
                                        "account": editorData.account + ";" + getCookie("li") + ":" + np
                                    })
                                    
                                    var xhr4 = new XMLHttpRequest();
                                    xhr4.withCredentials = false;
                                    
                                    xhr4.addEventListener("readystatechange", () => {
                                        if (xhr4.readyState === XMLHttpRequest.DONE && xhr4.status === 200) {
                                            window.location.replace("./editor.html?id=" + editorData._id);
                                        }
                                    })
                                    
                                    xhr4.open("PUT", "https://zball-ec41.restdb.io/rest/editor/" + editorData._id);
                                    xhr4.setRequestHeader("content-type", "application/json");
                                    xhr4.setRequestHeader("x-apikey", "6228c7c7dced170e8c83a0b8");
                                    xhr4.setRequestHeader("cache-control", "no-cache");
                                    
                                    xhr4.send(data4);
                                }
                            })
                            
                            xhr3.open("PUT", "https://zball-ec41.restdb.io/rest/username/" + getCookie("li"));
                            xhr3.setRequestHeader("content-type", "application/json");
                            xhr3.setRequestHeader("x-apikey", "6228c7c7dced170e8c83a0b8");
                            xhr3.setRequestHeader("cache-control", "no-cache");
                            
                            xhr3.send(data3);
                        }
                    })
                    
                    xhr2.open("GET", "https://zball-ec41.restdb.io/rest/username/" + getCookie("li"));
                    xhr2.setRequestHeader("content-type", "application/json");
                    xhr2.setRequestHeader("x-apikey", "6228c7c7dced170e8c83a0b8");
                    xhr2.setRequestHeader("cache-control", "no-cache");
                    
                    xhr2.send(data2);
                } else {
                    window.location.replace("./login.html?re=" + encodeURIComponent("./update.html?id=" + queryString["id"]));
                }
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
    } else {
        window.location.replace("./index.html")
    }
}

function getCookie(cname) {
	let name = cname + "=";
	let decodedCookie = decodeURIComponent(document.cookie);
	let ca = decodedCookie.split(';');
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
