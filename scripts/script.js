// html2canvas <- https://html2canvas.hertzen.com/dist/html2canvas.min.js

// code reference: https://stackoverflow.com/questions/31656689/how-to-save-img-to-users-local-computer-using-html2canvas

setUpDownloadPageAsImage();

function setUpDownloadPageAsImage() {
  document.getElementById("download-page-as-image").addEventListener("click", function() {
    $("#content").removeClass("smallscale");
    $("#content").addClass("exportScale");
    html2canvas(document.getElementById("content")).then(function(canvas) {
      console.log(canvas);
      simulateDownloadImageClick(canvas.toDataURL(), 'YtThumbnail.png');
    });
    $("#content").removeClass("exportScale");
    $("#content").addClass("smallscale");
  });
}

function simulateDownloadImageClick(uri, filename) {
  var link = document.createElement('a');
  if (typeof link.download !== 'string') {
    window.open(uri);
  } else {
    link.href = uri;
    link.download = filename;
    accountForFirefox(clickLink, link);
  }
}

function clickLink(link) {
  link.click();
}

function accountForFirefox(click) { // wrapper function
  let link = arguments[1];
  document.body.appendChild(link);
  click(link);
  document.body.removeChild(link);
}


function showLogo() {
  // Get the checkbox
  var checkBox = document.getElementById("logoCheckbox");
  // Get the output text
  var canvaslogov = document.getElementById("canvasLogo");

  // If the checkbox is checked, display the output text
  if (checkBox.checked == true){
    canvaslogov.style.display = "block";
    Cookies.set('logo', '1');
  } else {
    canvaslogov.style.display = "none";
    Cookies.set('logo', '0');
  }
}

function checkLogoCookie() {
  var cookieValue = Cookies.get('logo');
  var canvaslogov = document.getElementById("canvasLogo");
  if (cookieValue == 0) {
    document.getElementById("logoCheckbox").checked = false;
    canvaslogov.style.display = "none";
  } else {
    document.getElementById("logoCheckbox").checked = true;
  };
}

function replaceText() {
  var mainTitleValue = document.getElementById('mainTitleSelect');
  var subTitleValue = document.getElementById('subTitleSelect');
  var mainTitleCanvas = document.getElementById('reptitle');
  var subTitleCanvas = document.getElementById('dashtitle');

  
  mainTitleCanvas.innerHTML = mainTitleSelect.value;
  dashtitle.innerHTML = subTitleSelect.value;
}


function youtubeUrlParser(url) {
  
  var timeToSec = function(str) {
    var sec = 0;
    if (/h/.test(str)) { sec += parseInt(str.match(/(\d+)h/,'$1')[0],10) * 60 * 60; }
    if (/m/.test(str)) { sec += parseInt(str.match(/(\d+)m/,'$1')[0],10) * 60; }
    if (/s/.test(str)) { sec += parseInt(str.match(/(\d+)s/,'$1')[0],10); }
    return sec;
  };
  
  var videoId = /^https?\:\/\/(www\.)?youtu\.be/.test(url) ? url.replace(/^https?\:\/\/(www\.)?youtu\.be\/([\w-]{11}).*/,"$2") : url.replace(/.*\?v\=([\w-]{11}).*/,"$1");
  var videoStartTime = /[^a-z]t\=/.test(url) ? url.replace(/^.+t\=([\dhms]+).*$/,'$1') : 0;
  var videoStartSeconds = videoStartTime ? timeToSec(videoStartTime) : 0;
  var videoShowRelated = ~~/rel\=1/.test(url);
  

  console.log(videoId);
  bgImageSwap('https://img.youtube.com/vi/' + videoId +  '/hq720.jpg');


  
}; // youtubeParser();



$("input").change(function (e) {

  for (var i = 0; i < e.originalEvent.srcElement.files.length; i++) {

    var file = e.originalEvent.srcElement.files[i];

    var img = $("#content-container");
    var reader = new FileReader();
    reader.onloadend = function () {
      img.attr("style", "background: radial-gradient(circle at left, rgba(19,122,197,0.7) 0%, rgba(255,255,255,0) 100%), url('" + reader.result + "') no-repeat top center");

    }
    reader.readAsDataURL(file);
    $("#afterthis").after(img);
  }
});

/* Randomize Background */ 
$(function () {
  var parent = $("#bgSelectorImages");
  var divs = parent.children();
  while (divs.length) {
    parent.append(divs.splice(Math.floor(Math.random() * divs.length), 1)[0]);
  }
});


var img = $("#content-container");
function bgImageSwap(image) {
  img.attr("style", "background: url('" + image + "') no-repeat top center");
}


