// Canvas Animation
const canvas = document.getElementById('animationCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Particle system for background animation
class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 3 + 1;
        this.speedX = (Math.random() - 0.5) * 0.5;
        this.speedY = (Math.random() - 0.5) * 0.5;
        this.opacity = Math.random() * 0.5 + 0.2;
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x > canvas.width) this.x = 0;
        if (this.x < 0) this.x = canvas.width;
        if (this.y > canvas.height) this.y = 0;
        if (this.y < 0) this.y = canvas.height;
    }

    draw() {
        ctx.fillStyle = `rgba(0, 61, 122, ${this.opacity})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

// Create particles
const particles = [];
for (let i = 0; i < 50; i++) {
    particles.push(new Particle());
}

// Animation loop
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach(particle => {
        particle.update();
        particle.draw();
    });

    requestAnimationFrame(animate);
}

animate();

// Resize canvas on window resize
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

// Chart.js - Repair Orders Summary
const chartCanvas = document.getElementById('repairChart');
if (chartCanvas) {
    const ctx2 = chartCanvas.getContext('2d');
    const repairChart = new Chart(ctx2, {
        type: 'line',
        data: {
            labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun', 'Sun'],
            datasets: [{
                label: 'Repair Orders',
                data: [150, 200, 180, 220, 240, 280, 320, 300],
                borderColor: '#003d7a',
                backgroundColor: 'rgba(0, 61, 122, 0.1)',
                borderWidth: 3,
                fill: true,
                tension: 0.4,
                pointBackgroundColor: '#ffc107',
                pointBorderColor: '#003d7a',
                pointBorderWidth: 2,
                pointRadius: 6,
                pointHoverRadius: 8
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    max: 600,
                    grid: {
                        color: 'rgba(0, 0, 0, 0.05)'
                    }
                },
                x: {
                    grid: {
                        display: false
                    }
                }
            }
        }
    });
}

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Active nav link indicator
window.addEventListener('scroll', () => {
    let current = 'dashboard';
    const sections = document.querySelectorAll('section');

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id') || 'dashboard';
        }
    });

    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// Action card click handlers
document.querySelectorAll('.action-card, .quick-actions-panel .action-item').forEach(card => {
    card.addEventListener('click', function() {
        const title = this.querySelector('h3').textContent;
        alert(`Opening: ${title}`);
    });
});

// Time filter change
const timeFilter = document.querySelector('.time-filter');
if (timeFilter) {
    timeFilter.addEventListener('change', function() {
        alert(`Updating chart for: ${this.value}`);
        // In a real app, you would update the chart data here
    });
}

console.log('VoltHub Dashboard loaded successfully!');
