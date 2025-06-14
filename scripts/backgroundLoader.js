function loadBackgroundImages() {
    const container = document.getElementById('bgSelectorImages');
    const loadingOverlay = document.getElementById('loadingOverlay');
    const randomizeToggle = document.getElementById('randomizeToggle');
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
    });
    
    function tryLoadImage(index) {
        const img = document.createElement('img');
        img.src = `backgrounds/${index}.jpg`;
        img.dataset.index = index; // Store original order
        
        img.onload = function() {
            loadedImages.push(img);
            img.onclick = function() {
                bgImageSwap(`backgrounds/${index}.jpg`);
            };
            img.setAttribute('data-bs-dismiss', 'modal');
            tryLoadImage(index + 1);
        };
        
        img.onerror = function() {
            if (loadedImages.length > 0) {
                if (shouldRandomize) {
                    for (let i = loadedImages.length - 1; i > 0; i--) {
                        const j = Math.floor(Math.random() * (i + 1));
                        [loadedImages[i], loadedImages[j]] = [loadedImages[j], loadedImages[i]];
                    }
                }
                
                loadedImages.forEach(img => container.appendChild(img));
                loadingOverlay.style.display = 'none';
            }
        };
    }
    
    tryLoadImage(1);
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', loadBackgroundImages);