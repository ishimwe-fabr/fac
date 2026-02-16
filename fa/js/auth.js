// Authentication module
window.SMR_AUTH = {
  // Wire login form
  wireLoginForm: function() {
    const form = document.querySelector('[data-login-form]');
    if (!form) return;

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const formData = new FormData(form);
      const phone = formData.get('phone');
      const password = formData.get('password');

      // Mock authentication
      if ((phone === '0780000000' && password === 'pass123') ||
          (phone === '0780000001' && password === 'admin123')) {
        localStorage.setItem('smr_logged_in', 'true');
        localStorage.setItem('smr_user_type', phone === '0780000001' ? 'admin' : 'passenger');
        localStorage.setItem('smr_user_phone', phone);
        window.location.href = phone === '0780000001' ? 'admin_dashboard.html' : 'passenger_home.html';
      } else {
        SMR.showFlash('Invalid phone or password', 'error');
      }
    });
  },

  // Logout
  logout: function() {
    localStorage.removeItem('smr_logged_in');
    localStorage.removeItem('smr_user_type');
    localStorage.removeItem('smr_user_phone');
    window.location.href = 'index.html';
  }
};