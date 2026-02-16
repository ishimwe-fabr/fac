// Ratings module
window.SMR_RATINGS = {
  // Wire trip completion page
  wireTripCompletionPage: function() {
    const summary = document.querySelector('[data-completion-summary]');
    const form = document.querySelector('[data-rating-form]');

    const from = localStorage.getItem(SMR.STORAGE_KEYS.destinationFrom) || 'Pickup Point';
    const to = localStorage.getItem(SMR.STORAGE_KEYS.destinationTo) || 'Destination';
    const cost = Math.floor(Math.random() * 5000) + 2000; // Mock cost

    summary.textContent = `Trip from ${from} to ${to} - ${cost} RWF`;

    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(form);
        const stars = formData.get('stars');
        const comment = formData.get('comment');

        // Mock submit rating
        SMR.showFlash(`Rating submitted: ${stars} stars. Thank you!`, 'success');

        // Clear active trip
        localStorage.removeItem(SMR.STORAGE_KEYS.activeTrip);
        localStorage.removeItem(SMR.STORAGE_KEYS.destinationFrom);
        localStorage.removeItem(SMR.STORAGE_KEYS.destinationTo);

        setTimeout(() => window.location.href = 'passenger_home.html', 2000);
      });
    }
  }
};