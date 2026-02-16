// Map module
window.SMR_MAP = {
  // Wire map page
  wireMapPage: function() {
    // Mock GPS functionality
    const gpsBtn = document.querySelector('[data-use-gps]');
    const positionPill = document.querySelector('[data-position]');
    const emergencyBtn = document.querySelector('[data-emergency]');

    if (gpsBtn) {
      gpsBtn.addEventListener('click', () => {
        // Mock GPS
        positionPill.textContent = 'Kigali, Rwanda (Mock GPS)';
        positionPill.classList.add('success');
        SMR.showFlash('GPS location updated', 'success');
      });
    }

    if (emergencyBtn) {
      emergencyBtn.addEventListener('click', () => {
        alert('Emergency services contacted! Help is on the way.');
        SMR.showFlash('Emergency alert sent', 'error');
      });
    }

    // Mock map interaction
    const mapCanvas = document.querySelector('.map-canvas');
    if (mapCanvas) {
      mapCanvas.addEventListener('click', (e) => {
        const rect = mapCanvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        // Move pin to clicked location
        const pin = document.querySelector('.pin');
        if (pin) {
          pin.style.left = `${x - 10}px`;
          pin.style.top = `${y - 10}px`;
        }

        SMR.showFlash('Destination set on map', 'success');
      });
    }
  }
};