// html2canvas <- https://html2canvas.hertzen.com/dist/html2canvas.min.js

// code reference: https://stackoverflow.com/questions/31656689/how-to-save-img-to-users-local-computer-using-html2canvas

setUpDownloadPageAsImage();

function setUpDownloadPageAsImage() {
  document.getElementById("download-page-as-image").addEventListener("click", function() {
    const content = document.getElementById("content");
    const saveOverlay = document.getElementById("saveOverlay");
    
    // Show loading overlay
    saveOverlay.style.display = 'flex';
    
    // Temporarily remove scaling but maintain position
    content.classList.remove("smallscale");
    
    html2canvas(content, {
      width: 1920,
      height: 1080,
      scale: 1,
      useCORS: true,
      allowTaint: true,
      onclone: function(clonedDoc) {
        const clonedContent = clonedDoc.getElementById("content");
        clonedContent.style.transform = 'none';
        clonedContent.style.width = '1920px';
        clonedContent.style.height = '1080px';
      }
    }).then(function(canvas) {
      // Force the canvas to be 1920x1080
      const finalCanvas = document.createElement('canvas');
      finalCanvas.width = 1920;
      finalCanvas.height = 1080;
      const ctx = finalCanvas.getContext('2d');
      ctx.drawImage(canvas, 0, 0, 1920, 1080);
      
      // Changed to JPG with 0.9 quality for file size optimization
      simulateDownloadImageClick(finalCanvas.toDataURL('image/jpeg', 0.9), 'YtThumbnail.jpg');
      
      // Restore original scale
      content.classList.add("smallscale");
      
      // Hide loading overlay
      saveOverlay.style.display = 'none';
    }).catch(function(error) {
      console.error('Error generating thumbnail:', error);
      saveOverlay.style.display = 'none';
      alert('There was an error generating your thumbnail. Please try again.');
    });
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
    const logo = document.getElementById('canvasLogo');
    const checkbox = document.getElementById('mainLogoCheckbox');
    
    if (checkbox.checked) {
        logo.style.display = 'block';
        Cookies.set('logoVisible', 'true', { expires: 7 });
    } else {
        logo.style.display = 'none';
        Cookies.set('logoVisible', 'false', { expires: 7 });
    }
}

function checkLogoCookie() {
    const logoVisible = Cookies.get('logoVisible');
    const checkbox = document.getElementById('mainLogoCheckbox');
    const logo = document.getElementById('canvasLogo');
    
    if (logoVisible === 'false') {
        checkbox.checked = false;
        logo.style.display = 'none';
    } else {
        checkbox.checked = true;
        logo.style.display = 'block';
    }
}

function replaceText() {
    const mainTitle = document.getElementById('mainTitleSelect').value;
    const subTitle = document.getElementById('subTitleSelect').value;
    
    document.getElementById('reptitle').textContent = mainTitle || 'Main Title';
    document.getElementById('dashtitle').textContent = subTitle || 'Subtitle';
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


var img = $("#content-container");
function bgImageSwap(image) {
  img.attr("style", "background: url('" + image + "') no-repeat top center");
}


