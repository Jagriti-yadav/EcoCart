import { addToCart, updateCartBadge, getCart, saveCart } from './cart-module.js';

document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    initNavbar();
    initProductFeatures();    
    initAddToCartButtons();
    initAnimations();
    initTheme();
    initScrollToTop(); 
    initTooltips(); 
    initCarouselEnhancements(); 
}

function initNavbar() {
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    
    if (navbarToggler) {
        navbarToggler.addEventListener('click', function() {
            navbarCollapse.classList.toggle('show');
        });
    }

    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.classList.add('navbar-scrolled');
        } else {
            navbar.classList.remove('navbar-scrolled');
        }
    });

    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage) {
            link.classList.add('active');
        }
    });
}



function initAddToCartButtons() {
    document.body.addEventListener('click', function(e) {
        const button = e.target.closest('.add-to-cart-btn');
        
        if (button) {
            e.preventDefault();
            
            const productId = button.getAttribute('data-product-id');
            const productName = button.getAttribute('data-product-name');
            const productPrice = parseInt(button.getAttribute('data-product-price'));
            const productImage = button.getAttribute('data-product-image');
            
            if (productId && productName && productPrice && productImage) {
                addToCart(productId, productName, productPrice, productImage);
                
                const originalText = button.innerHTML;
                button.innerHTML = '<i class="bi bi-check2 me-1"></i>Added';
                button.classList.add('btn-success');
                button.classList.remove('btn-primary');
                
                setTimeout(() => {
                    button.innerHTML = originalText;
                    button.classList.remove('btn-success');
                    button.classList.add('btn-primary');
                }, 1500);
            } else {
                console.error('Missing product data:', { productId, productName, productPrice, productImage });
            }
        }
    });
    
    console.log('Add to cart event delegation initialized');
}

window.addToCart = addToCart;
window.updateCartBadge = updateCartBadge;


function initProductFeatures() {
    document.querySelectorAll('.card-img-top').forEach(img => {
        img.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
        });
        
        img.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });

    document.querySelectorAll('[data-quick-view]').forEach(button => {
        button.addEventListener('click', function() {
            const productId = this.getAttribute('data-product-id');
            showQuickView(productId);
        });
    });

    document.querySelectorAll('[data-wishlist]').forEach(button => {
        button.addEventListener('click', function() {
            const icon = this.querySelector('i');
            if (icon.classList.contains('bi-heart')) {
                icon.classList.remove('bi-heart');
                icon.classList.add('bi-heart-fill');
                this.classList.add('text-danger');
                showNotification('Added to wishlist!', 'success');
            } else {
                icon.classList.remove('bi-heart-fill');
                icon.classList.add('bi-heart');
                this.classList.remove('text-danger');
                showNotification('Removed from wishlist!', 'info');
            }
        });
    });

    document.querySelectorAll('[name="category"]').forEach(radio => {
        radio.addEventListener('change', function() {
            filterProducts(this.value);
        });
    });

    const sortDropdown = document.querySelector('#sortDropdown');
    if (sortDropdown) {
        document.querySelectorAll('.dropdown-item').forEach(item => {
            item.addEventListener('click', function(e) {
                e.preventDefault();
                const sortType = this.textContent.trim();
                sortProducts(sortType);
            });
        });
    }
}

function showQuickView(productId) {
    const modal = document.createElement('div');
    modal.className = 'modal fade';
    modal.innerHTML = `
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Product Quick View</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                </div>
                <div class="modal-body">
                    <div class="row">
                        <div class="col-md-6">
                            <img src="img/product-${productId}.jpg" class="img-fluid rounded" alt="Product">
                        </div>
                        <div class="col-md-6">
                            <h4>Product Name</h4>
                            <p class="text-muted">Product description goes here...</p>
                            <h5 class="text-primary">₹499</h5>
                            <button class="btn btn-primary btn-cart add-to-cart-btn" 
                            data-product-id="${product.id}"
                            data-product-name="${product.name}"
                            data-product-price="${product.price}"
                            data-product-image="${product.image}">
                        <i class="bi bi-cart-plus me-1"></i>Add
                    </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    const modalInstance = new bootstrap.Modal(modal);
    modalInstance.show();
    
    modal.addEventListener('hidden.bs.modal', () => {
        modal.remove();
    });
}

function filterProducts(category) {
    const products = document.querySelectorAll('.col-xl-3, .col-lg-4');
    
    products.forEach(product => {
        if (category === 'all') {
            product.style.display = 'block';
        } else {
            const productCategory = product.getAttribute('data-category');
            product.style.display = productCategory === category ? 'block' : 'none';
        }
    });
}

function sortProducts(sortType) {
    const container = document.querySelector('.row.g-4');
    const products = Array.from(container.children);
    
    products.sort((a, b) => {
        const priceA = parseInt(a.querySelector('.text-primary').textContent.replace(/[₹,]/g, ''));
        const priceB = parseInt(b.querySelector('.text-primary').textContent.replace(/[₹,]/g, ''));
        
        if (sortType.includes('Low to High')) {
            return priceA - priceB;
        } else if (sortType.includes('High to Low')) {
            return priceB - priceA;
        }
        return 0;
    });
    
    products.forEach(product => container.appendChild(product));
}

function initAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.card, .category-card, .product-card').forEach(el => {
        el.classList.add('animate-on-scroll');
        observer.observe(el);
    });
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');

            if (!href || href === '#') {
                return;
            }
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

function initTheme() {
    const themeToggle = document.querySelector('[data-theme-toggle]');
    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            document.body.classList.toggle('dark-theme');
            const isDark = document.body.classList.contains('dark-theme');
            localStorage.setItem('theme', isDark ? 'dark' : 'light');
        });
    }

    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-theme');
    }
}

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `alert alert-${type} position-fixed top-0 end-0 m-3`;
    notification.style.zIndex = '9999';
    notification.innerHTML = `
        ${message}
        <button type="button" class="btn-close ms-2" aria-label="Close"></button>
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
    
    notification.querySelector('.btn-close').addEventListener('click', () => {
        notification.remove();
    });
}

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function initFormValidation() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            if (!form.checkValidity()) {
                e.preventDefault();
                e.stopPropagation();
            }
            form.classList.add('was-validated');
        });
    });
}

function initSearch() {
    const searchInput = document.querySelector('[data-search]');
    if (searchInput) {
        searchInput.addEventListener('input', debounce(function() {
            const searchTerm = this.value.toLowerCase();
            searchProducts(searchTerm);
        }, 300));
    }
}

function searchProducts(term) {
    const products = document.querySelectorAll('.product-card');
    
    products.forEach(product => {
        const productName = product.querySelector('h5, h3').textContent.toLowerCase();
        const productContainer = product.closest('.col-xl-3, .col-lg-4, .col-md-6');
        
        if (productName.includes(term) || term === '') {
            productContainer.style.display = 'block';
        } else {
            productContainer.style.display = 'none';
        }
    });
}

window.getCart = getCart;
window.saveCart = saveCart;
window.addToCart = addToCart;
window.updateCartBadge = updateCartBadge;
window.showNotification = showNotification;

function initScrollToTop() {
    const scrollBtn = document.getElementById('scrollToTop');
    
    if (scrollBtn) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 300) {
                scrollBtn.classList.add('show');
            } else {
                scrollBtn.classList.remove('show');
            }
        });
        
        scrollBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

function initTooltips() {
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });
}

function initCarouselEnhancements() {
    const carousel = document.getElementById('heroCarousel');
    if (carousel) {
        let touchStartX = 0;
        let touchEndX = 0;
        
        carousel.addEventListener('touchstart', function(e) {
            touchStartX = e.changedTouches[0].screenX;
        });
        
        carousel.addEventListener('touchend', function(e) {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        });
        
        function handleSwipe() {
            if (touchEndX < touchStartX - 50) {
                const nextBtn = carousel.querySelector('.carousel-control-next');
                if (nextBtn) nextBtn.click();
            }
            if (touchEndX > touchStartX + 50) {
                const prevBtn = carousel.querySelector('.carousel-control-prev');
                if (prevBtn) prevBtn.click();
            }
        }
    }
}
