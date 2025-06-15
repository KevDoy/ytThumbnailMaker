// html2canvas <- https://html2canvas.hertzen.com/dist/html2canvas.min.js

// code reference: https://stackoverflow.com/questions/31656689/how-to-save-img-to-users-local-computer-using-html2canvas

setUpDownloadPageAsImage();

function setUpDownloadPageAsImage() {
  document.getElementById("download-page-as-image").addEventListener("click", function() {
    announceToScreenReader("Generating thumbnail, please wait...");
    
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
      
      announceToScreenReader("Thumbnail generated successfully, download starting");
      
    }).catch(function(error) {
      console.error('Error generating thumbnail:', error);
      saveOverlay.style.display = 'none';
      content.classList.add("smallscale");
      handleAccessibleError('There was an error generating your thumbnail. Please try again.');
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
    
    console.log('showLogo called', { logo, checkbox, checked: checkbox?.checked });
    
    if (!logo || !checkbox) {
        console.error('Logo or checkbox element not found');
        return;
    }
    
    if (checkbox.checked) {
        logo.style.setProperty('display', 'block', 'important');
        logo.style.setProperty('visibility', 'visible', 'important');
        logo.style.setProperty('opacity', '1', 'important');
        Cookies.set('logoVisible', 'true', { expires: 7 });
        console.log('Logo should be visible now');
    } else {
        logo.style.setProperty('display', 'none', 'important');
        logo.style.setProperty('visibility', 'hidden', 'important');
        logo.style.setProperty('opacity', '0', 'important');
        Cookies.set('logoVisible', 'false', { expires: 7 });
        console.log('Logo should be hidden now');
    }
}

function checkLogoCookie() {
    const logoVisible = Cookies.get('logoVisible');
    const checkbox = document.getElementById('mainLogoCheckbox');
    const logo = document.getElementById('canvasLogo');
    
    console.log('checkLogoCookie called', { logoVisible, checkbox, logo });
    
    if (!checkbox || !logo) {
        console.error('Checkbox or logo element not found in checkLogoCookie');
        return;
    }
    
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



$("input[type='file']").change(function (e) {

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
  console.log('bgImageSwap called with:', image);
  
  // Store the new background image - just update the background property through updateGradientColor
  // Don't set backgroundImage directly as it conflicts with gradients
  
  // Store the image URL for the gradient function to use
  const container = document.getElementById('content-container');
  if (container) {
    // Set a data attribute to store the current background image
    container.setAttribute('data-bg-image', image);
    
    // Reapply the current gradient settings which will include the new background
    const colorPicker = document.getElementById('themeColorPicker');
    const gradientToggle = document.getElementById('showGradientToggle');
    if (colorPicker && gradientToggle) {
      console.log('Reapplying gradient with new background:', colorPicker.value, gradientToggle.checked);
      updateGradientColor(colorPicker.value, gradientToggle.checked);
    }
  } else {
    console.error('Container not found!');
  }
}

function initializeThemeColor() {
    const colorPicker = document.getElementById('themeColorPicker');
    const gradientToggle = document.getElementById('showGradientToggle');
    const savedColor = Cookies.get('themeColor') || '#137AC5';
    const showGradient = Cookies.get('showGradient') !== 'false';
    
    // Set initial states
    colorPicker.value = savedColor;
    gradientToggle.checked = showGradient;
    updateGradientColor(savedColor, showGradient);
    
    // Handle color changes
    colorPicker.addEventListener('change', function(e) {
        const newColor = e.target.value;
        Cookies.set('themeColor', newColor, { expires: 7 });
        updateGradientColor(newColor, gradientToggle.checked);
    });
    
    // Handle gradient toggle
    gradientToggle.addEventListener('change', function() {
        Cookies.set('showGradient', this.checked, { expires: 7 });
        updateGradientColor(colorPicker.value, this.checked);
    });
}

function updateGradientColor(color, showGradient) {
    const container = document.getElementById('content-container');
    const gradientOverlay = document.querySelector('.grad-float');
    
    // Get current background image from data attribute or style
    let currentBg = '';
    const storedBg = container.getAttribute('data-bg-image');
    if (storedBg) {
        currentBg = `url('${storedBg}')`;
    } else {
        const bgImage = container.style.backgroundImage;
        if (bgImage && bgImage !== 'none' && bgImage.includes('url(')) {
            currentBg = bgImage;
        } else {
            currentBg = 'url("background-default.jpg")';
        }
    }
    
    // Convert hex to rgba
    const r = parseInt(color.substr(1,2), 16);
    const g = parseInt(color.substr(3,2), 16);
    const b = parseInt(color.substr(5,2), 16);
    
    if (showGradient) {
        // Use container gradient for the background + gradient combo - limit to half width
        container.style.background = `radial-gradient(circle at left, rgba(${r},${g},${b},0.7) 0%, rgba(255,255,255,0) 50%), ${currentBg}`;
        // Also use overlay gradient for additional depth - limit to half width
        if (gradientOverlay) {
            gradientOverlay.style.background = `radial-gradient(circle at left, rgba(${Math.floor(r*0.7)},${Math.floor(g*0.7)},${Math.floor(b*0.7)},0.8) 0%, rgba(0,0,0,0) 25%, rgba(0, 0, 0,0) 50%)`;
        }
    } else {
        // Clear both gradients when disabled
        container.style.background = currentBg;
        if (gradientOverlay) {
            gradientOverlay.style.background = 'none';
        }
    }
    
    // Ensure background properties are maintained
    container.style.backgroundRepeat = 'no-repeat';
    container.style.backgroundPosition = 'top center';
    container.style.backgroundSize = 'cover';
}

// Accessibility functions
function announceToScreenReader(message) {
  const announcement = document.createElement('div');
  announcement.setAttribute('aria-live', 'polite');
  announcement.setAttribute('aria-atomic', 'true');
  announcement.className = 'sr-only';
  announcement.textContent = message;
  document.body.appendChild(announcement);
  
  setTimeout(() => {
    if (document.body.contains(announcement)) {
      document.body.removeChild(announcement);
    }
  }, 1000);
}

// Keyboard navigation support
document.addEventListener('keydown', function(e) {
  // ESC key closes modals
  if (e.key === 'Escape') {
    const openModal = document.querySelector('.modal.show');
    if (openModal) {
      const modal = bootstrap.Modal.getInstance(openModal);
      if (modal) {
        modal.hide();
      }
    }
  }
});

// Enhanced error handling with announcements
function handleAccessibleError(message) {
  announceToScreenReader(message);
  console.error(message);
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    initializeThemeColor();
    // Ensure logo functionality works on page load
    setTimeout(checkLogoCookie, 100);
});


