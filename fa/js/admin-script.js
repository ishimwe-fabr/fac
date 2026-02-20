// Admin Page JavaScript Functionality

document.addEventListener('DOMContentLoaded', function() {
    // Get all menu links and content sections
    const menuLinks = document.querySelectorAll('.menu-link');
    const contentSections = document.querySelectorAll('.content-section');

    // Add click event listeners to menu links
    menuLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Get the section to show
            const sectionId = this.getAttribute('data-section');
            const targetSection = document.getElementById(sectionId);

            // Remove active class from all links and sections
            menuLinks.forEach(l => l.classList.remove('active'));
            contentSections.forEach(section => section.classList.remove('active'));

            // Add active class to clicked link and corresponding section
            this.classList.add('active');
            if (targetSection) {
                targetSection.classList.add('active');
            }

            // Scroll to top of content
            document.querySelector('.admin-content').scrollTop = 0;
        });
    });

    // Button event listeners
    setupButtonListeners();

    // Form submissions
    setupFormListeners();
});

// Setup button listeners for actions
function setupButtonListeners() {
    // Add new technician button
    const addTechnicianBtn = document.querySelector('.section-header button.btn-primary');
    if (addTechnicianBtn) {
        addTechnicianBtn.addEventListener('click', function() {
            showAlert('success', 'Add Technician form would open here');
        });
    }

    // Edit buttons
    const editButtons = document.querySelectorAll('button.btn-small:not(.danger)');
    editButtons.forEach(btn => {
        if (btn.textContent.trim() === 'Edit' || btn.textContent.trim() === 'View' || btn.textContent.trim() === 'Update') {
            btn.addEventListener('click', function() {
                const action = this.textContent.trim().toLowerCase();
                showAlert('info', `${action.charAt(0).toUpperCase() + action.slice(1)} action triggered`);
            });
        }
    });

    // Delete/Remove buttons
    const deleteButtons = document.querySelectorAll('button.btn-small.danger');
    deleteButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            if (confirm('Are you sure you want to remove this item?')) {
                showAlert('warning', 'Item removed successfully');
            }
        });
    });

    // Generate report buttons
    const reportButtons = document.querySelectorAll('.report-card .btn-secondary');
    reportButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const reportType = this.closest('.report-card').querySelector('h3').textContent;
            showAlert('success', `${reportType} report generated successfully`);
        });
    });

    // Settings action buttons
    const settingsButtons = document.querySelectorAll('.settings-actions .btn');
    settingsButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            if (this.textContent.includes('Save')) {
                showAlert('success', 'Settings saved successfully');
            } else if (this.textContent.includes('Reset')) {
                if (confirm('Are you sure you want to reset to default settings?')) {
                    showAlert('info', 'Settings reset to default');
                }
            }
        });
    });

    // Add item button for inventory
    const addItemButtons = document.querySelectorAll('.section-header .btn-primary');
    addItemButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            if (this.textContent.includes('Technician')) {
                showAlert('success', 'Add New Technician form would open');
            } else if (this.textContent.includes('Customer')) {
                showAlert('success', 'Add New Customer form would open');
            } else if (this.textContent.includes('Item')) {
                showAlert('success', 'Add New Inventory Item form would open');
            }
        });
    });
}

// Setup form listeners
function setupFormListeners() {
    const forms = document.querySelectorAll('.settings-form');
    forms.forEach(form => {
        const inputs = form.querySelectorAll('input, select');
        inputs.forEach(input => {
            input.addEventListener('change', function() {
                console.log(`${input.name || input.id} changed to ${this.value}`);
            });
        });
    });
}

// Alert notification function
function showAlert(type, message) {
    // Create alert element
    const alert = document.createElement('div');
    alert.className = `alert alert-${type}`;
    alert.textContent = message;
    alert.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 1.5rem;
        border-radius: 6px;
        font-weight: 600;
        z-index: 1000;
        animation: slideIn 0.3s ease;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    `;

    // Set colors based on type
    const colors = {
        success: { bg: '#d5f4e6', text: '#27ae60', border: '2px solid #27ae60' },
        error: { bg: '#f8d7da', text: '#721c24', border: '2px solid #e74c3c' },
        warning: { bg: '#fff3cd', text: '#856404', border: '2px solid #f39c12' },
        info: { bg: '#cfe2ff', text: '#084298', border: '2px solid #667eea' }
    };

    const color = colors[type] || colors.info;
    alert.style.backgroundColor = color.bg;
    alert.style.color = color.text;
    alert.style.border = color.border;

    // Add to document
    document.body.appendChild(alert);

    // Remove after 3 seconds
    setTimeout(() => {
        alert.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => alert.remove(), 300);
    }, 3000);
}

// Add animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }

    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Search functionality
function searchTable(tableSelector, searchQuery) {
    const table = document.querySelector(tableSelector);
    if (!table) return;

    const rows = table.querySelectorAll('tbody tr');
    const query = searchQuery.toLowerCase();

    rows.forEach(row => {
        const text = row.textContent.toLowerCase();
        row.style.display = text.includes(query) ? '' : 'none';
    });
}

// Export data functionality
function exportTableToCSV(tableSelector, filename) {
    const table = document.querySelector(tableSelector);
    if (!table) return;

    let csv = [];
    const rows = table.querySelectorAll('tr');

    rows.forEach(row => {
        let rowData = [];
        const cells = row.querySelectorAll('td, th');
        cells.forEach(cell => {
            rowData.push('"' + cell.textContent.trim().replace(/"/g, '""') + '"');
        });
        csv.push(rowData.join(','));
    });

    // Create download link
    const csvContent = csv.join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename + '.csv';
    a.click();
    window.URL.revokeObjectURL(url);
}

// Print functionality
function printSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (!section) return;

    const printWindow = window.open('', '', 'width=800,height=600');
    printWindow.document.write(section.outerHTML);
    printWindow.document.close();
    printWindow.print();
}

// Initialize tooltips for action buttons
function initializeTooltips() {
    const buttons = document.querySelectorAll('button[data-tooltip]');
    buttons.forEach(btn => {
        btn.addEventListener('mouseenter', function() {
            const tooltip = document.createElement('div');
            tooltip.className = 'tooltip';
            tooltip.textContent = this.getAttribute('data-tooltip');
            tooltip.style.cssText = `
                position: absolute;
                background: #333;
                color: white;
                padding: 0.5rem 0.75rem;
                border-radius: 4px;
                font-size: 0.8rem;
                z-index: 1000;
                white-space: nowrap;
                margin-top: -40px;
            `;
            this.parentNode.insertBefore(tooltip, this);
        });

        btn.addEventListener('mouseleave', function() {
            const tooltip = this.parentNode.querySelector('.tooltip');
            if (tooltip) tooltip.remove();
        });
    });
}

// Initialize on page load
window.addEventListener('load', function() {
    initializeTooltips();
    console.log('Admin Dashboard loaded successfully');
});
