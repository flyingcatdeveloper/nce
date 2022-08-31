function loadJSON(path, api, success, error) {
document.getElementById("response").innerHTML = "loading...";
var data = null;

var xhr = new XMLHttpRequest();
xhr.withCredentials = false;

xhr.addEventListener("readystatechange", function () {
  if (this.readyState === 4) {
    success(JSON.parse(xhr.responseText), successMsg, setError);
  }
});

xhr.open("GET", path);
xhr.setRequestHeader("content-type", "application/json");
xhr.setRequestHeader("x-apikey", api);
xhr.setRequestHeader("cache-control", "no-cache");

xhr.send(data);
}

function myData(Data, success, error) {
   var count = 0-1;
   Array.from({length: Data.length}, () => {
      count += 1;
      if (document.getElementById("username").value === Data[count].username & document.getElementById("password").value === Data[count].password) {
         setCookie("li", Data[count]._id, 60);
         window.location.replace("./dashboard.html")
      } else if (count === Data.length) {
         error("incorrect username and/or password");
      }
   })
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
         setJSON("https://zball-ec41.restdb.io/rest/username", "6228c7c7dced170e8c83a0b8", JSON.stringify({"username": document.getElementById("username2").value, "password": document.getElementById("password2").value, "name": document.getElementById("name").value, "editor": "", "editors": -1}), successMsg, setError);
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

