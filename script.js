if (getCookie("li") === "") {
    window.location.replace("./index.html");
}

var html = "loading...", css = "loading...", js = "loading...";
var cType;

const left = document.querySelector(".left"),
right = document.querySelector(".right"),
ver = document.querySelector("#ver"),
save = document.querySelector(".btn-save"),
tocl1 = document.querySelector(".tocl-1"),
tocl2 = document.querySelector(".tocl-2"),
tocl3 = document.querySelector(".tocl-3"),
tocl4 = document.querySelector(".tocl-4"),
pre = document.querySelector("#log"),
run = document.querySelector(".btn-run"),
ontb = document.querySelector(".btn-ont"),
iframe = document.querySelector(".iframe"),
con = document.querySelector(".test"),
darkLightMode = document.querySelector(".btn-dark-light"),
menu = document.querySelector(".editor-menu"),
live = document.querySelector(".live"),
livebtn = document.querySelector("#live"),
conbtn = document.querySelector("#test"),
con2 = document.querySelector("#log-container"),
devlog = document.querySelector(".btn-dev"),
body = document.querySelector(".body"),
saveBtn = document.querySelector(".btn-so"),
dbBtn = document.querySelector(".btn-db2"),
lpicker = document.querySelector(".language-picker");

// Variables used for ldm btn
let ldm = 0;

// Run btn event listner
run.addEventListener("click", runcode);

// Downloads your code
// save.addEventListener("click", () => {
//     let s = editorhtml.value + "<script>" + editorjs.value + "</script>" + "<style>" + editorcss.value + "</style>";
//     var saveBlob = new Blob([s], {type: "text/html"});

//     var url = window.URL.createObjectURL(saveBlob);
//     var anchor = document.createElement("a");
//     anchor.href = url;
//     anchor.download = "index.html";

//     anchor.click();
//     window.URL.revokeObjectURL(url);
//     document.removeChild(anchor);
// });

// Set Light Mode/Dark Mode
// darkLightMode.addEventListener("click", () => {
    
//     if (ldm == '0') {
//         ldm = 1;
//         darkLightMode.innerHTML = "Light Mode";
//         changeTheme('vs-dark');
//         iframe.style.backgroundColor = "white";
//         // tocl1.style.backgroundColor = "darkslategray";
//         devlog.style.backgroundColor = "darkslategray";
//         // tocl1.style.color = "#eee";
//         // tocl4.style.backgroundColor = "darkslategray";
//         con.style.backgroundColor = "darkslategray";
//         lpicker.style.backgroundColor = "darkslategray";
//         lpicker.style.color = "#eee";
//         // save.style.backgroundColor = "darkslategray";
//         // save.style.color = "#eee";
//         con.style.color = "#eee";
//         // tocl4.style.color = "#eee";
//         left.style.backgroundColor = "#363836";
//         right.style.backgroundColor = "#363836";
//         pre.style.color = "#eee";
//         con2.style.backgroundColor = "#363836";
//         con2.style.color = "#eee";
//         saveBtn.style.backgroundColor = "darkslategray";
//         dbBtn.style.backgroundColor = "darkslategray";
//         // tocl2.style.backgroundColor = "darkslategray";
//         // tocl2.style.color = "#eee";    
//         // tocl3.style.backgroundColor = "darkslategray";
//         // tocl3.style.color = "#eee";
//         menu.style.backgroundColor = "#222222";    
//         body.style.backgroundColor = "#363836";
//         darkLightMode.style.backgroundColor = "darkslategray";
//         live.style.backgroundColor = "darkslategray";
//         ontb.style.backgroundColor = "darkslategray";
//         run.style.backgroundColor = "darkslategray";
//         darkLightMode.style.color = "#eee";
//         devlog.style.color = "#eee";
//         ontb.style.color = "#eee";
//         run.style.color = "#eee";
//         live.style.color = "#eee";
//     } else if (ldm == '1') {
//         ldm = 0;
//         darkLightMode.innerHTML = "Dark Mode";
//         changeTheme("vs");
//         lpicker.style.backgroundColor = "#37474F";
//         lpicker.style.color = "#fff";
//         left.style.backgroundColor = "";
//         right.style.backgroundColor = "";
//         saveBtn.style.backgroundColor = "#37474F";
//         dbBtn.style.backgroundColor = "#37474F";
//         // save.style.backgroundColor = "#37474F";
//         // save.style.color = "#eee";
//         // editorjs.style.color = "";
//         pre.style.color = "";
//         iframe.style.backgroundColor = "";
//         // tocl1.style.backgroundColor = "#37474F";
//         // tocl4.style.backgroundColor = "#37474F";
//         con2.style.backgroundColor = "";
//         con2.style.color = "#eee";
//         con.style.backgroundColor = "";
//         con.style.color = "#eee";
//         // tocl4.style.color = "#eee";
//         devlog.style.backgroundColor = "#37474F";
//         // tocl1.style.color = "#eee";
//         // tocl2.style.backgroundColor = "#37474F";
//         // tocl2.style.color = "#eee";
//         // tocl3.style.backgroundColor = "#37474F";
//         // tocl3.style.color = "#eee";
//         body.style.backgroundColor = "";
//         menu.style.backgroundColor = "#eee";
//         darkLightMode.style.backgroundColor = "#37474F";
//         live.style.backgroundColor = "#37474F";
//         ontb.style.backgroundColor = "#37474F";
//         run.style.backgroundColor = "#37474F";
//         darkLightMode.style.color = "#fff";
//         devlog.style.color = "#fff";
//         ontb.style.color = "#fff";
//         run.style.color = "#fff";
//         live.style.color = "";
//     }

// });

// Live Code
livebtn.addEventListener("click", () => {
    if (livebtn.checked) {
        addEventListener("keyup", runcode);
    } else {
        removeEventListener("keyup", runcode);
    }
});

// Toggle the console
conbtn.addEventListener("click", () => {
    if (conbtn.checked) {
        con2.style.display = "block";
        tocl4.style.display = "block"
        iframe.style.height = "75%";
    } else {
        con2.style.display = "none";
        tocl4.style.display = "none";
        iframe.style.height = "100%";
    }
});

// Open your code in a new window
ontb.addEventListener('click', () => {
    var myWindow = window.open("", "View Code");
    myWindow.document.body.innerHTML=html+"<style>"+css+"</style>";
    myWindow.window.eval(js);
});

// Opens the devlog
devlog.addEventListener('click', () => {
    window.open("./devlog.txt", "Devlog");
});

// Runs the code
function runcode() {
    iframe.contentDocument.body.innerHTML=html+"<style>"+css+"</style>";
    iframe.contentWindow.eval(js);
}

function setCookie(cname, cvalue, exdays) {
	const d = new Date();
	d.setTime(d.getTime() + (exdays*24*60*60*1000));
	let expires = "expires=" + d.toUTCString();
	document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

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
  
  saveBtn.onclick = saveCode;
  
  dbBtn.onclick = function() {
      window.location.replace("./dashboard.html");
  }

window.addEventListener("keyup", () => {
    if (window.cType === "html") {
        window.html = window.editor.getValue();
    } else if (window.cType === "css") {
        window.css = window.editor.getValue();
    } else if (window.cType === "javascript") {
        window.js = window.editor.getValue();
    }
})

// Valentines Countdown
/* function calculateVCountdown() {

    var now = new Date();

    var currentMonth = (now.getMonth() + 1);

    var currentDay = now.getDate();

    var nextVYear = now.getFullYear();

    if (currentMonth == 02 && currentDay > 14) {
        ver.innerHTML = "v0.9.7";
    }

    if (currentMonth == 02 && currentDay == 14) {
        ver.innerHTML = "It's valentines day!"
    }

    var nextVDate = nextVYear + '-02-14T00:00:00.000Z';
    var vDay = new Date(nextVDate);

    var diffSeconds = Math.floor((vDay.getTime() - now.getTime()) / 1000);

    var days = 0;
    var hours = 0;
    var minutes = 0;
    var seconds = 0;

    if(currentMonth != 02 || (currentMonth == 02 && currentDay != 14)){
        days = Math.floor(diffSeconds / (3600*24));
        diffSeconds  -= days * 3600 * 24;
        hours   = Math.floor(diffSeconds / 3600);
        diffSeconds  -= hours * 3600;
        minutes = Math.floor(diffSeconds / 60);
        diffSeconds  -= minutes * 60;
        seconds = diffSeconds;
        ver.innerHTML = days + ":" + hours + ":" + minutes + ":" + seconds + " Till Valentines Day!";
    }

    setTimeout(calculateVCountdown, 1000);
}

calculateVCountdown(); */
  
  function validate(Data) {
      var splitData = Data.account.split(":");
      if (splitData[0] === getCookie("li")) {
          document.getElementById("load").style.display = "none";
          window.html = decodeURIComponent(Data.html);
          window.css = decodeURIComponent(Data.css);
          window.js = decodeURIComponent(Data.js);
          window.editor.getModel().setValue(window.html);
      } else {
          alert("wrong user logged in.");
          window.location.replace("./index.html");
      }
  }
  
  function saveCode() {
      saveBtn.innerHTML = "Saving...";
      var data = JSON.stringify({
          "html": encodeURIComponent(window.html),
          "css": encodeURIComponent(window.css),
          "js": encodeURIComponent(window.js)
      })
      
      var xhr2 = new XMLHttpRequest();
      xhr2.withCredentials = false;
      
      xhr2.addEventListener("readystatechange", function () {
          if (xhr2.readyState === 4 && xhr2.status === 200) {
              saveBtn.innerHTML = "Save";
              console.log("saved code.");
          } else if (xhr2.readyState === XMLHttpRequest.DONE) {
              alert("there was some error saving.");
          }
      })
      
      xhr2.open("PUT", "https://zball-ec41.restdb.io/rest/editor/" + queryString["id"]);
      xhr2.setRequestHeader("content-type", "application/json");
      xhr2.setRequestHeader("x-apikey", "6228c7c7dced170e8c83a0b8");
      xhr2.setRequestHeader("cache-control", "no-cache");
      
      xhr2.send(data);
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
