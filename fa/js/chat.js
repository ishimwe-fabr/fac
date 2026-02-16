// Chat module
window.SMR_CHAT = {
  // Wire communication page
  wireCommunicationPage: function() {
    const callBtn = document.querySelector('[data-call]');
    const chatForm = document.querySelector('[data-chat-form]');
    const chatMessages = document.querySelector('[data-chat-messages]');
    const chatSummary = document.querySelector('[data-chat-summary]');

    // Get rider from URL
    const urlParams = new URLSearchParams(window.location.search);
    const riderId = urlParams.get('rider');
    const rider = SMR.mockData.riders.find(r => r.id == riderId);

    if (rider) {
      chatSummary.textContent = `Chat with ${rider.name}`;
    }

    // Mock chat messages
    const messages = [
      { from: 'rider', text: 'Hello! I\'m on my way to pick you up.', time: '10:30 AM' },
      { from: 'passenger', text: 'Great! I\'ll be waiting at the pickup point.', time: '10:31 AM' },
      { from: 'rider', text: 'I\'m 5 minutes away. Please be ready.', time: '10:35 AM' }
    ];

    this.renderMessages(chatMessages, messages);

    if (callBtn) {
      callBtn.addEventListener('click', () => {
        alert('Calling ' + (rider ? rider.name : 'rider') + '... (Demo)');
      });
    }

    if (chatForm) {
      chatForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const input = chatForm.querySelector('input[name="message"]');
        const message = input.value.trim();
        if (message) {
          messages.push({ from: 'passenger', text: message, time: new Date().toLocaleTimeString() });
          this.renderMessages(chatMessages, messages);
          input.value = '';
          // Mock rider response
          setTimeout(() => {
            messages.push({ from: 'rider', text: 'OK, noted!', time: new Date().toLocaleTimeString() });
            this.renderMessages(chatMessages, messages);
          }, 1000);
        }
      });
    }
  },

  // Render chat messages
  renderMessages: function(container, messages) {
    container.innerHTML = messages.map(msg => `
      <div class="item ${msg.from === 'passenger' ? 'right' : 'left'}" style="text-align: ${msg.from === 'passenger' ? 'right' : 'left'}; margin-bottom: 10px;">
        <div style="display: inline-block; background: ${msg.from === 'passenger' ? '#28a745' : '#f8f9fa'}; color: ${msg.from === 'passenger' ? 'white' : 'black'}; padding: 8px 12px; border-radius: 18px; max-width: 70%;">
          ${msg.text}<br><small style="opacity: 0.7;">${msg.time}</small>
        </div>
      </div>
    `).join('');
    container.scrollTop = container.scrollHeight;
  }
};