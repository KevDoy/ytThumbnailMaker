import { getSettings } from '../defaults.js';
import { bgImageSwap } from './script.js';    themeColor: '#137AC5',

function loadBackgroundImages() {
    const settings = getSettings();
    const container = document.getElementById('bgSelectorImages');
    const loadingOverlay = document.getElementById('loadingOverlay');
    const randomizeToggle = document.getElementById('randomizeToggle');
    let currentImage = 1;
    let loadedImages = [];
    
    // Set initial state from settings
    randomizeToggle.checked = settings.randomizeBackgrounds;    themeColor: Cookies.get('themeColor') || defaultSettings.themeColor,
    okies.get('randomizeBackgrounds') !== 'false',
    // Add toggle event listener
    randomizeToggle.addEventListener('change', function() {
        Cookies.set('randomizeBackgrounds', this.checked, { expires: 7 });efaultSettings.defaultSubtitle,
        location.reload(); gradientOpacity: defaultSettings.gradientOpacity,
    });    overlayOpacity: defaultSettings.overlayOpacity
    
    function tryLoadImage(index) {        const img = document.createElement('img');        img.src = `backgrounds/${index}.jpg`;                img.onload = function() {            loadedImages.push(img);                        img.onclick = function() {                bgImageSwap(`backgrounds/${index}.jpg`);            };            img.setAttribute('data-bs-dismiss', 'modal');                        tryLoadImage(index + 1);        };                img.onerror = function() {            console.log(`Found ${loadedImages.length} background images`);                        if (settings.randomizeBackgrounds) {                // Randomize array using Fisher-Yates shuffle                for (let i = loadedImages.length - 1; i > 0; i--) {                    const j = Math.floor(Math.random() * (i + 1));                    [loadedImages[i], loadedImages[j]] = [loadedImages[j], loadedImages[i]];                }            }                        // Add images to container            loadedImages.forEach(img => {                container.appendChild(img);            });                        loadingOverlay.style.display = 'none';        };    }        // Start loading images from 1    tryLoadImage(1);}// Initialize when DOM is readydocument.addEventListener('DOMContentLoaded', loadBackgroundImages);