if (getCookie("li") === "") {
    window.location.replace("./index.html");
}

var html = {}, css = {}, js = {}, afs = {}, s, ftype = "html", cType, MODES;
var cType;
var rat;
var resources;

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
lpicker = document.querySelector(".language-picker"),
shareBtn = document.querySelector(".btn-share");

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

shareBtn.onclick = function() {
    document.querySelector(".hover_bkgr_fricc").style.display = "inline-block";
    document.querySelector(".popupCloseButton").onclick = function() {
        document.querySelector(".hover_bkgr_fricc").style.display = "none";
    };
};

document.getElementById("createFile").onclick = function() {
    document.querySelector(".hover_bkgr_fricc2").style.display = "inline-block";
    document.querySelector(".popupCloseButton2").onclick = function() {
        document.querySelector(".hover_bkgr_fricc2").style.display = "none";
    };
    var newInput = document.createElement("input");
    var newSelection = document.createElement("select");
    var newButton = document.createElement("button");
    var opt1 = document.createElement("option");
    var opt2 = document.createElement("option");
    var opt3 = document.createElement("option");
    
    newInput.placeholder = "Name";
    newInput.id = "name3";
    newSelection.id = "selection";
    newButton.innerHTML = "Create";
    newButton.id = "saveFile";
    opt1.innerHTML = "HTML";
    opt2.innerHTML = "CSS";
    opt3.innerHTML = "JS";
    
    document.getElementById("content").appendChild(newInput);
    newSelection.appendChild(opt1);
    newSelection.appendChild(opt2);
    newSelection.appendChild(opt3);
    document.getElementById("content").appendChild(newSelection);
    document.getElementById("content").appendChild(newButton);
    document.getElementById("selection").onchange = function () {
        if (this.options[this.selectedIndex].innerHTML === "HTML") {
            window.ftype = "html";
        } else if (this.options[this.selectedIndex].innerHTML === "CSS") {
            window.ftype = "css";
        } else if (this.options[this.selectedIndex].innerHTML === "JS") {
            window.ftype = "js";
        } else {
            alert("unexpected error");
        }
    }
    document.getElementById("saveFile").onclick = function () {
        var f = document.getElementById("name3").value + "." + window.ftype;
        
        window.afs[f] = "";
        
        var newOpt = document.createElement("option");
        
        newOpt.innerHTML = f;
        if (window.ftype === "html") {
            newOpt.value = "32";
        } else if (window.ftype === "css") {
            newOpt.value = "13";
        } else if (window.ftype === "js") {
            newOpt.value = "35";
        } else {
            newOpt.value = "32";
        }
        
        newOpt.selected = true;
        
        document.querySelector(".language-picker").appendChild(newOpt);
        document.querySelector(".language-picker").style.display = "";
        if (window.ftype === "html") {
            document.querySelector(".btn-dark-light").style.display = "";
            document.querySelector("#addResource").style.display = "none";
            document.querySelector("#removeSources").style.display = "none";
            document.getElementById("link").href = "./view.html?id=" + queryString["id"] + "&f=" + encodeURIComponent(window.s);
            document.getElementById("link").target = "_blank";
            document.getElementById("link").innerHTML = document.getElementById("link").href;
            document.getElementById("link").rel = "noopener noreferrer";
        } else if (window.ftype === "css") {
            document.querySelector(".btn-dark-light").style.display = "";
            document.querySelector("#addResource").style.display = "";
            document.querySelector("#removeSources").style.display = "";
        } else if (window.ftype === "js") {
            document.querySelector(".btn-dark-light").style.display = "";
            document.querySelector("#addResource").style.display = "";
            document.querySelector("#removeSources").style.display = "";
        }
        
        window.loadEditor();
        window.s = document.querySelector(".language-picker").options[document.querySelector(".language-picker").selectedIndex].text;
        
        document.getElementById("content").removeChild(newInput);
        document.getElementById("content").removeChild(newSelection);
        document.getElementById("content").removeChild(newButton);
        document.querySelector(".popupCloseButton2").click();
    }
}

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
    var myWindow = window.open("./view.html?id=" + queryString["id"] + "&f=" + encodeURIComponent(window.s), "View Code");
});

// Opens the devlog
devlog.addEventListener('click', () => {
    window.open("./devlog.txt", "Devlog");
});

// Runs the code
function runcode() {
    var newResource;
    if (window.cType === "html") {
        var url, filename, styl, count=-1;
        iframe.contentDocument.body.innerHTML=window.afs[window.s];
        var scripts = iframe.contentDocument.getElementsByTagName('script');
        var styles = iframe.contentDocument.getElementsByTagName('link');
        Array.from({length: scripts.length}, () => {
            count += 1;
            if (scripts[count].hasAttribute('src')) {
                url = scripts[count].src;
                filename = url.substring(url.lastIndexOf('/')+1);
                iframe.contentWindow.eval(window.afs[filename]);
            }
        })
        count=-1;
        Array.from({length: styles.length}, () => {
            count += 1;
            if (styles[count].hasAttribute('rel')) {
                if (styles[count].getAttribute('rel') === "stylesheet") {
                    url = styles[count].href;
                    filename = url.substring(url.lastIndexOf('/')+1);
                    styl = document.createElement('style');
                    styl.innerHTML = window.afs[filename];
                    iframe.contentDocument.body.appendChild(styl);
                }
            }
        })
        window.resources.forEach((resource) => {
            if (resource[1] === "css") {
                newResource = document.createElement("link");
            
                newResource.rel = "stylesheet";
                newResource.href = resource[0];
            
                iframe.contentDocument.head.appendChild(newResource);
            } else if (resource[1] === "javascript") {
                newResource = document.createElement("script");
            
                newResource.src = resource[0];
            
                iframe.contentDocument.head.appendChild(newResource);
            }
        });
    } else {
        alert('select an HTML file!');
    }
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
    window.afs[window.s] = window.editor.getValue();
})

document.getElementById("addResource").onclick = function() {
    let resource = prompt("Enter the resource link:", "");
    
    if (resource != null || resource != "") {
        window.resources.push([resource, window.cType]);
    }
}

document.getElementById("removeSources").onclick = function() {
    window.resources = [];
    saveBtn.click();
}

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

function getUsername(Data) {
    var data = null;
    
    var xhr6 = new XMLHttpRequest();
    xhr6.withCredentials = false;
    
    xhr6.addEventListener("readystatechange", () => {
        if (xhr6.readyState === XMLHttpRequest.DONE && xhr6.status === 200) {
            var d = JSON.parse(xhr6.responseText);
            
            createTimestamp(Data, d.username);
        }
    })
    
    xhr6.open("GET", "https://zball-ec41.restdb.io/rest/username/" + getCookie("li"));
    xhr6.setRequestHeader("content-type", "application/json");
    xhr6.setRequestHeader("x-apikey", "6228c7c7dced170e8c83a0b8");
    xhr6.setRequestHeader("cache-control", "no-cache");
    
    xhr6.send(data);
}

function createTimestamp(Data2, uname) {
    var time = new Date();
    
    var data5 = JSON.stringify({
        "opened": time + "/.///.//" + uname
    });
    
    var xhr5 = new XMLHttpRequest();
    xhr5.withCredentials = false;
    
    xhr5.addEventListener("readystatechange", () => {
        if (xhr5.readyState === XMLHttpRequest.DONE && xhr5.status === 200) {
            console.log(xhr5.responseText);
            validate(Data2);
        }
    });
    
    xhr5.open("PUT", "https://zball-ec41.restdb.io/rest/editor/" + Data2._id);
    xhr5.setRequestHeader("content-type", "application/json");
    xhr5.setRequestHeader("x-apikey", "6228c7c7dced170e8c83a0b8");
    xhr5.setRequestHeader("cache-control", "no-cache");
    
    xhr5.send(data5);
}
  
  function validate(Data) {
      var splitData = Data.account.split(";");
      splitData.forEach((data) => {
          var splitAccountData = data.split(":");
          if (splitAccountData[0] === getCookie("li")) {
            if (Data.afs !== undefined) {
                window.afs = JSON.parse(Data.afs);
            } else {
                // Nothing will happen
            }
            window.resources = Data.sources;
            if (Object.keys(window.afs).length !== 0) { Object.keys(window.afs).forEach((file) => {
                var newOption;
                var splitType = file.split(".");
                if (splitType[1] === "html") {
                    newOption = document.createElement("option");
                    
                    newOption.innerHTML = file;
                    newOption.value = "32";
                    
                    document.querySelector(".language-picker").appendChild(newOption);
                } else if (splitType[1] === "css") {
                    newOption = document.createElement("option");
                    
                    newOption.innerHTML = file;
                    newOption.value = "13";
                    
                    document.querySelector(".language-picker").appendChild(newOption);
                } else if (splitType[1] === "js") {
                    newOption = document.createElement("option");
                    
                    newOption.innerHTML = file;
                    newOption.value = "35";
                    
                    document.querySelector(".language-picker").appendChild(newOption);
                }
            }) 
                document.getElementById("editor").innerHTML = "<h1 style='text-align: center;'>No file selected.</h1>";
                document.getElementById("createFile").style.display = "";
                document.querySelector(".language-picker").style.display = "";
                document.querySelector(".btn-dark-light").style.display = "";
                window.s = document.querySelector(".language-picker").options[document.querySelector(".language-picker").selectedIndex].innerHTML;
                window.loadEditor();
                document.getElementById("link").href = "./view.html?id=" + queryString["id"] + "&f=" + encodeURIComponent(window.s);
                document.getElementById("link").target = "_blank";
                document.getElementById("link").innerHTML = document.getElementById("link").href;
                document.getElementById("link").rel = "noopener noreferrer";
            } else {
                document.getElementById("editor").innerHTML = "<h1 style='text-align: center;'>No file selected.</h1>";
                document.getElementById("createFile").style.display = "";
                document.getElementById("addResource").style.display = "none";
                document.getElementById("removeSources").style.display = "none";
                document.querySelector(".language-picker").style.display = "none";
                document.querySelector(".btn-dark-light").style.display = "none";
            }
          }
      })
      
      if (window.rat === false) {
          alert("wrong user logged in.");
          window.location.replace("./index.html");
      }
  }
  
  function saveCode() {
      saveBtn.src = "https://cdn-icons-png.flaticon.com/512/2767/2767294.png";
      var data = JSON.stringify({
          "afs": JSON.stringify(window.afs),
          "sources": window.resources
      })
      
      var xhr2 = new XMLHttpRequest();
      xhr2.withCredentials = false;
      
      xhr2.addEventListener("readystatechange", function () {
          if (xhr2.readyState === 4 && xhr2.status === 200) {
              saveBtn.src = "https://cdn-icons-png.flaticon.com/512/2874/2874091.png";
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
                getUsername(JSON.parse(xhr.responseText));
                document.getElementById("editorLink").href = "./update.html?id=" + queryString["id"];
                document.getElementById("editorLink").target = "_blank";
                document.getElementById("editorLink").innerHTML = document.getElementById("editorLink").href;
                document.getElementById("editorLink").rel = "noopener noreferrer";
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

document.querySelector(".language-picker").onchange = function() {
    window.s = this.options[this.selectedIndex].innerHTML;
    window.cType = window.MODES[this.options[this.selectedIndex].value].modeId;
    window.loadSample(window.MODES[this.options[this.selectedIndex].value]);
    if (window.cType === "css") {
        document.querySelector(".language-picker").style.display = "";
        document.getElementById("createFile").style.display = "";
        document.querySelector(".btn-dark-light").style.display = "";
        document.getElementById("addResource").style.display = "";
        document.getElementById("removeSources").style.display = "";
    } else if (window.cType === "javascript") {
        document.querySelector(".language-picker").style.display = "";
        document.getElementById("createFile").style.display = "";
        document.querySelector(".btn-dark-light").style.display = "";
        document.getElementById("addResource").style.display = "";
        document.getElementById("removeSources").style.display = "";
    } else {
        document.querySelector(".language-picker").style.display = "";
        document.querySelector(".btn-dark-light").style.display = "";
        document.getElementById("createFile").style.display = "";
        document.getElementById("addResource").style.display = "none";
        document.getElementById("removeSources").style.display = "none";
        document.getElementById("link").href = "./view.html?id=" + queryString["id"] + "&f=" + encodeURIComponent(window.s);
        document.getElementById("link").target = "_blank";
        document.getElementById("link").innerHTML = document.getElementById("link").href;
        document.getElementById("link").rel = "noopener noreferrer";
    }
}