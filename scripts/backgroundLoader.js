function loadBackgroundImages() {
    const container = document.getElementById('bgSelectorImages');
    const loadingOverlay = document.getElementById('loadingOverlay');
    const randomizeToggle = document.getElementById('randomizeToggle');
    let currentImage = 1;
    let loadedImages = [];
    
    // Get current randomize setting from cookie
    const shouldRandomize = Cookies.get('randomizeBackgrounds') !== 'false';
    randomizeToggle.checked = shouldRandomize;
    
    // Set up toggle listener for live reordering
    randomizeToggle.addEventListener('change', function() {
        Cookies.set('randomizeBackgrounds', this.checked);
        
        // Clear container
        while (container.firstChild) {
            container.removeChild(container.firstChild);
        }
        
        // Re-order and append images
        if (this.checked) {
            // Shuffle array
            for (let i = loadedImages.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [loadedImages[i], loadedImages[j]] = [loadedImages[j], loadedImages[i]];
            }
        } else {
            // Sort by original index
            loadedImages.sort((a, b) => a.dataset.index - b.dataset.index);
        }
        
        // Add images back to container
        loadedImages.forEach(img => container.appendChild(img));
        
        // Announce change to screen readers
        if (typeof announceToScreenReader === 'function') {
            announceToScreenReader(this.checked ? 'Background images randomized' : 'Background images sorted sequentially');
        }
    });
    
    function tryLoadImage(index) {
        const img = document.createElement('img');
        img.src = `backgrounds/${index}.jpg`;
        img.dataset.index = index; // Store original order
        img.alt = `Background option ${index}`;
        img.role = 'button';
        img.tabIndex = 0;
        img.setAttribute('aria-label', `Select background image ${index}`);
        
        img.onload = function() {
            loadedImages.push(img);
            img.onclick = function() {
                bgImageSwap(`backgrounds/${index}.jpg`);
            };
            img.onkeydown = function(e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    bgImageSwap(`backgrounds/${index}.jpg`);
                }
            };
            img.setAttribute('data-bs-dismiss', 'modal');
            tryLoadImage(index + 1);
        };
        
        img.onerror = function() {
            if (loadedImages.length > 0) {
                console.log(`Found ${loadedImages.length} background images`);
                
                if (shouldRandomize) {
                    for (let i = loadedImages.length - 1; i > 0; i--) {
                        const j = Math.floor(Math.random() * (i + 1));
                        [loadedImages[i], loadedImages[j]] = [loadedImages[j], loadedImages[i]];
                    }
                }
                
                loadedImages.forEach(img => container.appendChild(img));
                loadingOverlay.style.display = 'none';
                
                // Announce completion to screen readers
                if (typeof announceToScreenReader === 'function') {
                    announceToScreenReader(`${loadedImages.length} background images loaded`);
                }
            }
        };
    }
    
    // Start loading images
    tryLoadImage(1);
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', loadBackgroundImages);