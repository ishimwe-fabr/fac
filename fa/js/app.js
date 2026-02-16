// Smart Moto Rwanda App JavaScript
window.SMR = {
  // Mount header (now static, but keeping for compatibility)
  mountHeader: function() {
    // Header is now static HTML
  },

  // Require login check
  requireLogin: function() {
    // Check if user is logged in (mock)
    const isLoggedIn = localStorage.getItem('smr_logged_in') === 'true';
    if (!isLoggedIn && window.location.pathname !== '/login.html' && window.location.pathname !== '/register.html' && window.location.pathname !== '/index.html') {
      window.location.href = 'login.html';
    }
  },

  // Flash message system
  showFlash: function(message, type = 'info') {
    const flashElements = document.querySelectorAll('[data-flash]');
    flashElements.forEach(el => {
      el.textContent = message;
      el.className = `item ${type}`;
      el.classList.remove('hidden');
      setTimeout(() => el.classList.add('hidden'), 5000);
    });
  },

  // Query selector helper
  qs: function(selector) {
    return document.querySelector(selector);
  },

  // Storage keys
  STORAGE_KEYS: {
    activeTrip: 'smr_active_trip',
    destinationFrom: 'smr_destination_from',
    destinationTo: 'smr_destination_to'
  },

  // Mock data
  mockData: {
    riders: [
      { id: 1, name: 'Jean Baptiste', phone: '0781234567', rating: 4.8, vehicle: 'Yamaha MT-07', status: 'available' },
      { id: 2, name: 'Marie Claire', phone: '0782345678', rating: 4.9, vehicle: 'Honda CBR 600', status: 'available' },
      { id: 3, name: 'Pierre Louis', phone: '0783456789', rating: 4.7, vehicle: 'Kawasaki Ninja 400', status: 'busy' },
      { id: 4, name: 'Sophie Marie', phone: '0784567890', rating: 4.6, vehicle: 'Suzuki GSX-R 600', status: 'available' }
    ],
    trips: [
      { id: 1, date: '2024-02-15', from: 'Kigali Center', to: 'Airport', cost: 5000, rating: 5 },
      { id: 2, date: '2024-02-14', from: 'Nyamirambo', to: 'Remera', cost: 3000, rating: 4 },
      { id: 3, date: '2024-02-13', from: 'Kacyiru', to: 'Kimisagara', cost: 4000, rating: 5 }
    ]
  }
};