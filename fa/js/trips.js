// Trips module
window.SMR_TRIPS = {
  // Wire passenger home sidebar
  wirePassengerHomeSidebar: function() {
    const tripsList = document.querySelector('[data-last-trips]');
    if (!tripsList) return;

    const trips = SMR.mockData.trips;
    tripsList.innerHTML = trips.map(trip => `
      <div class="item">
        <div><strong>${trip.from} → ${trip.to}</strong></div>
        <div class="subtle">${trip.date} • ${trip.cost} RWF • ★${trip.rating}</div>
      </div>
    `).join('');
  },

  // Wire riders list
  wireRidersList: function() {
    const ridersList = document.querySelector('[data-riders-list]');
    if (!ridersList) return;

    const riders = SMR.mockData.riders.filter(r => r.status === 'available');
    ridersList.innerHTML = riders.map(rider => `
      <div class="item" style="border:1px solid #e9ecef; padding:15px; margin-bottom:10px; border-radius:8px;">
        <div class="row">
          <div>
            <strong>${rider.name}</strong> • ${rider.vehicle}<br>
            <span class="subtle">Phone: ${rider.phone} • Rating: ★${rider.rating}</span>
          </div>
          <a class="btn primary" href="communication.html?rider=${rider.id}">Select Rider</a>
        </div>
      </div>
    `).join('');
  },

  // Wire destination page
  wireDestinationPage: function() {
    const form = document.querySelector('[data-destination-form]');
    if (!form) return;

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const formData = new FormData(form);
      const from = formData.get('from');
      const to = formData.get('to');

      if (from && to) {
        // Store destination in localStorage
        localStorage.setItem(SMR.STORAGE_KEYS.destinationFrom, from);
        localStorage.setItem(SMR.STORAGE_KEYS.destinationTo, to);
        window.location.href = 'available_riders.html';
      } else {
        SMR.showFlash('Please fill in both pickup and destination', 'error');
      }
    });
  },

  // Wire navigation page
  wireNavigationPage: function() {
    const progressPill = document.querySelector('[data-progress]');
    const tripSummary = document.querySelector('[data-trip-summary]');
    const startBtn = document.querySelector('[data-start-trip]');
    const completeBtn = document.querySelector('[data-complete-trip]');

    const from = localStorage.getItem(SMR.STORAGE_KEYS.destinationFrom) || 'Pickup Point';
    const to = localStorage.getItem(SMR.STORAGE_KEYS.destinationTo) || 'Destination';

    tripSummary.textContent = `${from} → ${to}`;

    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      progressPill.textContent = `${progress}% complete`;
      if (progress >= 100) {
        clearInterval(interval);
        progressPill.textContent = 'Completed!';
        if (completeBtn) completeBtn.style.display = 'inline-block';
        if (startBtn) startBtn.style.display = 'none';
        SMR.showFlash('Trip completed! Redirecting to rating...', 'success');
        setTimeout(() => window.location.href = 'trip_completion.html', 2000);
      }
    }, 1000);

    if (startBtn) {
      startBtn.addEventListener('click', () => {
        localStorage.setItem(SMR.STORAGE_KEYS.activeTrip, 'true');
        SMR.showFlash('Trip started!', 'success');
        startBtn.style.display = 'none';
      });
    }

    if (completeBtn) {
      completeBtn.addEventListener('click', () => {
        window.location.href = 'trip_completion.html';
      });
    }
  }
};