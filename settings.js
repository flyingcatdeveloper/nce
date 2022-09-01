var taken;

if (getCookie("li") === "" || getCookie("li") === null) {
    window.location.replace("./index.html");
} else {
    loadData();
}

document.getElementById("editBtn").onclick = function() {
    document.getElementById("editBtn").style.display = "none";
    document.querySelector(".details").style.display = "none";
    document.getElementById("changeDetails").style.display = "block";
}

document.getElementById("ic").onclick = function() {
    window.location.reload();
}

document.querySelector(".btn-lo").onclick = function() {
    setCookie("li", "");
    window.location.replace("./index.html");
}

document.querySelector(".btn-db").onclick = function() {
    window.location.replace("./dashboard.html");
}

document.getElementById("is").onclick = function() {
    this.value = "loading...";
    getData(checkIfAvailable);
}

function getData(success) {
    var data = null;
    
    var xhr4 = new XMLHttpRequest();
    xhr4.withCredentials = false;
    
    xhr4.addEventListener("readystatechange", () => {
        if (xhr4.readyState === XMLHttpRequest.DONE && xhr4.status === 200) {
            success(JSON.parse(xhr4.responseText));
        }
    })
    
    xhr4.open("GET", "https://zball-ec41.restdb.io/rest/username");
    xhr4.setRequestHeader("content-type", "application/json");
    xhr4.setRequestHeader("x-apikey", "6228c7c7dced170e8c83a0b8");
    xhr4.setRequestHeader("cache-control", "no-cache");
    
    xhr4.send(data);
}

function checkIfAvailable(Data) {
    window.taken = false;
    var count = 0-1;
    Array.from({length: Data.length}, () => {
        count += 1;
        if (document.getElementById("iu").value === Data[count].username) {
            window.taken = true;
        }
        if (count === Data.length - 1) {
            updateAccount();
        }
    })
}

function updateAccount() {
        if (document.getElementById("ip").value.length >= 8 &&  document.getElementById("iu").value.length >= 3 && window.taken === false) {
        var data = JSON.stringify({
            "username": document.getElementById("iu").value,
            "password": document.getElementById("ip").value,
            "name": document.getElementById("in").value
        })
        
        var xhr2 = new XMLHttpRequest();
        xhr2.withCredentials = false;
        
        xhr2.addEventListener("readystatechange", () => {
            if (xhr2.readyState === XMLHttpRequest.DONE && xhr2.status === 200) {
                console.log("updated details");
                document.getElementById("is").value = "Change Settings";
                document.getElementById("in").value = "";
                document.getElementById("ip").value = "";
                document.getElementById("iu").value = "";
                window.location.reload();
            }
        })
        
        xhr2.open("PUT", "https://zball-ec41.restdb.io/rest/username/" + getCookie("li"));
        xhr2.setRequestHeader("content-type", "application/json");
        xhr2.setRequestHeader("x-apikey", "6228c7c7dced170e8c83a0b8");
        xhr2.setRequestHeader("cache-control", "no-cache");
        
        xhr2.send(data);
    } else if (window.taken === true) {
        alert("username is taken.");
        document.getElementById("is").value = "Change Settings";
        document.getElementById("in").value = "";
        document.getElementById("ip").value = "";
        document.getElementById("iu").value = "";
    } else {
        alert("either username or password is invalid.");
        document.getElementById("is").value = "Change Settings";
        document.getElementById("in").value = "";
        document.getElementById("ip").value = "";
        document.getElementById("iu").value = "";
    }
}


function loadData() {
    var data = null;
    
    var xhr = new XMLHttpRequest();
    xhr.withCredentials = false;
    
    xhr.addEventListener("readystatechange", () => {
        if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
            showData(JSON.parse(xhr.responseText));
        }
    })
    
    xhr.open("GET", "https://zball-ec41.restdb.io/rest/username/" + getCookie("li"));
    xhr.setRequestHeader("content-type", "application/json");
    xhr.setRequestHeader("x-apikey", "6228c7c7dced170e8c83a0b8");
    xhr.setRequestHeader("cache-control", "no-cache");
    
    xhr.send(data);
}

function showData(Data) {
    var username = Data.username;
    var name = Data.name;
    var pfp = Data.pfp;
    document.getElementById("changeDetails").style.display = "none";
    document.querySelector(".details").style.display = "block";
    document.getElementById("editBtn").style.display = "block";
    
    if (pfp != undefined) {
        document.getElementById("pfp").src = pfp;
        document.getElementById("pfp").style.width = "150px";
        document.getElementById("pfp").style.height = "150px";
    }
    document.getElementById("name-details").innerHTML = name;
    document.getElementById("username-details").innerHTML = username;
    document.getElementById("password-details").innerHTML = "***";
}

function updatePfp(id) {
    
    var pfp = "https://zball-ec41.restdb.io/media/" + id;
    
    document.getElementById("pfp").src = pfp;
    document.getElementById("pfp").style.width = "150px";
    document.getElementById("pfp").style.height = "150px";
    savePfpToAccount(pfp);
}

function savePfpToAccount(picture) {
    var data = JSON.stringify({
        "pfp": picture
    })
    
    var xhr3 = new XMLHttpRequest();
    xhr3.withCredentials = false;
    
    xhr3.addEventListener("readystatechange", () => {
        if (xhr3.readyState = XMLHttpRequest.DONE && xhr3.status === 201) {
            console.log("saved.")
        }
    })
    
    xhr3.open("PUT", "https://zball-ec41.restdb.io/rest/username/" + getCookie("li"));
    xhr3.setRequestHeader("content-type", "application/json");
    xhr3.setRequestHeader("x-apikey", "6228c7c7dced170e8c83a0b8");
    xhr3.setRequestHeader("cache-control", "no-cache");
    
    xhr3.send(data);
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
  
    function setCookie(cname,cvalue,exdays) {
  const d = new Date();
  d.setTime(d.getTime() + (exdays*24*60*60*1000));
  let expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}
