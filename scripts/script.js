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
  } else {
    canvaslogov.style.display = "none";
  }
}

function replaceText() {
  var mainTitleValue = document.getElementById('mainTitleSelect');
  var subTitleValue = document.getElementById('subTitleSelect');
  var mainTitleCanvas = document.getElementById('reptitle');
  var subTitleCanvas = document.getElementById('dashtitle');

  
  mainTitleCanvas.innerHTML = mainTitleSelect.value;
  dashtitle.innerHTML = subTitleSelect.value;
}