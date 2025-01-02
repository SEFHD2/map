const mapImage = document.getElementById('map-image');
const zoomInButton = document.getElementById('zoom-in');
const zoomOutButton = document.getElementById('zoom-out');
const mapContainer = document.getElementById('map-container');

let scale = 1; // Initial zoom level
const maxScale = 5; // Maximum zoom level
const minScale = 1; // Minimum zoom level (original size)
let panX = 0; // Horizontal movement
let panY = 0; // Vertical movement
const movementSpeed = 20; // Speed for WASD movement
let isDragging = false;
let startX = 0;
let startY = 0;

// Set initial map display
function initializeMap() {
    scale = minScale;
    panX = 0;
    panY = 0;
    updateMapPosition();
}

// Zoom functionality
function setZoomLevel(newScale) {
    scale = Math.min(Math.max(minScale, newScale), maxScale);
    updateMapPosition();
}

zoomInButton.addEventListener('click', () => {
    setZoomLevel(scale + 0.2);
});

zoomOutButton.addEventListener('click', () => {
    setZoomLevel(scale - 0.2);
});

// Scroll zoom functionality
mapContainer.addEventListener('wheel', (event) => {
    event.preventDefault();
    const delta = event.deltaY > 0 ? -0.2 : 0.2;
    setZoomLevel(scale + delta);
});

// Horizontal and vertical drag functionality
mapImage.addEventListener('mousedown', (event) => {
    isDragging = true;
    startX = event.clientX - panX;
    startY = event.clientY - panY;
    mapImage.style.cursor = 'grabbing';
});

window.addEventListener('mousemove', (event) => {
    if (!isDragging) return;
    panX = event.clientX - startX;
    panY = event.clientY - startY;
    updateMapPosition();
});

window.addEventListener('mouseup', () => {
    isDragging = false;
    mapImage.style.cursor = 'grab';
});

// WASD movement (inverted)
document.addEventListener('keydown', (event) => {
    switch (event.key) {
        case 'a': // Inverted: Move right
            smoothMove(movementSpeed, 0);
            break;
        case 'd': // Inverted: Move left
            smoothMove(-movementSpeed, 0);
            break;
        case 'w': // Inverted: Move down
            smoothMove(0, movementSpeed);
            break;
        case 's': // Inverted: Move up
            smoothMove(0, -movementSpeed);
            break;
        case ' ': // Recenter map
            initializeMap();
            break;
    }
});

// Smooth movement function
function smoothMove(deltaX, deltaY) {
    panX += deltaX;
    panY += deltaY;
    updateMapPosition();
}

// Update map position based on panX, panY, and scale
function updateMapPosition() {
    mapImage.style.transform = `scale(${scale}) translate(${panX / scale}px, ${panY / scale}px)`;
}

// Initialize the map
initializeMap();
