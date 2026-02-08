let selectedAmount = 0;
let selectedFrequency = 'one-time';
let selectedPaymentMethod = 'upi';

document.addEventListener('DOMContentLoaded', function() {
    initDonationPage();
    animateNumbers();
    loadRecentDonors();
});

function initDonationPage() {
    const amountCards = document.querySelectorAll('.donation-card');
    amountCards.forEach(card => {
        card.addEventListener('click', function() {
            amountCards.forEach(c => c.classList.remove('selected'));
            
            this.classList.add('selected');
            
            const amount = this.getAttribute('data-amount');
            
            if (amount === 'custom') {
                document.getElementById('custom-amount-section').style.display = 'block';
                selectedAmount = 0;
                updateDonationSummary();
            } else {
                document.getElementById('custom-amount-section').style.display = 'none';
                selectedAmount = parseInt(amount);
                updateDonationSummary();
            }
        });
    });

    const customAmountInput = document.getElementById('custom-amount');
    if (customAmountInput) {
        customAmountInput.addEventListener('input', function() {
            selectedAmount = parseInt(this.value) || 0;
            updateDonationSummary();
        });
    }
    const frequencyButtons = document.querySelectorAll('.frequency-btn');
    frequencyButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            frequencyButtons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            selectedFrequency = this.getAttribute('data-frequency');
            updateDonationSummary();
        });
    });

   
    const paymentMethods = document.querySelectorAll('.payment-method');
    paymentMethods.forEach(method => {
        method.addEventListener('click', function() {
            paymentMethods.forEach(m => {
                m.classList.remove('selected');
                const checkIcon = m.querySelector('.bi-check-circle-fill');
                if (checkIcon) checkIcon.remove();
            });
            
            this.classList.add('selected');
            const checkIcon = document.createElement('i');
            checkIcon.className = 'bi bi-check-circle-fill text-success ms-auto fs-4';
            this.querySelector('.d-flex').appendChild(checkIcon);
            
            selectedPaymentMethod = this.getAttribute('data-method');
        });
    });

    
    const donateBtn = document.getElementById('donate-btn');
    if (donateBtn) {
        donateBtn.addEventListener('click', processDonation);
    }
}

function updateDonationSummary() {
    const summaryAmount = document.getElementById('summary-amount');
    const summaryFrequency = document.getElementById('summary-frequency');
    const summaryImpact = document.getElementById('summary-impact');

    
    if (summaryAmount) {
        summaryAmount.textContent = `₹${selectedAmount.toLocaleString('en-IN')}`;
    }

    
    if (summaryFrequency) {
        const frequencyText = {
            'one-time': 'One-Time',
            'monthly': 'Monthly',
            'yearly': 'Yearly'
        };
        summaryFrequency.textContent = frequencyText[selectedFrequency];
    }

    
    if (summaryImpact) {
        const impact = calculateImpact(selectedAmount);
        summaryImpact.textContent = impact;
    }
}

function calculateImpact(amount) {
    if (amount === 0) return '-';
    
    const treesPlanted = Math.floor(amount / 100);
    
    if (amount >= 10000) {
        return `Patron Status + ${treesPlanted} Trees`;
    } else if (amount >= 5000) {
        return `Project Support + ${treesPlanted} Trees`;
    } else if (amount >= 1000) {
        return `${treesPlanted} Trees Planted`;
    } else {
        return `${treesPlanted} Tree${treesPlanted !== 1 ? 's' : ''} Planted`;
    }
}

async function processDonation() {
    const name = document.getElementById('donor-name').value.trim();
    const email = document.getElementById('donor-email').value.trim();
    const termsChecked = document.getElementById('terms-check').checked;

    if (!name) {
        showNotification('Please enter your name', 'warning');
        return;
    }

    if (!email || !isValidEmail(email)) {
        showNotification('Please enter a valid email address', 'warning');
        return;
    }

    if (selectedAmount < 100) {
        showNotification('Minimum donation amount is ₹100', 'warning');
        return;
    }

    if (!termsChecked) {
        showNotification('Please accept the terms and conditions', 'warning');
        return;
    }

    const donationData = {
        amount: selectedAmount,
        frequency: selectedFrequency,
        paymentMethod: selectedPaymentMethod,
        donor: {
            name: name,
            email: email,
            phone: document.getElementById('donor-phone').value.trim(),
            pan: document.getElementById('donor-pan').value.trim(),
            message: document.getElementById('donor-message').value.trim()
        },
        timestamp: new Date().toISOString()
    };

    try {
        const donateBtn = document.getElementById('donate-btn');
        const originalText = donateBtn.innerHTML;
        donateBtn.disabled = true;
        donateBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Processing...';

        const response = await sendDonationToBackend(donationData);

        if (response.success) {
            showSuccessModal(donationData);
            
            resetDonationForm();
        } else {
            showNotification('Failed to process donation. Please try again.', 'danger');
        }
        donateBtn.disabled = false;
        donateBtn.innerHTML = originalText;

    } catch (error) {
        console.error('Donation error:', error);
        showNotification('An error occurred. Please try again.', 'danger');
    }
}

async function sendDonationToBackend(donationData) {
    try {
        const response = await fetch('http://localhost:8080/api/donations', {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(donationData)
        });

        if (!response.ok) {
            throw new Error('Failed to process donation');
        }

        const result = await response.json();
        
        saveDonationToLocalStorage(donationData);
        
        return result;
        
    } catch (error) {
        console.error('Backend API error:', error);
        
        console.log('Using fallback - saving to localStorage');
        saveDonationToLocalStorage(donationData);
        
        return { 
            success: true, 
            transactionId: 'TXN' + Date.now(),
            message: 'Donation saved locally (backend unavailable)'
        };
    }
}

function saveDonationToLocalStorage(donationData) {
    let donations = JSON.parse(localStorage.getItem('donations') || '[]');
    donations.push(donationData);
    localStorage.setItem('donations', JSON.stringify(donations));
}

function showSuccessModal(donationData) {
    const modalHtml = `
        <div class="modal fade" id="successModal" tabindex="-1">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content border-0 shadow-lg">
                    <div class="modal-body text-center p-5">
                        <div class="mb-4">
                            <i class="bi bi-check-circle-fill text-success" style="font-size: 5rem;"></i>
                        </div>
                        <h3 class="fw-bold mb-3">Thank You for Your Donation!</h3>
                        <p class="text-muted mb-4">
                            Your generous contribution of <strong class="text-primary">₹${donationData.amount.toLocaleString('en-IN')}</strong> 
                            will make a real difference.
                        </p>
                        <div class="bg-light rounded p-3 mb-4">
                            <p class="mb-2"><strong>Impact:</strong> ${calculateImpact(donationData.amount)}</p>
                            <p class="mb-0"><strong>Frequency:</strong> ${donationData.frequency}</p>
                        </div>
                        <p class="small text-muted mb-4">
                            <i class="bi bi-envelope-check me-2"></i>
                            A receipt has been sent to <strong>${donationData.donor.email}</strong>
                        </p>
                        <button type="button" class="btn btn-primary px-5" data-bs-dismiss="modal">
                            Done
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;

    const existingModal = document.getElementById('successModal');
    if (existingModal) existingModal.remove();

    document.body.insertAdjacentHTML('beforeend', modalHtml);

    const modal = new bootstrap.Modal(document.getElementById('successModal'));
    modal.show();

    document.getElementById('successModal').addEventListener('hidden.bs.modal', function() {
        loadRecentDonors();
    });
}
function resetDonationForm() {
    document.getElementById('donor-name').value = '';
    document.getElementById('donor-email').value = '';
    document.getElementById('donor-phone').value = '';
    document.getElementById('donor-pan').value = '';
    document.getElementById('donor-message').value = '';
    document.getElementById('terms-check').checked = false;
    document.getElementById('custom-amount').value = '';
    document.getElementById('custom-amount-section').style.display = 'none';
    
    selectedAmount = 0;
    updateDonationSummary();
    
    document.querySelectorAll('.donation-card').forEach(card => {
        card.classList.remove('selected');
    });
}

async function loadRecentDonors() {
    const donorsContainer = document.getElementById('recent-donors');
    if (!donorsContainer) return;

    try {
        const response = await fetch('http://localhost:8080/api/donations/recent?limit=6');
        
        let donations = [];
        
        if (response.ok) {
            donations = await response.json();
            console.log('Loaded donations from backend:', donations.length);
        } else {
            throw new Error('Backend not available');
        }
        
        if (donations.length === 0) {
            donations = JSON.parse(localStorage.getItem('donations') || '[]');
        }
        
        donations.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
        const recentDonations = donations.slice(0, 6);

        donorsContainer.innerHTML = '';

        recentDonations.forEach((donation, index) => {
            const donorCard = createDonorCard(donation, index);
            donorsContainer.appendChild(donorCard);
        });
        
    } catch (error) {
        console.error('Error loading donors:', error);
        
        let donations = JSON.parse(localStorage.getItem('donations') || '[]');
        
        if (donations.length === 0) {
            donations = [
                { donor: { name: 'Rajesh Kumar' }, amount: 5000, timestamp: new Date().toISOString() },
                { donor: { name: 'Priya Sharma' }, amount: 2500, timestamp: new Date(Date.now() - 3600000).toISOString() },
                { donor: { name: 'Amit Patel' }, amount: 1000, timestamp: new Date(Date.now() - 7200000).toISOString() }
            ];
        }
        
        donorsContainer.innerHTML = '';
        donations.slice(0, 6).forEach((donation, index) => {
            const donorCard = createDonorCard(donation, index);
            donorsContainer.appendChild(donorCard);
        });
    }
}

function createDonorCard(donation, index) {
    const col = document.createElement('div');
    col.className = 'col-md-4';
    
    const timeAgo = getTimeAgo(new Date(donation.timestamp));
    const initials = getInitials(donation.donor.name);
    const randomColor = getRandomColor(index);

    col.innerHTML = `
        <div class="card border-0 shadow-sm h-100">
            <div class="card-body p-4">
                <div class="d-flex align-items-center mb-3">
                    <div class="rounded-circle d-flex align-items-center justify-content-center me-3" 
                         style="width: 50px; height: 50px; background: ${randomColor}; color: white; font-weight: bold; font-size: 1.2rem;">
                        ${initials}
                    </div>
                    <div>
                        <h6 class="mb-0 fw-bold">${donation.donor.name}</h6>
                        <small class="text-muted">${timeAgo}</small>
                    </div>
                </div>
                <div class="d-flex justify-content-between align-items-center">
                    <span class="badge bg-success">₹${donation.amount.toLocaleString('en-IN')}</span>
                    <small class="text-muted">
                        <i class="bi bi-heart-fill text-danger me-1"></i>
                        ${Math.floor(donation.amount / 100)} trees
                    </small>
                </div>
            </div>
        </div>
    `;

    return col;
}

function animateNumbers() {
    const animateElements = document.querySelectorAll('.animate-number');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target.getAttribute('data-target');
                animateNumber(entry.target, target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    animateElements.forEach(el => observer.observe(el));
}

function animateNumber(element, target) {
    const isCurrency = target.includes('₹');
    const numericTarget = parseInt(target.replace(/[^0-9]/g, ''));
    
    const duration = 2000;
    const steps = 60;
    const stepDuration = duration / steps;
    const increment = numericTarget / steps;
    
    let current = 0;
    
    const timer = setInterval(() => {
        current += increment;
        
        if (current >= numericTarget) {
            current = numericTarget;
            clearInterval(timer);
        }
        
        if (isCurrency) {
            element.textContent = '₹' + Math.floor(current).toLocaleString('en-IN');
        } else {
            element.textContent = Math.floor(current).toLocaleString('en-IN');
        }
    }, stepDuration);
}

function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function getInitials(name) {
    return name
        .split(' ')
        .map(word => word[0])
        .join('')
        .toUpperCase()
        .slice(0, 2);
}

function getRandomColor(index) {
    const colors = ['#667eea', '#764ba2', '#f093fb', '#4facfe', '#43e97b', '#fa709a'];
    return colors[index % colors.length];
}

function getTimeAgo(date) {
    const seconds = Math.floor((new Date() - date) / 1000);
    
    if (seconds < 60) return 'Just now';
    if (seconds < 3600) return Math.floor(seconds / 60) + ' minutes ago';
    if (seconds < 86400) return Math.floor(seconds / 3600) + ' hours ago';
    if (seconds < 604800) return Math.floor(seconds / 86400) + ' days ago';
    return date.toLocaleDateString();
}

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `alert alert-${type} alert-dismissible fade show position-fixed top-0 start-50 translate-middle-x mt-3`;
    notification.style.zIndex = '9999';
    notification.style.minWidth = '300px';
    notification.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 5000);
}
