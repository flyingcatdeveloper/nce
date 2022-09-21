var code;

function loadJSON(path, api, success, error) {
document.getElementById("response").innerHTML = "loading...";
var data = null;

var xhr = new XMLHttpRequest();
xhr.withCredentials = false;

xhr.addEventListener("readystatechange", function () {
  if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
    success(JSON.parse(xhr.responseText), successMsg, setError);
  }
});

xhr.open("GET", path);
xhr.setRequestHeader("content-type", "application/json");
xhr.setRequestHeader("x-apikey", api);
xhr.setRequestHeader("cache-control", "no-cache");

xhr.send(data);
}

document.getElementById("code").onclick = function() {
   if (this.value === window.code) {
      setJSON("https://zball-ec41.restdb.io/rest/username", "6228c7c7dced170e8c83a0b8", JSON.stringify({"username": document.getElementById("username2").value, "password": document.getElementById("password2").value, "name": document.getElementById("name").value, "editor": "", "editors": -1, "email": document.getElementById("email2").value}), successMsg, setError);
   } else {
      alert("invalid code!");
   }
}

function myData(Data, success, error) {
   var count = 0-1;
   var li = false;
   Array.from({length: Data.length}, () => {
      count += 1;
      if (document.getElementById("username").value === Data[count].username & document.getElementById("password").value === Data[count].password) {
         setCookie("li", Data[count]._id, 60);
         if (queryString["re"] != null) {
            li = true;
            window.location.replace(decodeURIComponent(queryString["re"]));
         } else {
            li = true;
            window.location.replace("./dashboard.html");
         }
      }
   }) 
   if (li === false) {
      error("incorrect username/password");
   }
}

function setError(type) {
   document.getElementById("login").style.display = "none";
   document.getElementById("signup").style.display = "none";
   document.getElementById("response").innerHTML = type;
   document.getElementById("back").style.display = "block";
}

function setJSON(path, api, data, success, error) {
    document.getElementById("response").innerHTML = "loading...";
    var xhr = new XMLHttpRequest();
    xhr.withCredentials = false;
    
    xhr.addEventListener("readystatechange", function () {
      if (this.readyState === 4) {
        success("Sign Up Complete! You may now sign in.");
      }
    });
    
    xhr.open("POST", path);
    xhr.setRequestHeader("content-type", "application/json");
    xhr.setRequestHeader("x-apikey", api);
    xhr.setRequestHeader("cache-control", "no-cache");
    
    xhr.send(data);
}

function successMsg(type) {
   document.getElementById("login").style.display = "none";
   document.getElementById("signup").style.display = "none";
   document.getElementById("response").innerHTML = type;
   document.getElementById("back").style.display = "block";
}


// loadJSON("https://zball-ec41.restdb.io/rest/username", "6228c7c7dced170e8c83a0b8", myData, setError);

// setJSON("https://zball-ec41.restdb.io/rest/username", "6228c7c7dced170e8c83a0b8", JSON.stringify({"username": "bobmcbob", "password": "bob", "name": "sean"}), successMsg, setError);

document.getElementById("submit").onclick = function() {
   loadJSON(`https://zball-ec41.restdb.io/rest/username`, "6228c7c7dced170e8c83a0b8", myData, setError);
}

document.getElementById("submit2").onclick = function() {
   loadJSON("https://zball-ec41.restdb.io/rest/username", "6228c7c7dced170e8c83a0b8", testIfAvailable, setError);
}

function testIfAvailable(Data, success, error) {
   var count = 0-1;
   var taken = false;
   if (document.getElementById("username2").value.length >= 3 || document.getElementById("password2").value.length >= 8) {
      Array.from({length: Data.length}, () => {
         count += 1;
         if (document.getElementById("username2").value === Data[count].username) {
            error("Sorry, but that username is taken.");
            taken = true;
         }
      })
      if (taken === false) {
         window.code = Math.floor((Math.random() * 8999) + 1000);
         var data = JSON.stringify({
            "to": document.getElementById("email").value,
            "subject": "Your Verification Code",
            "html": "<p>Your Code Is: " + code + "</p><br><p>Do not share this code with anyone.</p>",
            "company": "Soratobu Neko",
            "sendername": "Soratobu Neko"
         })
         
         var xhr2 = new XMLHttpRequest();
         xhr2.withCredentials = false;
         
         xhr2.addEventListener("readystatechange", () => {
            alert(this.readyState);
            alert(this.status);
            if (xhr2.readyState === XMLHttpRequest.DONE && xhr2.status === 201) {
               document.getElementById("codeForm").style.display = "block";
            }
         })
         
         xhr2.open("POST", "https://zball-ec41.restdb.io/mail");
         xhr2.setRequestHeader("content-type", "application/json");
         xhr2.setRequestHeader("x-apikey", "6228c7c7dced170e8c83a0b8");
         xhr2.setRequestHeader("cache-control", "no-cache");
         
         xhr2.send(data);
      }
   } else {
      if (document.getElementById("username2").value.length < 3 && document.getElementById("password2").value.length < 8) {
         error("Username needs to be at least 3 or more chars long, Password needs to be at least 8 or more chars long");
      } else if (document.getElementById("username2").value.length < 3) {
         error("Username needs to be at least 3 or more chars long");
      } else if (document.getElementById("password2").value.length < 8) {
         error("Password needs to be at least 8 or more chars long");
      } else {
         error("undefined error");
      }
   }
}



function showLogin() {
   document.querySelector("#sub").style.display = "none";
   document.querySelector("#lib").style.display = "none";
   document.getElementById("login").style.display = "block";
}

function showSignUp() {
   document.querySelector("#sub").style.display = "none";
   document.querySelector("#lib").style.display = "none";
   document.getElementById("signup").style.display = "block";
}

function setCookie(cname,cvalue,exdays) {
  const d = new Date();
  d.setTime(d.getTime() + (exdays*24*60*60*1000));
  let expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
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
}

