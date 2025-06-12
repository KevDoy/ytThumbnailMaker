function loadBackgroundImages() {
    const container = document.getElementById('bgSelectorImages');
    const loadingOverlay = document.getElementById('loadingOverlay');
    let currentImage = 1;
    let loadedImages = [];
    
    function tryLoadImage(index) {
        const img = document.createElement('img');
        img.src = `backgrounds/${index}.jpg`;
        
        img.onload = function() {
            // Store loaded image for later randomization
            loadedImages.push(img);
            
            // Set up click handler
            img.onclick = function() {
                bgImageSwap(`backgrounds/${index}.jpg`);
            };
            img.setAttribute('data-bs-dismiss', 'modal');
            
            // Try loading next image
            tryLoadImage(index + 1);
        };
        
        img.onerror = function() {
            // All images loaded, now randomize and add to container
            console.log(`Found ${loadedImages.length} background images`);
            
            // Randomize array using Fisher-Yates shuffle
            for (let i = loadedImages.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [loadedImages[i], loadedImages[j]] = [loadedImages[j], loadedImages[i]];
            }
            
            // Add randomized images to container
            loadedImages.forEach(img => {
                container.appendChild(img);
            });
            
            // Hide loading overlay
            loadingOverlay.style.display = 'none';
        };
    }
    
    // Start loading images from 1
    tryLoadImage(1);
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', loadBackgroundImages);