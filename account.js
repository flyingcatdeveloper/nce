var code, reset = false, d, ots = false;

const validateEmail = (email) => {
  return email.match(
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
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
}

function loadJSON(path, api, success, error) {
document.getElementById("submit").innerHTML = "...";
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
   var li = false;
   var count = 0-1;
   Array.from({length: Data.length}, () => {
      count += 1;
      if (document.getElementById("username").value === Data[count].username && document.getElementById("password").value === Data[count].password && Data[count].twostep != true) {
	      if (queryString["re"] != null) {
	         li = true;
	         setCookie("li", Data[count]._id, 1);
		      window.location.replace(decodeURIComponent(queryString["re"]));
	      } else {
	         li = true;
		      setCookie("li", Data[count]._id, 1);
            window.location.replace("./dashboard.html");
	      }
      } else if (document.getElementById("username").value === Data[count].email && document.getElementById("password").value === Data[count].password && Data[count].twostep != true) {
	      if (queryString["re"] != null) {
	         li = true;
            setCookie("li", Data[count]._id, 1);
		      window.location.replace(decodeURIComponent(queryString["re"]));
	      } else {
	         li = true;
	         setCookie("li", Data[count]._id, 1);
            window.location.replace("./dashboard.html");
	      }
      } else if (Data[count].twostep === true) {
         if (Data[count].email === document.getElementById("username").value && Data[count].password === document.getElementById("password").value) {
            var aid = Data[count]._id;
            sendCode(Data[count].email);
            document.getElementById("login").style.display = "none";
            document.getElementById("code").style.display = "";
            window.ots = true;
            document.getElementById("cs").onclick = function() {
               if (parseInt(document.getElementById("ci").value) === window.code) {
                  if (queryString["re"] != null) {
                     li = true;
                     setCookie("li", aid);
                     window.location.replace(decodeURIComponent(queryString["re"]));
                  } else {
                     li = true;
                     setCookie("li", );
                     window.location.replace("./dashboard.html");
                  }
               } else {
                  document.getElementById("code-error").innerHTML = "Invalid Code!";
               }
            }
         } else if (Data[count].username === document.getElementById("username").value && Data[count].password === document.getElementById("password").value) {
            var aid = Data[count]._id;
            sendCode(Data[count].email);
            document.getElementById("login").style.display = "none";
            document.getElementById("code").style.display = "";
            window.ots = true;
            document.getElementById("cs").onclick = function() {
               if (parseInt(document.getElementById("ci").value) === window.code) {
                  if (queryString["re"] != null) {
                     li = true;
                     setCookie("li", aid, 1);
                     window.location.replace(decodeURIComponent(queryString["re"]));
                  } else {
                     li = true;
                     setCookie("li", aid);
                     window.location.replace("./dashboard.html");
                  }
               } else {
                  error("Invalid Code!");
               }
            }
         }
      }
   })
   if (li != true && window.ots === false) {
      error("Invalid Username or Password");
   }
   
}

function setError(type) {
   document.getElementById("login").style.display = "none";
   document.getElementById("signup").style.display = "none";
   document.getElementById("email").style.display = "none";
   document.getElementById("su-error").innerHTML = type;
   document.getElementById("back").style.display = "block";
}

function setJSON(path, api, data, success, error) {
    document.getElementById("submit2").innerHTML = "loading...";
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
   document.getElementById("code").style.display = "none";
   document.getElementById("email").style.display= "none";
   document.getElementById("su-success").innerHTML = type;
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

document.getElementById("cs").onclick = function() {
   checkCode(document.getElementById("ei").value);
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
         document.getElementById("signup").style.display = "none";
         document.getElementById("email").style.display = "block";
         document.getElementById("es").onclick = function() {
            if (validateEmail(document.getElementById("ei").value)) {
               var count = 0-1;
               var eTaken = false;
               Array.from({length: Data.length}, () => {
                  count +=1;
                  if (document.getElementById("ei").value === Data[count].email) {
                     eTaken = true;
                     error("Sorry, but that email is taken.");
                  }
               })
               if (eTaken === false) {
                  window.reset = false;
                  sendCode(document.getElementById("ei").value);
               }
            } else {
               error("Invalid email.");
            }
         }
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

document.getElementById("ssu").onclick = function() {
   document.getElementById("login").style.display = "none";
   document.getElementById("signup").style.display = "";
}

function sendCode(mail) {
	document.querySelectorAll(".response").innerHTML = "";
   window.code = Math.floor((Math.random() * 9000) + 1000);
   document.getElementById("es").value = "Sending...";
   document.getElementById("rs").value = "Sending...";

   var data2 = JSON.stringify({
		"to": mail,
		"subject": "NCE Verification Code",
		"html": "<body style='background-color: #333333; color: #eee; font-family: monospace, arial, sans-serif; text-align: center; border-radius: 4px;'><img width='45px' height='45px' src='" + "https://github.com/soratobu-neko/nce/blob/main/favicon-white.png?raw=true" + "'><h1 style='color: #eee;'>NCE</h1><hr><p style='color: #eee;'>Your NCE verification code is:</p><div style='background-color: black; opacity: 50%; border-radius: 4px;'><h1 style='color: #eee;'>" + code + "</h1></div><br><br><p style='color: #eee;'>If you did not request this code, please ignore this email.</p></body>",
		"company": "Soratobu Neko",
		"sendername": "NCE Auth"
   })

   var xhr2 = new XMLHttpRequest();
   xhr2.withCredentials = false;

   xhr2.addEventListener("readystatechange", () => {
		if (xhr2.readyState === XMLHttpRequest.DONE && xhr2.status === 201) {
			document.getElementById("email").style.display = "none";
			document.getElementById("reset").style.display = "none";
			document.getElementById("code").style.display = "";
			console.log(xhr2.responseText);
		}
   })

   xhr2.open("POST", "https://zball-ec41.restdb.io/mail");
   xhr2.setRequestHeader("content-type", "application/json");
   xhr2.setRequestHeader("x-apikey", "6228c7c7dced170e8c83a0b8");
   xhr2.setRequestHeader("cache-control", "no-cache");

   xhr2.send(data2);
}  

function checkCode(mail) {
   if (parseInt(document.getElementById("ci").value) === window.code && window.reset === false) {
      setJSON("https://zball-ec41.restdb.io/rest/username", "6228c7c7dced170e8c83a0b8", JSON.stringify({"username": document.getElementById("username2").value, "password": document.getElementById("password2").value, "name": document.getElementById("name2").value, "email": mail, "editor": "", "editors": -1}), successMsg, setError);
   } else if (parseInt(document.getElementById("ci").value) === window.code && window.reset === true) {
      document.getElementById("code").style.display = "none";
	  document.getElementById("pr").style.display = "";
   } else {
		document.getElementById("code-error").innerHTML = "Invalid Code!";
   }
}

function reset() {
	document.getElementById("login").style.display = "none";
	document.getElementById("reset").style.display = "";
}

function setPass(Data) {

	var count = 0-1;
	Array.from({length: Data.length}, () => {
	count += 1;
	if (document.getElementById("re").value === Data[count].email) {
		var data3 = JSON.stringify({
			"password": document.getElementById("rp").value
		})

		var xhr3 = new XMLHttpRequest();
		xhr3.withCredentials = false;

		xhr3.addEventListener("readystatechange", () => {
			if (xhr3.readyState === XMLHttpRequest.DONE && xhr3.status === 200) {
				document.getElementById("pr").style.display = "none";
				document.getElementById("login").style.display = "";
				document.querySelectorAll(".response").innerHTML = "";
			}
		})

		xhr3.open("PUT", "https://zball-ec41.restdb.io/rest/username/" + Data[count]._id);
		xhr3.setRequestHeader("content-type", "application/json");
		xhr3.setRequestHeader("x-apikey", "6228c7c7dced170e8c83a0b8");
		xhr3.setRequestHeader("cache-control", "no-cache");

		xhr3.send(data3);			
    }
	})
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

  document.getElementById("rsp").onclick = function() {
	document.getElementById("login").style.display = "none";
	document.getElementById("reset").style.display = "";
  }
  document.getElementById("rs").onclick = function() {
	sendCode(document.getElementById("re").value);
	window.reset = true;
  }
  document.getElementById("rs2").onclick = function() {
		loadJSON(`https://zball-ec41.restdb.io/rest/username`, "6228c7c7dced170e8c83a0b8", setPass, setError, true);
  }
  
 function setCookie(cname, cvalue, exdays) {
	const d = new Date();
	d.setTime(d.getTime() + (exdays*24*60*60*1000));
	let expires = "expires=" + d.toUTCString();
	document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

document.getElementById("username").addEventListener("focus", () => {
   var inputListener = (e) => {
      if (e.keyCode === 13) {
         window.removeEventListener("keyup", inputListener);
         document.getElementById("submit").click();
      }
   };
   
   window.addEventListener("keyup", inputListener);
})

document.getElementById("password").addEventListener("focus", () => {
   var inputListener = (e) => {
      if (e.keyCode === 13) {
         window.removeEventListener("keyup", inputListener);
         document.getElementById("submit").click();
      }
   };
   
   window.addEventListener("keyup", inputListener);
})

document.getElementById("password2").addEventListener("focus", () => {
   var inputListener = (e) => {
      if (e.keyCode === 13) {
         window.removeEventListener("keyup", inputListener);
         document.getElementById("submit2").click();
      }
   };
   
   window.addEventListener("keyup", inputListener);
})

document.getElementById("username2").addEventListener("focus", () => {
   var inputListener = (e) => {
      if (e.keyCode === 13) {
         window.removeEventListener("keyup", inputListener);
         document.getElementById("submit2").click();
      }
   };
   
   window.addEventListener("keyup", inputListener);
})

document.getElementById("name2").addEventListener("focus", () => {
   var inputListener = (e) => {
      if (e.keyCode === 13) {
         window.removeEventListener("keyup", inputListener);
         document.getElementById("submit2").click();
      }
   };
   
   window.addEventListener("keyup", inputListener);
})

document.getElementById("ci").addEventListener("focus", () => {
   var inputListener = (e) => {
      if (e.keyCode === 13) {
         window.removeEventListener("keyup", inputListener);
         document.getElementById("cs").click();
      }
   };
   
   window.addEventListener("keyup", inputListener);
})

document.getElementById("ei").addEventListener("focus", () => {
   var inputListener = (e) => {
      if (e.keyCode === 13) {
         window.removeEventListener("keyup", inputListener);
         document.getElementById("es").click();
      }
   };
   
   window.addEventListener("keyup", inputListener);
})

document.getElementById("re").addEventListener("focus", () => {
   var inputListener = (e) => {
      if (e.keyCode === 13) {
         window.removeEventListener("keyup", inputListener);
         document.getElementById("rs").click();
      }
   };
   
   window.addEventListener("keyup", inputListener);
})

document.getElementById("rp").addEventListener("focus", () => {
   var inputListener = (e) => {
      if (e.keyCode === 13) {
         window.removeEventListener("keyup", inputListener);
         document.getElementById("rs2").click();
      }
   };
   
   window.addEventListener("keyup", inputListener);
})


