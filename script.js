if (getCookie("li") === "") {
    window.location.replace("./index.html");
}

var s;
var sf;
var ftype = "html";
var afs = {};
var MODES;
var fls;
var cType;
var rat;
var resources = [];
var settings;
var clearEditor;
var auto;

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
shareBtn = document.querySelector(".btn-share"),
settingsBtn = document.querySelector(".btn-setting");

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
    var newInput = document.createElement("input");
    var newSelection = document.createElement("select");
    var newButton = document.createElement("button");
    var opt1 = document.createElement("option");
    var opt2 = document.createElement("option");
    var opt3 = document.createElement("option");
    var opt4 = document.createElement("option");
    document.querySelector(".hover_bkgr_fricc2").style.display = "inline-block";
    document.querySelector(".popupCloseButton2").onclick = function() {
        document.querySelector(".hover_bkgr_fricc2").style.display = "none";
        document.getElementById("content").removeChild(newInput);
        document.getElementById("content").removeChild(newSelection);
        document.getElementById("content").removeChild(newButton);
    };
    
    newInput.placeholder = "Name";
    newInput.id = "name3";
    newSelection.id = "selection";
    newButton.innerHTML = "Create";
    newButton.id = "saveFile";
    opt1.innerHTML = "HTML";
    opt2.innerHTML = "CSS";
    opt3.innerHTML = "JS";
    opt4.innerHTML = "Folder";
    
    document.getElementById("content").appendChild(newInput);
    newSelection.appendChild(opt1);
    newSelection.appendChild(opt2);
    newSelection.appendChild(opt3);
    newSelection.appendChild(opt4);
    document.getElementById("content").appendChild(newSelection);
    document.getElementById("content").appendChild(newButton);
    window.ftype = "html";
    document.getElementById("selection").onchange = function () {
        if (this.options[this.selectedIndex].innerHTML === "HTML") {
            window.ftype = "html";
        } else if (this.options[this.selectedIndex].innerHTML === "CSS") {
            window.ftype = "css";
        } else if (this.options[this.selectedIndex].innerHTML === "JS") {
            window.ftype = "js";
        } else if (this.options[this.selectedIndex].innerHTML === "Folder") {
            window.ftype = "folder";
        } else {
            alert("unexpected error");
        }
    }
    document.getElementById("saveFile").onclick = function () {
        if (window.ftype === "folder") {
            var folder = document.getElementById("name3").value;
            if (window.afs[folder] === undefined && folder !== "main") {
                window.afs[folder] = {};
                
                var newOpt = document.createElement("option");
                
                newOpt.innerHTML = document.getElementById("name3").value;
                
                newOpt.selected = true;
                
                document.querySelector(".folder-picker").appendChild(newOpt);
                document.querySelector(".folder-picker").style.display = "";
                
                window.s = "";
                window.sf = folder;
                window.afs[folder] = {};
                
                document.getElementById("editor").innerHTML = "<h1 style='text-align: center;'>No file selected.</h1>";
                document.querySelector(".language-picker").innerHTML = "";
                document.getElementById("content").removeChild(newInput);
                document.getElementById("content").removeChild(newSelection);
                document.getElementById("content").removeChild(newButton);
                document.querySelector(".popupCloseButton2").click();
            } else {
                alert("folder already exists.");
                document.querySelector(".popupCloseButton2").click();
            }
        } else {
            var f = window.Base64.encode(document.getElementById("name3").value) + "-" + window.ftype;
            if (window.afs[window.sf][f] === undefined) {
                window.afs[window.sf][f] = "";
        
                var newOpt = document.createElement("option");
        
                newOpt.innerHTML = document.getElementById("name3").value + "." + window.ftype;
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
                    document.getElementById("deleteFile").style.display = "";
                    document.querySelector(".btn-dark-light").style.display = "";
                    document.querySelector("#addResource").style.display = "none";
                    document.querySelector("#removeSources").style.display = "none";
                    document.getElementById("link").href = "./view.html?id=" + queryString["id"] + "&f=" + encodeURIComponent(window.sf) + "." + encodeURIComponent(window.s);
                    document.getElementById("link").target = "_blank";
                    document.getElementById("link").innerHTML = document.getElementById("link").href;
                    document.getElementById("link").rel = "noopener noreferrer";
                } else if (window.ftype === "css") {
                    document.getElementById("deleteFile").style.display = "";
                    document.querySelector(".btn-dark-light").style.display = "";
                    document.querySelector("#addResource").style.display = "";
                    document.querySelector("#removeSources").style.display = "";
                } else if (window.ftype === "js") {
                    document.getElementById("deleteFile").style.display = "";
                    document.querySelector(".btn-dark-light").style.display = "";
                    document.querySelector("#addResource").style.display = "";
                    document.querySelector("#removeSources").style.display = "";
                }
                var td = document.querySelector(".language-picker").options[document.querySelector(".language-picker").selectedIndex].text;
                var tds = td.split(".");
                document.getElementById("editor").innerHTML = "";
                window.loadEditor();
                window.s = window.Base64.encode(tds[0]) + "-" + tds[1];
        
                document.getElementById("content").removeChild(newInput);
                document.getElementById("content").removeChild(newSelection);
                document.getElementById("content").removeChild(newButton);
                document.querySelector(".popupCloseButton2").click();
            } else {
                alert("file already exists.");
                document.querySelector(".popupCloseButton2").click();
            }
        }
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
    var myWindow = window.open("./view.html?id=" + queryString["id"] + "&f=" + encodeURIComponent(window.sf) + "." + encodeURIComponent(window.s), "View Code");
});

// Opens the devlog
devlog.addEventListener('click', () => {
    window.open("./devlog.txt", "Devlog");
});

// Runs the code
function runcode() {
    var newResource;
    if (window.cType === "html" && window.afs[window.sf][window.s] !== undefined) {
        var url, filename, styl, count=-1, tds, tdf, paths, folder;
        iframe.contentDocument.head.innerHTML = "";
        iframe.contentDocument.body.innerHTML=window.afs[window.sf][window.s];
        var scripts = iframe.contentDocument.getElementsByTagName('script');
        var styles = iframe.contentDocument.getElementsByTagName('link');
        var links = iframe.contentDocument.getElementsByTagName('a');
        Array.from({length: links.length}, () => {
            count += 1;
            if (links[count].hasAttribute('href')) {
                url = links[count].href;
                var urls1 = url.split("https://")[1];
                var urls2 = urls1.split("/")[0];
                if (urls2 === window.location.host) {
                    paths = url.split('/');
                    folder = paths[paths.length - 2];
                    filename = paths[paths.length - 1];
                    tds = filename.split(".");
                    tdf = encodeURIComponent(window.Base64.encode(tds[0])) + "-" + tds[1];
                    if (window.afs[folder] !== undefined) {
                        links[count].href = "./view.html?id=" + queryString["id"] + "&f=" + folder + "." + tdf;
                    } else {
                        links[count].href = "./view.html?id=" + queryString["id"] + "&f=" + "main." + tdf;
                    }  
                }
            }
        })
        count=-1;
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
                    iframe.contentDocument.body.appendChild(styl);
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
                    var code = window.afs[folder][tdf];
                    var a = code.split(";");
                    a.forEach((item) => {
                        if (item.includes("alert") === true || item.includes("window.alert") === true) {
                            var toBracket = item.split("(")[1];
                            if (toBracket.includes("'") === true) {
                                var toQuotation1 = toBracket.split("'")[1];
                                var toQuotation2 = toQuotation1.split("'")[0];
                                alert(toQuotation2);
                                code = code.replace((item + ";"), "");
                            } else if (toBracket.includes('"') === true) {
                                var toQuotation1 = toBracket.split('"')[1];
                                var toQuotation2 = toQuotation1.split('"')[0];
                                alert(toQuotation2);
                                code = code.replace((item + ";"), "");
                            }
                        } else if (item.includes("window.location.replace") === true || item.includes("location.replace") === true) {
                            var toBracket = item.split("(")[1];
                            if (toBracket.includes("'") === true) {
                                var toQuotation1 = toBracket.split("'")[1];
                                var toQuotation2 = toQuotation1.split("'")[0];
                                if (toQuotation2.includes("./") === true) {
                                    var splitDotSlash = toQuotation2.split("./")[1];
                                    if (splitDotSlash.includes("/") === true) {
                                        var splitFolder = splitDotSlash.split("/");
                                        var folder = splitFolder[0];
                                        var file = splitFolder[1];
                                        var splitFile = file.split(".");
                                        var piece = item + ";";
                                        code = code.replace(piece, "window.location.replace('" + "./view.html?id=" + queryString["id"] + "&f=" + folder + "." + encodeURIComponent(window.Base64.encode(splitFile[0])) + "-" + splitFile[1] + "');");
                                    } else {
                                        var file = splitDotSlash;
                                        var splitFile = file.split(".");
                                        var piece = item + ";";
                                        code = code.replace(piece, "window.location.replace('" + "./view.html?id=" + queryString["id"] + "&f=" + "main." + encodeURIComponent(window.Base64.encode(splitFile[0])) + "-" + splitFile[1] + "');");
                                    }
                                } else {
                                    if (toQuotation2.includes("/") === true) {
                                        var splitFolder = toQuotation2.split("/");
                                        var folder = splitFolder[0];
                                        var file = splitFolder[1];
                                        var splitFile = file.split(".");
                                        var piece = item + ";";
                                        code = code.replace(piece, "window.location.replace('" + "./view.html?id=" + queryString["id"] + "&f=" + folder + "." + encodeURIComponent(window.Base64.encode(splitFile[0])) + "-" + splitFile[1] + "');");
                                    } else {
                                        var file = toQuotation2;
                                        var splitFile = file.split(".");
                                        var piece = item + ";";
                                        code = code.replace(piece, "window.location.replace('" + "./view.html?id=" + queryString["id"] + "&f=" + "main." + encodeURIComponent(window.Base64.encode(splitFile[0])) + "-" + splitFile[1] + "');");
                                    }
                                }
                            } else if (toBracket.includes('"') === true) {
                                var toQuotation1 = toBracket.split('"')[1];
                                var toQuotation2 = toQuotation1.split('"')[0];
                                if (toQuotation2.includes("./") === true) {
                                    var splitDotSlash = toQuotation2.split("./")[1];
                                    if (splitDotSlash.includes("/") === true) {
                                        var splitFolder = splitDotSlash.split("/");
                                        var folder = splitFolder[0];
                                        var file = splitFolder[1];
                                        var splitFile = file.split(".");
                                        var piece = item + ";";
                                        code = code.replace(piece, "window.location.replace('" + "./view.html?id=" + queryString["id"] + "&f=" + folder + "." + encodeURIComponent(window.Base64.encode(splitFile[0])) + "-" + splitFile[1] + "');");
                                    } else {
                                        var file = splitDotSlash;
                                        var splitFile = file.split(".");
                                        var piece = item + ";";
                                        code = code.replace(piece, "window.location.replace('" + "./view.html?id=" + queryString["id"] + "&f=" + "main." + encodeURIComponent(window.Base64.encode(splitFile[0])) + "-" + splitFile[1] + "');");
                                    }
                                } else {
                                    if (toQuotation2.includes("/") === true) {
                                        var splitFolder = toQuotation2.split("/");
                                        var folder = splitFolder[0];
                                        var file = splitFolder[1];
                                        var splitFile = file.split(".");
                                        var piece = item + ";";
                                        code = code.replace(piece, "window.location.replace('" + "./view.html?id=" + queryString["id"] + "&f=" + folder + "." + encodeURIComponent(window.Base64.encode(splitFile[0])) + "-" + splitFile[1] + "');");
                                    } else {
                                        var file = toQuotation2;
                                        var splitFile = file.split(".");
                                        var piece = item + ";";
                                        code = code.replace(piece, "window.location.replace('" + "./view.html?id=" + queryString["id"] + "&f=" + "main." + encodeURIComponent(window.Base64.encode(splitFile[0])) + "-" + splitFile[1] + "');");
                                    }
                                }
                            }
                        } else if (item.includes("location.href") === true || item.includes("window.location.href") === true) {
                            var toEqual = item.split("=")[1];
                            if (toEqual.includes("'") === true) {
                                var toQuotation = toEqual.split("'")[1];
                                alert(toQuotation);
                                if (toQuotation.includes("./") === true) {
                                    var splitDotSlash = toQuotation.split("./")[1];
                                    if (splitDotSlash.includes("/") === true) {
                                        var splitFolder = splitDotSlash.split("/");
                                        var folder = splitFolder[0];
                                        var file = splitFolder[1];
                                        var splitFile = file.split(".");
                                        var piece = item + ";";
                                        code = code.replace(piece, "window.location.href = './view.html?id=" + queryString["id"] + "&f=" + folder + "." + encodeURIComponent(window.Base64.encode(splitFile[0])) + "-" + splitFile[1] + "';");
                                    } else {
                                        var file = splitDotSlash;
                                        var splitFile = file.split(".");
                                        var piece = item + ";";
                                        code = code.replace(piece, "window.location.href = './view.html?id=" + queryString["id"] + "&f=" + "main." + encodeURIComponent(window.Base64.encode(splitFile[0])) + "-" + splitFile[1] + "';");
                                    }
                                } else {
                                    if (toQuotation.includes("/") === true) {
                                        var splitFolder = toQuotation.split("/");
                                        var folder = splitFolder[0];
                                        var file = splitFolder[1];
                                        var splitFile = file.split(".");
                                        var piece = item + ";";
                                        code = code.replace(piece, "window.location.href = './view.html?id=" + queryString["id"] + "&f=" + folder + "." + encodeURIComponent(window.Base64.encode(splitFile[0])) + "-" + splitFile[1] + "';");
                                    } else {
                                        var file = toQuotation;
                                        var splitFile = file.split(".");
                                        var piece = item + ";";
                                        code = code.replace(piece, "window.location.href = './view.html?id=" + queryString["id"] + "&f=" + "main." + encodeURIComponent(window.Base64.encode(splitFile[0])) + "-" + splitFile[1] + "';");
                                    }
                                }
                            } else if (toEqual.includes('"') === true) {
                                var toQuotation = toEqual.split('"')[1];
                                if (toQuotation.includes("./") === true) {
                                    var splitDotSlash = toQuotation.split("./")[1];
                                    if (splitDotSlash.includes("/") === true) {
                                        var splitFolder = splitDotSlash.split("/");
                                        var folder = splitFolder[0];
                                        var file = splitFolder[1];
                                        var splitFile = file.split(".");
                                        var piece = item + ";";
                                        code = code.replace(piece, "window.location.href = './view.html?id=" + queryString["id"] + "&f=" + folder + "." + encodeURIComponent(window.Base64.encode(splitFile[0])) + "-" + splitFile[1] + "';");
                                    } else {
                                        var file = splitDotSlash;
                                        var splitFile = file.split(".");
                                        var piece = item + ";";
                                        code = code.replace(piece, "window.location.href = './view.html?id=" + queryString["id"] + "&f=" + "main." + encodeURIComponent(window.Base64.encode(splitFile[0])) + "-" + splitFile[1] + "';");
                                    }
                                } else {
                                    if (toQuotation.includes("/") === true) {
                                        var splitFolder = toQuotation.split("/");
                                        var folder = splitFolder[0];
                                        var file = splitFolder[1];
                                        var splitFile = file.split(".");
                                        var piece = item + ";";
                                        code = code.replace(piece, "window.location.href = './view.html?id="+ queryString["id"] + "&f=" + folder + "." + encodeURIComponent(window.Base64.encode(splitFile[0])) + "-" + splitFile[1] + "';");
                                    } else {
                                        var file = toQuotation;
                                        var splitFile = file.split(".");
                                        var piece = item + ";";
                                        code = code.replace(piece, "window.location.href = './view.html?id=" + queryString["id"] +"&f=" + "main." + encodeURIComponent(window.Base64.encode(splitFile[0])) + "-" + splitFile[1] + "';");
                                    }
                                }
                            }
                        } else {
                            return;
                        }
                    })
                    iframe.contentWindow.eval(code);
                } else {
                    var code = window.afs["main"][tdf];
                    var a = code.split(";");
                    a.forEach((item) => {
                        if (item.includes("alert") === true || item.includes("window.alert") === true) {
                            var toBracket = item.split("(")[1];
                            if (toBracket.includes("'") === true) {
                                var toQuotation1 = toBracket.split("'")[1];
                                var toQuotation2 = toQuotation1.split("'")[0];
                                alert(toQuotation2);
                                code = code.replace((item + ";"), "");
                            } else if (toBracket.includes('"') === true) {
                                var toQuotation1 = toBracket.split('"')[1];
                                var toQuotation2 = toQuotation1.split('"')[0];
                                alert(toQuotation2);
                                code = code.replace((item + ";"), "");
                            }
                        } else if (item.includes("window.location.replace") === true || item.includes("location.replace") === true) {
                            var toBracket = item.split("(")[1];
                            if (toBracket.includes("'") === true) {
                                var toQuotation1 = toBracket.split("'")[1];
                                var toQuotation2 = toQuotation1.split("'")[0];
                                if (toQuotation2.includes("./") === true) {
                                    var splitDotSlash = toQuotation2.split("./")[1];
                                    if (splitDotSlash.includes("/") === true) {
                                        var splitFolder = splitDotSlash.split("/");
                                        var folder = splitFolder[0];
                                        var file = splitFolder[1];
                                        var splitFile = file.split(".");
                                        var piece = item + ";";
                                        code = code.replace(piece, "window.location.replace('" + "./view.html?id=" + queryString["id"] + "&f=" + folder + "." + encodeURIComponent(window.Base64.encode(splitFile[0])) + "-" + splitFile[1] + "');");
                                    } else {
                                        var file = splitDotSlash;
                                        var splitFile = file.split(".");
                                        var piece = item + ";";
                                        code = code.replace(piece, "window.location.replace('" + "./view.html?id=" + queryString["id"] + "&f=" + "main." + encodeURIComponent(window.Base64.encode(splitFile[0])) + "-" + splitFile[1] + "');");
                                    }
                                } else {
                                    if (toQuotation2.includes("/") === true) {
                                        var splitFolder = toQuotation2.split("/");
                                        var folder = splitFolder[0];
                                        var file = splitFolder[1];
                                        var splitFile = file.split(".");
                                        var piece = item + ";";
                                        code = code.replace(piece, "window.location.replace('" + "./view.html?id=" + queryString["id"] + "&f=" + folder + "." + encodeURIComponent(window.Base64.encode(splitFile[0])) + "-" + splitFile[1] + "');");
                                    } else {
                                        var file = toQuotation2;
                                        var splitFile = file.split(".");
                                        var piece = item + ";";
                                        code = code.replace(piece, "window.location.replace('" + "./view.html?id=" + queryString["id"] + "&f=" + "main." + encodeURIComponent(window.Base64.encode(splitFile[0])) + "-" + splitFile[1] + "');");
                                    }
                                }
                            } else if (toBracket.includes('"') === true) {
                                var toQuotation1 = toBracket.split('"')[1];
                                var toQuotation2 = toQuotation1.split('"')[0];
                                if (toQuotation2.includes("./") === true) {
                                    var splitDotSlash = toQuotation2.split("./")[1];
                                    if (splitDotSlash.includes("/") === true) {
                                        var splitFolder = splitDotSlash.split("/");
                                        var folder = splitFolder[0];
                                        var file = splitFolder[1];
                                        var splitFile = file.split(".");
                                        var piece = item + ";";
                                        code = code.replace(piece, "window.location.replace('" + "./view.html?id=" + queryString["id"] + "&f=" + folder + "." + encodeURIComponent(window.Base64.encode(splitFile[0])) + "-" + splitFile[1] + "');");
                                    } else {
                                        var file = splitDotSlash;
                                        var splitFile = file.split(".");
                                        var piece = item + ";";
                                        code = code.replace(piece, "window.location.replace('" + "./view.html?id=" + queryString["id"] + "&f=" + "main." + encodeURIComponent(window.Base64.encode(splitFile[0])) + "-" + splitFile[1] + "');");
                                    }
                                } else {
                                    if (toQuotation2.includes("/") === true) {
                                        var splitFolder = toQuotation2.split("/");
                                        var folder = splitFolder[0];
                                        var file = splitFolder[1];
                                        var splitFile = file.split(".");
                                        var piece = item + ";";
                                        code = code.replace(piece, "window.location.replace('" + "./view.html?id=" + queryString["id"] + "&f=" + folder + "." + encodeURIComponent(window.Base64.encode(splitFile[0])) + "-" + splitFile[1] + "');");
                                    } else {
                                        var file = toQuotation2;
                                        var splitFile = file.split(".");
                                        var piece = item + ";";
                                        code = code.replace(piece, "window.location.replace('" + "./view.html?id=" + queryString["id"] + "&f=" + "main." + encodeURIComponent(window.Base64.encode(splitFile[0])) + "-" + splitFile[1] + "');");
                                    }
                                }
                            }
                        } else if (item.includes("location.href") === true || item.includes("window.location.href") === true) {
                            var toEqual = item.split("=")[1];
                            if (toEqual.includes("'") === true) {
                                var toQuotation = toEqual.split("'")[1];
                                alert(toQuotation);
                                if (toQuotation.includes("./") === true) {
                                    var splitDotSlash = toQuotation.split("./")[1];
                                    if (splitDotSlash.includes("/") === true) {
                                        var splitFolder = splitDotSlash.split("/");
                                        var folder = splitFolder[0];
                                        var file = splitFolder[1];
                                        var splitFile = file.split(".");
                                        var piece = item + ";";
                                        code = code.replace(piece, "window.location.href = './view.html?id=" + queryString["id"] + "&f=" + folder + "." + encodeURIComponent(window.Base64.encode(splitFile[0])) + "-" + splitFile[1] + "';");
                                    } else {
                                        var file = splitDotSlash;
                                        var splitFile = file.split(".");
                                        var piece = item + ";";
                                        code = code.replace(piece, "window.location.href = './view.html?id=" + queryString["id"] + "&f=" + "main." + encodeURIComponent(window.Base64.encode(splitFile[0])) + "-" + splitFile[1] + "';");
                                    }
                                } else {
                                    if (toQuotation.includes("/") === true) {
                                        var splitFolder = toQuotation.split("/");
                                        var folder = splitFolder[0];
                                        var file = splitFolder[1];
                                        var splitFile = file.split(".");
                                        var piece = item + ";";
                                        code = code.replace(piece, "window.location.href = './view.html?id=" + queryString["id"] + "&f=" + folder + "." + encodeURIComponent(window.Base64.encode(splitFile[0])) + "-" + splitFile[1] + "';");
                                    } else {
                                        var file = toQuotation;
                                        var splitFile = file.split(".");
                                        var piece = item + ";";
                                        code = code.replace(piece, "window.location.href = './view.html?id=" + queryString["id"] + "&f=" + "main." + encodeURIComponent(window.Base64.encode(splitFile[0])) + "-" + splitFile[1] + "';");
                                    }
                                }
                            } else if (toEqual.includes('"') === true) {
                                var toQuotation = toEqual.split('"')[1];
                                if (toQuotation.includes("./") === true) {
                                    var splitDotSlash = toQuotation.split("./")[1];
                                    if (splitDotSlash.includes("/") === true) {
                                        var splitFolder = splitDotSlash.split("/");
                                        var folder = splitFolder[0];
                                        var file = splitFolder[1];
                                        var splitFile = file.split(".");
                                        var piece = item + ";";
                                        code = code.replace(piece, "window.location.href = './view.html?id=" + queryString["id"] + "&f=" + folder + "." + encodeURIComponent(window.Base64.encode(splitFile[0])) + "-" + splitFile[1] + "';");
                                    } else {
                                        var file = splitDotSlash;
                                        var splitFile = file.split(".");
                                        var piece = item + ";";
                                        code = code.replace(piece, "window.location.href = './view.html?id=" + queryString["id"] + "&f=" + "main." + encodeURIComponent(window.Base64.encode(splitFile[0])) + "-" + splitFile[1] + "';");
                                    }
                                } else {
                                    if (toQuotation.includes("/") === true) {
                                        var splitFolder = toQuotation.split("/");
                                        var folder = splitFolder[0];
                                        var file = splitFolder[1];
                                        var splitFile = file.split(".");
                                        var piece = item + ";";
                                        code = code.replace(piece, "window.location.href = './view.html?id="+ queryString["id"] + "&f=" + folder + "." + encodeURIComponent(window.Base64.encode(splitFile[0])) + "-" + splitFile[1] + "';");
                                    } else {
                                        var file = toQuotation;
                                        var splitFile = file.split(".");
                                        var piece = item + ";";
                                        code = code.replace(piece, "window.location.href = './view.html?id=" + queryString["id"] +"&f=" + "main." + encodeURIComponent(window.Base64.encode(splitFile[0])) + "-" + splitFile[1] + "';");
                                    }
                                }
                            }
                        } else {
                            return;
                        }
                    })
                    iframe.contentWindow.eval(code);
                }
            } else {
                var code = scripts[count].innerHTML;
                var a = code.split(";");
                a.forEach((item) => {
                    if (item.includes("alert") === true || item.includes("window.alert") === true) {
                        var toBracket = item.split("(")[1];
                        if (toBracket.includes("'") === true) {
                            var toQuotation1 = toBracket.split("'")[1];
                            var toQuotation2 = toQuotation1.split("'")[0];
                            alert(toQuotation2);
                            code = code.replace((item + ";"), "");
                        } else if (toBracket.includes('"') === true) {
                            var toQuotation1 = toBracket.split('"')[1];
                            var toQuotation2 = toQuotation1.split('"')[0];
                            alert(toQuotation2);
                            code = code.replace((item + ";"), "");
                        }
                    } else if (item.includes("window.location.replace") === true || item.includes("location.replace") === true) {
                        var toBracket = item.split("(")[1];
                        if (toBracket.includes("'") === true) {
                            var toQuotation1 = toBracket.split("'")[1];
                            var toQuotation2 = toQuotation1.split("'")[0];
                            if (toQuotation2.includes("./") === true) {
                                var splitDotSlash = toQuotation2.split("./")[1];
                                if (splitDotSlash.includes("/") === true) {
                                    var splitFolder = splitDotSlash.split("/");
                                    var folder = splitFolder[0];
                                    var file = splitFolder[1];
                                    var splitFile = file.split(".");
                                    var piece = item + ";";
                                    code = code.replace(piece, "window.location.replace('" + "./view.html?id=" + queryString["id"] + "&f=" + folder + "." + encodeURIComponent(window.Base64.encode(splitFile[0])) + "-" + splitFile[1] + "');");
                                } else {
                                    var file = splitDotSlash;
                                    var splitFile = file.split(".");
                                    var piece = item + ";";
                                    code = code.replace(piece, "window.location.replace('" + "./view.html?id=" + queryString["id"] + "&f=" + "main." + encodeURIComponent(window.Base64.encode(splitFile[0])) + "-" + splitFile[1] + "');");
                                }
                            } else {
                                if (toQuotation2.includes("/") === true) {
                                    var splitFolder = toQuotation2.split("/");
                                    var folder = splitFolder[0];
                                    var file = splitFolder[1];
                                    var splitFile = file.split(".");
                                    var piece = item + ";";
                                    code = code.replace(piece, "window.location.replace('" + "./view.html?id=" + queryString["id"] + "&f=" + folder + "." + encodeURIComponent(window.Base64.encode(splitFile[0])) + "-" + splitFile[1] + "');");
                                } else {
                                    var file = toQuotation2;
                                    var splitFile = file.split(".");
                                    var piece = item + ";";
                                    code = code.replace(piece, "window.location.replace('" + "./view.html?id=" + queryString["id"] + "&f=" + "main." + encodeURIComponent(window.Base64.encode(splitFile[0])) + "-" + splitFile[1] + "');");
                                }
                            }
                        } else if (toBracket.includes('"') === true) {
                            var toQuotation1 = toBracket.split('"')[1];
                            var toQuotation2 = toQuotation1.split('"')[0];
                            if (toQuotation2.includes("./") === true) {
                                var splitDotSlash = toQuotation2.split("./")[1];
                                if (splitDotSlash.includes("/") === true) {
                                    var splitFolder = splitDotSlash.split("/");
                                    var folder = splitFolder[0];
                                    var file = splitFolder[1];
                                    var splitFile = file.split(".");
                                    var piece = item + ";";
                                    code = code.replace(piece, "window.location.replace('" + "./view.html?id=" + queryString["id"] + "&f=" + folder + "." + encodeURIComponent(window.Base64.encode(splitFile[0])) + "-" + splitFile[1] + "');");
                                } else {
                                    var file = splitDotSlash;
                                    var splitFile = file.split(".");
                                    var piece = item + ";";
                                    code = code.replace(piece, "window.location.replace('" + "./view.html?id=" + queryString["id"] + "&f=" + "main." + encodeURIComponent(window.Base64.encode(splitFile[0])) + "-" + splitFile[1] + "');");
                                }
                            } else {
                                if (toQuotation2.includes("/") === true) {
                                    var splitFolder = toQuotation2.split("/");
                                    var folder = splitFolder[0];
                                    var file = splitFolder[1];
                                    var splitFile = file.split(".");
                                    var piece = item + ";";
                                    code = code.replace(piece, "window.location.replace('" + "./view.html?id=" + queryString["id"] + "&f=" + folder + "." + encodeURIComponent(window.Base64.encode(splitFile[0])) + "-" + splitFile[1] + "');");
                                } else {
                                    var file = toQuotation2;
                                    var splitFile = file.split(".");
                                    var piece = item + ";";
                                    code = code.replace(piece, "window.location.replace('" + "./view.html?id=" + queryString["id"] + "&f=" + "main." + encodeURIComponent(window.Base64.encode(splitFile[0])) + "-" + splitFile[1] + "');");
                                }
                            }
                        }
                    } else if (item.includes("location.href") === true || item.includes("window.location.href") === true) {
                        var toEqual = item.split("=")[1];
                        if (toEqual.includes("'") === true) {
                            var toQuotation = toEqual.split("'")[1];
                            alert(toQuotation);
                            if (toQuotation.includes("./") === true) {
                                var splitDotSlash = toQuotation.split("./")[1];
                                if (splitDotSlash.includes("/") === true) {
                                    var splitFolder = splitDotSlash.split("/");
                                    var folder = splitFolder[0];
                                    var file = splitFolder[1];
                                    var splitFile = file.split(".");
                                    var piece = item + ";";
                                    code = code.replace(piece, "window.location.href = './view.html?id=" + queryString["id"] + "&f=" + folder + "." + encodeURIComponent(window.Base64.encode(splitFile[0])) + "-" + splitFile[1] + "';");
                                } else {
                                    var file = splitDotSlash;
                                    var splitFile = file.split(".");
                                    var piece = item + ";";
                                    code = code.replace(piece, "window.location.href = './view.html?id=" + queryString["id"] + "&f=" + "main." + encodeURIComponent(window.Base64.encode(splitFile[0])) + "-" + splitFile[1] + "';");
                                }
                            } else {
                                if (toQuotation.includes("/") === true) {
                                    var splitFolder = toQuotation.split("/");
                                    var folder = splitFolder[0];
                                    var file = splitFolder[1];
                                    var splitFile = file.split(".");
                                    var piece = item + ";";
                                    code = code.replace(piece, "window.location.href = './view.html?id=" + queryString["id"] + "&f=" + folder + "." + encodeURIComponent(window.Base64.encode(splitFile[0])) + "-" + splitFile[1] + "';");
                                } else {
                                    var file = toQuotation;
                                    var splitFile = file.split(".");
                                    var piece = item + ";";
                                    code = code.replace(piece, "window.location.href = './view.html?id=" + queryString["id"] + "&f=" + "main." + encodeURIComponent(window.Base64.encode(splitFile[0])) + "-" + splitFile[1] + "';");
                                }
                            }
                        } else if (toEqual.includes('"') === true) {
                            var toQuotation = toEqual.split('"')[1];
                            if (toQuotation.includes("./") === true) {
                                var splitDotSlash = toQuotation.split("./")[1];
                                if (splitDotSlash.includes("/") === true) {
                                    var splitFolder = splitDotSlash.split("/");
                                    var folder = splitFolder[0];
                                    var file = splitFolder[1];
                                    var splitFile = file.split(".");
                                    var piece = item + ";";
                                    code = code.replace(piece, "window.location.href = './view.html?id=" + queryString["id"] + "&f=" + folder + "." + encodeURIComponent(window.Base64.encode(splitFile[0])) + "-" + splitFile[1] + "';");
                                } else {
                                    var file = splitDotSlash;
                                    var splitFile = file.split(".");
                                    var piece = item + ";";
                                    code = code.replace(piece, "window.location.href = './view.html?id=" + queryString["id"] + "&f=" + "main." + encodeURIComponent(window.Base64.encode(splitFile[0])) + "-" + splitFile[1] + "';");
                                }
                            } else {
                                if (toQuotation.includes("/") === true) {
                                    var splitFolder = toQuotation.split("/");
                                    var folder = splitFolder[0];
                                    var file = splitFolder[1];
                                    var splitFile = file.split(".");
                                    var piece = item + ";";
                                    code = code.replace(piece, "window.location.href = './view.html?id="+ queryString["id"] + "&f=" + folder + "." + encodeURIComponent(window.Base64.encode(splitFile[0])) + "-" + splitFile[1] + "';");
                                } else {
                                    var file = toQuotation;
                                    var splitFile = file.split(".");
                                    var piece = item + ";";
                                    code = code.replace(piece, "window.location.href = './view.html?id=" + queryString["id"] +"&f=" + "main." + encodeURIComponent(window.Base64.encode(splitFile[0])) + "-" + splitFile[1] + "';");
                                }
                            }
                        }
                    } else {
                        return;
                    }
                })
                iframe.contentWindow.eval(code);
            }
        })
        if (window.resources.length !== 0) {
            window.resources.forEach((resource) => {
                if (resource[1] === "css") {
                    newResource = document.createElement("link");
            
                    newResource.rel = "stylesheet";
                    newResource.href = resource[0];
            
                    iframe.contentDocument.body.appendChild(newResource);
                } else if (resource[1] === "javascript") {
                    newResource = document.createElement("script");
            
                    newResource.src = resource[0];
            
                    iframe.contentDocument.body.appendChild(newResource);
                }
            })
        }
    } else if (window.cType === "html" && window.afs[window.s] !== undefined) {
        var url, filename, styl, count=-1, tds, tdf;
        iframe.contentDocument.body.innerHTML=decodeURIComponent(window.afs[window.s]);
        var scripts = iframe.contentDocument.getElementsByTagName('script');
        var styles = iframe.contentDocument.getElementsByTagName('link');
        Array.from({length: scripts.length}, () => {
            count += 1;
            if (scripts[count].hasAttribute('src')) {
                url = scripts[count].src;
                filename = url.substring(url.lastIndexOf('/')+1);
                tds = filename.split(".");
                tdf = window.Base64.encode(tds[0]) + "-" + tds[1];
                var code = window.afs[tdf];
                var a = code.split(";");
                a.forEach((item) => {
                    if (item.includes("alert") === true || item.includes("window.alert") === true) {
                        var toBracket = item.split("(")[1];
                        if (toBracket.includes("'") === true) {
                            var toQuotation1 = toBracket.split("'")[1];
                            var toQuotation2 = toQuotation1.split("'")[0];
                            alert(toQuotation2);
                            code = code.replace((item + ";"), "");
                        } else if (toBracket.includes('"') === true) {
                            var toQuotation1 = toBracket.split('"')[1];
                            var toQuotation2 = toQuotation1.split('"')[0];
                            alert(toQuotation2);
                            code = code.replace((item + ";"), "");
                        }
                    } else if (item.includes("window.location.replace") === true || item.includes("location.replace") === true) {
                        var toBracket = item.split("(")[1];
                        if (toBracket.includes("'") === true) {
                            var toQuotation1 = toBracket.split("'")[1];
                            var toQuotation2 = toQuotation1.split("'")[0];
                            if (toQuotation2.includes("./") === true) {
                                var splitDotSlash = toQuotation2.split("./")[1];
                                if (splitDotSlash.includes("/") === true) {
                                    var splitFolder = splitDotSlash.split("/");
                                    var folder = splitFolder[0];
                                    var file = splitFolder[1];
                                    var splitFile = file.split(".");
                                    var piece = item + ";";
                                    code = code.replace(piece, "window.location.replace('" + "./view.html?id=" + queryString["id"] + "&f=" + folder + "." + encodeURIComponent(window.Base64.encode(splitFile[0])) + "-" + splitFile[1] + "');");
                                } else {
                                    var file = splitDotSlash;
                                    var splitFile = file.split(".");
                                    var piece = item + ";";
                                    code = code.replace(piece, "window.location.replace('" + "./view.html?id=" + queryString["id"] + "&f=" + "main." + encodeURIComponent(window.Base64.encode(splitFile[0])) + "-" + splitFile[1] + "');");
                                }
                            } else {
                                if (toQuotation2.includes("/") === true) {
                                    var splitFolder = toQuotation2.split("/");
                                    var folder = splitFolder[0];
                                    var file = splitFolder[1];
                                    var splitFile = file.split(".");
                                    var piece = item + ";";
                                    code = code.replace(piece, "window.location.replace('" + "./view.html?id=" + queryString["id"] + "&f=" + folder + "." + encodeURIComponent(window.Base64.encode(splitFile[0])) + "-" + splitFile[1] + "');");
                                } else {
                                    var file = toQuotation2;
                                    var splitFile = file.split(".");
                                    var piece = item + ";";
                                    code = code.replace(piece, "window.location.replace('" + "./view.html?id=" + queryString["id"] + "&f=" + "main." + encodeURIComponent(window.Base64.encode(splitFile[0])) + "-" + splitFile[1] + "');");
                                }
                            }
                        } else if (toBracket.includes('"') === true) {
                            var toQuotation1 = toBracket.split('"')[1];
                            var toQuotation2 = toQuotation1.split('"')[0];
                            if (toQuotation2.includes("./") === true) {
                                var splitDotSlash = toQuotation2.split("./")[1];
                                if (splitDotSlash.includes("/") === true) {
                                    var splitFolder = splitDotSlash.split("/");
                                    var folder = splitFolder[0];
                                    var file = splitFolder[1];
                                    var splitFile = file.split(".");
                                    var piece = item + ";";
                                    code = code.replace(piece, "window.location.replace('" + "./view.html?id=" + queryString["id"] + "&f=" + folder + "." + encodeURIComponent(window.Base64.encode(splitFile[0])) + "-" + splitFile[1] + "');");
                                } else {
                                    var file = splitDotSlash;
                                    var splitFile = file.split(".");
                                    var piece = item + ";";
                                    code = code.replace(piece, "window.location.replace('" + "./view.html?id=" + queryString["id"] + "&f=" + "main." + encodeURIComponent(window.Base64.encode(splitFile[0])) + "-" + splitFile[1] + "');");
                                }
                            } else {
                                if (toQuotation2.includes("/") === true) {
                                    var splitFolder = toQuotation2.split("/");
                                    var folder = splitFolder[0];
                                    var file = splitFolder[1];
                                    var splitFile = file.split(".");
                                    var piece = item + ";";
                                    code = code.replace(piece, "window.location.replace('" + "./view.html?id=" + queryString["id"] + "&f=" + folder + "." + encodeURIComponent(window.Base64.encode(splitFile[0])) + "-" + splitFile[1] + "');");
                                } else {
                                    var file = toQuotation2;
                                    var splitFile = file.split(".");
                                    var piece = item + ";";
                                    code = code.replace(piece, "window.location.replace('" + "./view.html?id=" + queryString["id"] + "&f=" + "main." + encodeURIComponent(window.Base64.encode(splitFile[0])) + "-" + splitFile[1] + "');");
                                }
                            }
                        }
                    } else if (item.includes("location.href") === true || item.includes("window.location.href") === true) {
                        var toEqual = item.split("=")[1];
                        if (toEqual.includes("'") === true) {
                            var toQuotation = toEqual.split("'")[1];
                            alert(toQuotation);
                            if (toQuotation.includes("./") === true) {
                                var splitDotSlash = toQuotation.split("./")[1];
                                if (splitDotSlash.includes("/") === true) {
                                    var splitFolder = splitDotSlash.split("/");
                                    var folder = splitFolder[0];
                                    var file = splitFolder[1];
                                    var splitFile = file.split(".");
                                    var piece = item + ";";
                                    code = code.replace(piece, "window.location.href = './view.html?id=" + queryString["id"] + "&f=" + folder + "." + encodeURIComponent(window.Base64.encode(splitFile[0])) + "-" + splitFile[1] + "';");
                                } else {
                                    var file = splitDotSlash;
                                    var splitFile = file.split(".");
                                    var piece = item + ";";
                                    code = code.replace(piece, "window.location.href = './view.html?id=" + queryString["id"] + "&f=" + "main." + encodeURIComponent(window.Base64.encode(splitFile[0])) + "-" + splitFile[1] + "';");
                                }
                            } else {
                                if (toQuotation.includes("/") === true) {
                                    var splitFolder = toQuotation.split("/");
                                    var folder = splitFolder[0];
                                    var file = splitFolder[1];
                                    var splitFile = file.split(".");
                                    var piece = item + ";";
                                    code = code.replace(piece, "window.location.href = './view.html?id=" + queryString["id"] + "&f=" + folder + "." + encodeURIComponent(window.Base64.encode(splitFile[0])) + "-" + splitFile[1] + "';");
                                } else {
                                    var file = toQuotation;
                                    var splitFile = file.split(".");
                                    var piece = item + ";";
                                    code = code.replace(piece, "window.location.href = './view.html?id=" + queryString["id"] + "&f=" + "main." + encodeURIComponent(window.Base64.encode(splitFile[0])) + "-" + splitFile[1] + "';");
                                }
                            }
                        } else if (toEqual.includes('"') === true) {
                            var toQuotation = toEqual.split('"')[1];
                            if (toQuotation.includes("./") === true) {
                                var splitDotSlash = toQuotation.split("./")[1];
                                if (splitDotSlash.includes("/") === true) {
                                    var splitFolder = splitDotSlash.split("/");
                                    var folder = splitFolder[0];
                                    var file = splitFolder[1];
                                    var splitFile = file.split(".");
                                    var piece = item + ";";
                                    code = code.replace(piece, "window.location.href = './view.html?id=" + queryString["id"] + "&f=" + folder + "." + encodeURIComponent(window.Base64.encode(splitFile[0])) + "-" + splitFile[1] + "';");
                                } else {
                                    var file = splitDotSlash;
                                    var splitFile = file.split(".");
                                    var piece = item + ";";
                                    code = code.replace(piece, "window.location.href = './view.html?id=" + queryString["id"] + "&f=" + "main." + encodeURIComponent(window.Base64.encode(splitFile[0])) + "-" + splitFile[1] + "';");
                                }
                            } else {
                                if (toQuotation.includes("/") === true) {
                                    var splitFolder = toQuotation.split("/");
                                    var folder = splitFolder[0];
                                    var file = splitFolder[1];
                                    var splitFile = file.split(".");
                                    var piece = item + ";";
                                    code = code.replace(piece, "window.location.href = './view.html?id="+ queryString["id"] + "&f=" + folder + "." + encodeURIComponent(window.Base64.encode(splitFile[0])) + "-" + splitFile[1] + "';");
                                } else {
                                    var file = toQuotation;
                                    var splitFile = file.split(".");
                                    var piece = item + ";";
                                    code = code.replace(piece, "window.location.href = './view.html?id=" + queryString["id"] +"&f=" + "main." + encodeURIComponent(window.Base64.encode(splitFile[0])) + "-" + splitFile[1] + "';");
                                }
                            }
                        }
                    } else {
                        return;
                    }
                })
                iframe.contentWindow.eval(code);
            } else {
                iframe.contentWindow.eval(scripts[count].innerHTML);
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
                    tdf = window.Base64.encode(tds[0]) + "-" + tds[1];
                    styl = document.createElement('style');
                    styl.innerHTML = decodeURIComponent(window.afs[tds]);
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
    window.afs[window.sf][window.s] = window.editor.getValue();
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
    if (Data.settings !== undefined && Data.settings !== null && Data.settings !== "") {
        settings = Data.settings;
    }
    if (settings !== undefined) {
      splitData.forEach((data) => {
          var splitAccountData = data.split(":");
          if (splitAccountData[0] === getCookie("li")) {
            if (settings["Editor Access"] === "Only Me") {
                var sad = splitData[0].split(":");
                if (sad[0] === getCookie("li")) {
                    // Do Nothing
                } else {
                    alert("wrong user logged in.");
                    window.location.replace("./index.html");
                }
            }
            if (settings["Compressed"] === "true" && Data["compressed"] === "true") {
                window.fls = JSON.parse(window.LZString.decompress(window.Base64.decode(Data["afs"])));
            } else {
                window.fls = Data["afs"];
            }
            if (settings["Compressed"] === "true" && Data["compressed"] === "true") {
                window.resources = JSON.parse(window.LZString.decompress(window.Base64.decode(Data.sources)));
            } else {
                window.resources = Data.sources;
            }
            if (window.fls !== undefined && window.fls !== "" && window.fls["main"] !== undefined) { 
                var keys = Object.keys(window.fls);
                keys.forEach((folder) => {
                    window.afs[folder] = window.fls[folder];
                    
                    var newOpt = document.createElement("option");
                    
                    newOpt.innerHTML = folder;
                    document.querySelector(".folder-picker").appendChild(newOpt);
                })
                
                var flz = Object.keys(window.afs[document.querySelector(".folder-picker").options[document.querySelector(".folder-picker").selectedIndex].innerHTML]);
                
                flz.forEach((file) => {
                    var newOption;
                    var splitType = file.split("-");
                    if (splitType[1] === "html") {
                        newOption = document.createElement("option");
                    
                        newOption.innerHTML = window.Base64.decode(splitType[0]) + "." + splitType[1];
                        newOption.value = "32";
                    
                        document.querySelector(".language-picker").appendChild(newOption);
                    } else if (splitType[1] === "css") {
                        newOption = document.createElement("option");
                    
                        newOption.innerHTML = window.Base64.decode(splitType[0]) + "." + splitType[1];
                        newOption.value = "13";
                    
                        document.querySelector(".language-picker").appendChild(newOption);
                    } else if (splitType[1] === "js") {
                        newOption = document.createElement("option");
                    
                        newOption.innerHTML = window.Base64.decode(splitType[0]) + "." + splitType[1];
                        newOption.value = "35";
                    
                        document.querySelector(".language-picker").appendChild(newOption);
                    }
                })
                document.getElementById("editor").innerHTML = "<h1 style='text-align: center;'>No file selected.</h1>";
                document.getElementById("createFile").style.display = "";
                document.querySelector(".language-picker").style.display = "";
                document.querySelector(".folder-picker").style.display = "";
                document.querySelector(".language-picker").style.display = "";
                document.querySelector(".btn-dark-light").style.display = "";
                window.sf = document.querySelector(".folder-picker").options[document.querySelector(".folder-picker").selectedIndex].innerHTML;
                window.loadEditor();
                document.getElementById("link").href = "./view.html?id=" + queryString["id"] + "&f=" + encodeURIComponent(window.sf) + "." + encodeURIComponent(window.s);
                document.getElementById("link").target = "_blank";
                document.getElementById("link").innerHTML = document.getElementById("link").href;
                document.getElementById("link").rel = "noopener noreferrer";
                if (settings["Autosave"] === "true") {
                    clearInterval(window.auto);
                    window.auto = setInterval(saveCode, 30000);
                }
                settingsBtn.style.display = "";
                if (document.querySelector(".language-picker").options.length !== 0) {
                    var td = document.querySelector(".language-picker").options[document.querySelector(".language-picker").selectedIndex].innerHTML;
                    var tds = td.split(".");
                    window.s = window.Base64.encode(tds[0]) + "-" + tds[1];
                    window.loadEditor();
                    document.getElementById("deleteFile").style.display = "";
                } else {
                    window.s = "";
                    document.getElementById("deleteFile").style.display = "none";
                }
            } else if (window.fls !== undefined && window.fls !== "") {
                var keys = Object.keys(window.fls);
                var newOpt = document.createElement("option");
                
                newOpt.innerHTML = "main";
                
                document.querySelector(".folder-picker").appendChild(newOpt);
                window.afs["main"] = {};
                keys.forEach((file) => {
                    window.afs["main"][file] = Data[file];
                    var newOption;
                    var splitType = file.split("-");
                    if (splitType[1] === "html") {
                        newOption = document.createElement("option");
                    
                        newOption.innerHTML = window.Base64.decode(splitType[0]) + "." + splitType[1];
                        newOption.value = "32";
                    
                        document.querySelector(".language-picker").appendChild(newOption);
                    } else if (splitType[1] === "css") {
                        newOption = document.createElement("option");
                    
                        newOption.innerHTML = window.Base64.decode(splitType[0]) + "." + splitType[1];
                        newOption.value = "13";
                    
                        document.querySelector(".language-picker").appendChild(newOption);
                    } else if (splitType[1] === "js") {
                        newOption = document.createElement("option");
                    
                        newOption.innerHTML = window.Base64.decode(splitType[0]) + "." + splitType[1];
                        newOption.value = "35";
                    
                        document.querySelector(".language-picker").appendChild(newOption);
                    }
                })
                window.sf = document.querySelector(".folder-picker").options[document.querySelector(".folder-picker").selectedIndex].innerHTML;
                if (document.querySelector(".language-picker").options.length !== 0) {
                    var td = document.querySelector(".language-picker").options[document.querySelector(".language-picker").selectedIndex].innerHTML;
                    var tds = td.split(".");
                    window.s = window.Base64.encode(tds[0]) + "-" + tds[1];
                    document.getElementById("deleteFile").style.display = "";
                    window.loadEditor();
                } else {
                    window.s = "";
                    document.getElementById("deleteFile").style.display = "none";
                }
                document.getElementById("editor").innerHTML = "<h1 style='text-align: center;'>No file selected.</h1>";
                document.getElementById("createFile").style.display = "";
                document.querySelector(".language-picker").style.display = "";
                document.querySelector(".folder-picker").style.display = "";
                document.querySelector(".language-picker").style.display = "";
                document.querySelector(".btn-dark-light").style.display = "";
                document.getElementById("link").href = "./view.html?id=" + queryString["id"] + "&f=" + encodeURIComponent(window.sf) + "." + encodeURIComponent(window.s);
                document.getElementById("link").target = "_blank";
                document.getElementById("link").innerHTML = document.getElementById("link").href;
                document.getElementById("link").rel = "noopener noreferrer";
                if (settings["Autosave"] === "true") {
                    clearInterval(window.auto);
                    window.auto = setInterval(saveCode, 30000);
                }
                settingsBtn.style.display = "";
            } else {
                var newOpt = document.createElement("option");
                
                newOpt.innerHTML = "main";
                
                document.querySelector(".folder-picker").appendChild(newOpt);
                window.afs["main"] = {};
                settingsBtn.style.display = "";
                document.querySelector(".folder-picker").style.display = "";
                window.sf = document.querySelector(".folder-picker").options[document.querySelector(".folder-picker").selectedIndex].innerHTML;
                document.getElementById("editor").innerHTML = "<h1 style='text-align: center;'>No file selected.</h1>";
                document.getElementById("createFile").style.display = "";
                document.getElementById("addResource").style.display = "none";
                document.getElementById("removeSources").style.display = "none";
                document.getElementById("deleteFile").style.display = "none";
                document.querySelector(".language-picker").style.display = "none";
                document.querySelector(".btn-dark-light").style.display = "none";
                settings.style.display = "";
                if (settings["Autosave"] === "true") {
                    clearInterval(window.auto)
                    window.auto = setInterval(saveCode, 30000);
                }
            }
          }
      })
      
      if (window.rat === false) {
          alert("wrong user logged in.");
          window.location.replace("./index.html");
      }
    } else {
        settings = {
            "Preserve Editor": "false",
            "Editor Access": "Shared With",
            "Preview Visibility": "Shared With",
            "Autosave": "false",
            "Compressed": "false"
        }
        validate(Data);
    }
  }
  
  function saveCode() {
      var coded = window.Base64.encode(window.LZString.compress(JSON.stringify(window.afs)));
      saveBtn.src = "https://cdn-icons-png.flaticon.com/512/2767/2767294.png";
      var safs = JSON.stringify(window.afs);
      var count, keys = Object.keys(window.afs);
      var fls = [];
      var data = {};
      if (settings["Compressed"] === "true" && window.afs !== undefined && window.afs !== "" && window.afs !== null && window.afs !== {}) {
          data["afs"] = window.Base64.encode(window.LZString.compress(JSON.stringify(window.afs)));
          var decoded = window.Base64.decode(coded);
          data["sources"] = window.Base64.encode(window.LZString.compress(JSON.stringify(window.resources)));
          data["settings"] = window.settings;
          data["compressed"] = "true";
          var finishedData = JSON.stringify(data);
      } else if (window.afs !== undefined && window.afs !== "" && window.afs !== {} && window.afs !== null) {
        data["sources"] = window.resources;
        data["afs"] = window.afs;
        data["settings"] = settings;
        data["compressed"] = "false";
        var finishedData = JSON.stringify(data);
      } else {
          data["sources"] = window.resources;
          data["afs"] = "";
          data["settings"] = settings;
          data["compressed"] = "false";
          
          var finishedData = JSON.stringify(data);
      }
      
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
      
      xhr2.send(finishedData);
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

document.querySelector(".folder-picker").onchange = function() {
    window.sf = document.querySelector(".folder-picker").options[document.querySelector(".folder-picker").selectedIndex].innerHTML;
    document.querySelector(".language-picker").innerHTML = "";
    var files = Object.keys(window.afs[window.sf]);
    files.forEach((file) => {
        var newOption;
        var splitType = file.split("-");
        if (splitType[1] === "html") {
            newOption = document.createElement("option");
            
            newOption.innerHTML = window.Base64.decode(splitType[0]) + "." + splitType[1];
            newOption.value = "32";
                    
            document.querySelector(".language-picker").appendChild(newOption);
        } else if (splitType[1] === "css") {
            newOption = document.createElement("option");
                    
            newOption.innerHTML = window.Base64.decode(splitType[0]) + "." + splitType[1];
            newOption.value = "13";
                    
            document.querySelector(".language-picker").appendChild(newOption);
        } else if (splitType[1] === "js") {
            newOption = document.createElement("option");
                    
            newOption.innerHTML = window.Base64.decode(splitType[0]) + "." + splitType[1];
            newOption.value = "35";
                    
            document.querySelector(".language-picker").appendChild(newOption);
        }
    })
    
    if (document.querySelector(".language-picker").options.length !== 0) {
        var slcted = document.querySelector(".language-picker").options[document.querySelector(".language-picker").selectedIndex].innerHTML;
        var sSplit = slcted.split(".");
        window.s = window.Base64.encode(sSplit[0]) + "-" + sSplit[1];
        
        document.getElementById("editor").innerHTML = "";
        window.loadEditor();
        
        document.getElementById("deleteFile").style.display = "";
    } else {
        window.s = "";
        document.getElementById("editor").innerHTML = "<h1 style='text-align: center;'>No file selected.</h1>";
        document.getElementById("deleteFile").style.display = "none";
    }
}

document.querySelector(".language-picker").onchange = function() {
    var td = document.querySelector(".language-picker").options[document.querySelector(".language-picker").selectedIndex].innerHTML;
    var tds = td.split(".");
    window.s = window.Base64.encode(tds[0]) + "-" + tds[1];
    window.cType = window.MODES[this.options[this.selectedIndex].value].modeId;
    window.loadSample(window.MODES[this.options[this.selectedIndex].value]);
    if (window.cType === "css") {
        document.getElementById("deleteFile").style.display = "";
        document.querySelector(".language-picker").style.display = "";
        document.getElementById("createFile").style.display = "";
        document.querySelector(".btn-dark-light").style.display = "";
        document.getElementById("addResource").style.display = "";
        document.getElementById("removeSources").style.display = "";
    } else if (window.cType === "javascript") {
        document.querySelector(".language-picker").style.display = "";
        document.getElementById("deleteFile").style.display = "";
        document.getElementById("createFile").style.display = "";
        document.querySelector(".btn-dark-light").style.display = "";
        document.getElementById("addResource").style.display = "";
        document.getElementById("removeSources").style.display = "";
    } else {
        document.querySelector(".language-picker").style.display = "";
        document.getElementById("deleteFile").style.display = "";
        document.querySelector(".btn-dark-light").style.display = "";
        document.getElementById("createFile").style.display = "";
        document.getElementById("addResource").style.display = "none";
        document.getElementById("removeSources").style.display = "none";
        document.getElementById("link").href = "./view.html?id=" + queryString["id"] + "&f=" + encodeURIComponent(window.sf) + "." + encodeURIComponent(window.s);
        document.getElementById("link").target = "_blank";
        document.getElementById("link").innerHTML = document.getElementById("link").href;
        document.getElementById("link").rel = "noopener noreferrer";
    }
}

settingsBtn.onclick = function() {
    var e = document.getElementById("editor");
    
    window.clearEditor = function() {
        e.innerHTML = "";
        window.loadEditor();
    }
    
    e.innerHTML = "<button class='btn' onclick='window.clearEditor()'>X</button><br><br>";
    
    var sdiv = document.createElement("div"),
    options = {
        "Preserve Editor": ["true", "false"],
        "Editor Access": ["Only Me", "Shared With"],
        "Preview Visibility": ["Only Me", "Shared With"],
        "Autosave": ["true", "false"],
        "Compressed": ["true", "false"]
    },
    okeys = Object.keys(options);
    
    sdiv.style.width="100%";
    sdiv.style.height="100%";
    
    okeys.forEach((option) => {
        var name = document.createElement("p");
        var split = document.createElement("br");
        var select = document.createElement("select");
        var selections = options[option];
        
        selections.forEach((selection) => {
            var s = document.createElement("option");
            
            s.innerHTML = selection;
            s.value = option;
            if (settings[option] === selection) {
                s.selected = true;
            }
            
            select.appendChild(s);
        })
        
        select.onchange = function() {
            settings[this.options[this.selectedIndex].value] = this.options[this.selectedIndex].innerHTML;
            if (settings["Autosave"] === "true") {
                clearInterval(window.auto);
                window.auto = setInterval(saveCode, 30000);
            } else {
                clearInterval(window.auto);
            }
            saveCode();
        }
        
        name.innerHTML = "<b>" + option + ": </b>";
        
        name.appendChild(select);
        e.appendChild(name);
        e.appendChild(split);
    })
}

document.getElementById("deleteFile").onclick = function() {
    var uinput = confirm("Do you want to delete this file?");
    
    if (uinput === true) {
        delete window.afs[window.sf][window.s];
    
        var f = document.querySelector(".language-picker").options[document.querySelector(".language-picker").selectedIndex];
    
        document.querySelector(".language-picker").removeChild(f);
    
        if (document.querySelector(".language-picker").options.length !== 0) {
            var slcted = document.querySelector(".language-picker").options[document.querySelector(".language-picker").selectedIndex].innerHTML;
            var sSplit = slcted.split(".");
            window.s = window.Base64.encode(sSplit[0]) + "-" + sSplit[1];
        
            document.getElementById("editor").innerHTML = "";
            window.loadEditor();
        
            document.getElementById("deleteFile").style.display = "";
        } else {
            window.s = "";
            document.getElementById("editor").innerHTML = "<h1 style='text-align: center;'>No file selected.</h1>";
            document.getElementById("deleteFile").style.display = "none";
        }
    } else {
        // Do Nothing
    }
}
