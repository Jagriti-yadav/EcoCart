
let allProducts = [];

document.addEventListener('DOMContentLoaded', function() {
    fetchProducts();
    
    initProductFilters();
    initProductSearch();
    initPagination();
});

async function fetchProducts() {
    try {
        const response = await fetch('http://localhost:8080/api/products');
        
        if (!response.ok) {
            throw new Error('Failed to fetch products');
        }
        
        allProducts = await response.json();
        renderProducts(allProducts);
        
        initProductsPage();
        
    } catch (error) {
        console.error('Error fetching products:', error);
        showProductNotification('Failed to load products. Please try again later.', 'danger');
        showErrorState();
    }
}

function renderProducts(products) {
    const productsGrid = document.getElementById('products-grid');
    
    if (!productsGrid) {
        console.error('Products grid not found');
        return;
    }
    
    productsGrid.innerHTML = '';
    
    products.forEach((product, index) => {
        const productCard = createProductCard(product, index);
        productsGrid.appendChild(productCard);
    });
    
    updateResultsCount(products.length);
}

function createProductCard(product, index) {
    const col = document.createElement('div');
    col.className = 'col-xl-3 col-lg-4 col-md-6';
    col.setAttribute('data-category', product.category);
    col.setAttribute('data-price', product.price);
    col.setAttribute('data-name', product.name.toLowerCase());
    
    const starsHTML = generateStarRating(product.rating);
    
    const badgeHTML = product.badge ? `
        <span class="badge bg-${product.badge.type} position-absolute top-0 start-0 m-3 badge-modern">
            <i class="bi bi-${product.badge.icon} me-1"></i>${product.badge.text}
        </span>
    ` : '';
    
    col.innerHTML = `
        <div class="card border-0 shadow-hover h-100 product-card-enhanced">
            <div class="position-relative overflow-hidden product-image-wrapper">
                <img src="${product.image}" class="card-img-top product-image" alt="${product.name}" style="height: 280px; object-fit: cover;">
                ${badgeHTML}
                
                
            </div>
            <div class="card-body d-flex flex-column p-4">
                <h5 class="card-title fw-bold mb-2">${product.name}</h5>
                <div class="product-rating mb-2">
                    ${starsHTML}
                    <small class="text-muted ms-2">(${product.reviews})</small>
                </div>
                <p class="card-text text-muted small mb-3 flex-grow-1">${product.description}</p>
                <div class="d-flex justify-content-between align-items-center mt-auto">
                    <div>
                        <span class="fs-4 fw-bold text-primary">₹${product.price}</span>
                    </div>
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
    `;
    
    return col;
}

function generateStarRating(rating) {
    let starsHTML = '';
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    
    for (let i = 0; i < fullStars; i++) {
        starsHTML += '<i class="bi bi-star-fill text-warning"></i>';
    }
    
    if (hasHalfStar) {
        starsHTML += '<i class="bi bi-star-half text-warning"></i>';
    }
    
    for (let i = 0; i < emptyStars; i++) {
        starsHTML += '<i class="bi bi-star text-warning"></i>';
    }
    
    return starsHTML;
}

function showErrorState() {
    const productsGrid = document.getElementById('products-grid');
    if (productsGrid) {
        productsGrid.innerHTML = `
            <div class="col-12 text-center py-5">
                <i class="bi bi-exclamation-triangle display-1 text-danger mb-3"></i>
                <h4>Failed to Load Products</h4>
                <p class="text-muted">Please check your connection and try again.</p>
                <button class="btn btn-primary" onclick="location.reload()">
                    <i class="bi bi-arrow-clockwise me-2"></i>Retry
                </button>
            </div>
        `;
    }
}

function initProductsPage() {
    initProductHovers();
    initWishlistButtons();
    initQuickViewButtons();
    
    initializeTooltips();
}



function initProductHovers() {
    const productCards = document.querySelectorAll('.product-card');
    
    productCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px)';
            this.style.transition = 'all 0.3s ease';
            
            const image = this.querySelector('.card-img-top');
            if (image) {
                image.style.transform = 'scale(1.05)';
                image.style.transition = 'transform 0.3s ease';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            
            const image = this.querySelector('.card-img-top');
            if (image) {
                image.style.transform = 'scale(1)';
            }
        });
    });
}



function initWishlistButtons() {
    document.querySelectorAll('.wishlist-btn').forEach(button => {
        const productCard = button.closest('.card');
        const addToCartBtn = productCard.querySelector('.add-to-cart-btn');
        const productId = addToCartBtn ? addToCartBtn.getAttribute('data-product-id') : null;
        
        if (productId) {
            button.setAttribute('data-product-id', productId);
            
            const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
            if (wishlist.includes(productId)) {
                const icon = button.querySelector('i');
                icon.classList.remove('bi-heart');
                icon.classList.add('bi-heart-fill');
                button.classList.add('text-danger');
            }
        }
        
        button.addEventListener('click', function() {
            const icon = this.querySelector('i');
            const productId = this.getAttribute('data-product-id');
            
            if (icon.classList.contains('bi-heart')) {
                icon.classList.remove('bi-heart');
                icon.classList.add('bi-heart-fill');
                this.classList.add('text-danger');
                
                addToWishlist(productId);
                showProductNotification('Added to wishlist!', 'success');
                
                this.style.transform = 'scale(1.2)';
                setTimeout(() => {
                    this.style.transform = 'scale(1)';
                }, 200);
                
            } else {
                icon.classList.remove('bi-heart-fill');
                icon.classList.add('bi-heart');
                this.classList.remove('text-danger');
                
                removeFromWishlist(productId);
                showProductNotification('Removed from wishlist', 'info');
            }
        });
    });
}

function initQuickViewButtons() {
    document.querySelectorAll('.quick-view-btn').forEach(button => {
        button.addEventListener('click', function() {
            const productCard = this.closest('.card');
            const productName = productCard.querySelector('.card-title').textContent;
            const productPrice = productCard.querySelector('.text-primary').textContent;
            const productImage = productCard.querySelector('.card-img-top').src;
            const productRating = productCard.querySelector('.product-rating');
            const productDescription = productCard.querySelector('.card-text').textContent;
            
            showQuickViewModal(productName, productPrice, productImage, productRating, productDescription);
        });
    });
}

function initProductFilters() {
    document.querySelectorAll('[name="category"]').forEach(radio => {
        radio.addEventListener('change', function() {
            filterProductsByCategory(this.value);
            updateFilterUI(this);
        });
    });
    
    document.querySelectorAll('.dropdown-item').forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            const sortType = this.textContent.trim();
            sortProducts(sortType);
            updateSortUI(this, sortType);
        });
    });
    
    addPriceRangeFilter();
}

function filterProductsByCategory(category) {
    let filteredProducts = allProducts;
    
    if (category !== 'all') {
        filteredProducts = allProducts.filter(product => product.category === category);
    }
    
    renderProducts(filteredProducts);
    
    initProductsPage();
}

function sortProducts(sortType) {
    const container = document.querySelector('.row.g-4');
    const products = Array.from(container.children);
    
    products.sort((a, b) => {
        if (sortType.includes('Price: Low to High')) {
            const priceA = parseInt(a.getAttribute('data-price'));
            const priceB = parseInt(b.getAttribute('data-price'));
            return priceA - priceB;
        } else if (sortType.includes('Price: High to Low')) {
            const priceA = parseInt(a.getAttribute('data-price'));
            const priceB = parseInt(b.getAttribute('data-price'));
            return priceB - priceA;
        } else if (sortType.includes('Most Popular')) {
            return Math.random() - 0.5;
        } else if (sortType.includes('Newest First')) {
            return Math.random() - 0.5;
        }
        return 0;
    });
    
    products.forEach((product, index) => {
        product.style.opacity = '0';
        setTimeout(() => {
            container.appendChild(product);
            product.style.opacity = '1';
            product.style.transition = 'opacity 0.3s ease';
        }, index * 50);
    });
}

function initProductSearch() {
    const searchInput = document.getElementById('product-search');
    
    if (searchInput) {
        searchInput.addEventListener('input', debounce(function() {
            searchProducts(this.value.trim().toLowerCase());
        }, 300));
    }
}

function searchProducts(searchTerm) {
    const productsGrid = document.getElementById('products-grid');
    const products = productsGrid.querySelectorAll('[data-category]');
    let visibleCount = 0;
    
    products.forEach(product => {
        const productCard = product.querySelector('.card-title');
        const productName = productCard ? productCard.textContent.toLowerCase() : '';
        
        if (searchTerm === '' || productName.includes(searchTerm)) {
            product.style.display = '';
            visibleCount++;
        } else {
            product.style.display = 'none';
        }
    });
    
    updateResultsCount(visibleCount);
    
    showNoResultsMessage(visibleCount === 0);
}

function addPriceRangeFilter() {
    const filterSection = document.querySelector('.container.my-4 .row');
    
    if (filterSection && !document.querySelector('.price-filter')) {
        const priceFilter = document.createElement('div');
        priceFilter.className = 'col-12 mt-3 price-filter';
        priceFilter.innerHTML = `
            <div class="card">
                <div class="card-body">
                    <h6 class="card-title">Price Range</h6>
                    <div class="row align-items-center">
                        <div class="col-4">
                            <input type="range" class="form-range" id="minPrice" min="0" max="1000" value="0" step="50">
                            <label for="minPrice" class="form-label small">Min: ₹<span id="minPriceValue">0</span></label>
                        </div>
                        <div class="col-4">
                            <input type="range" class="form-range" id="maxPrice" min="0" max="1000" value="1000" step="50">
                            <label for="maxPrice" class="form-label small">Max: ₹<span id="maxPriceValue">1000</span></label>
                        </div>
                        <div class="col-4">
                            <button class="btn btn-sm btn-primary" onclick="filterByPrice()">Apply</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        filterSection.appendChild(priceFilter);
        
        document.getElementById('minPrice').addEventListener('input', function() {
            document.getElementById('minPriceValue').textContent = this.value;
        });
        
        document.getElementById('maxPrice').addEventListener('input', function() {
            document.getElementById('maxPriceValue').textContent = this.value;
        });
    }
}

function filterByPrice() {
    const minPrice = parseInt(document.getElementById('minPrice').value);
    const maxPrice = parseInt(document.getElementById('maxPrice').value);
    const productsGrid = document.getElementById('products-grid');
    const products = productsGrid.querySelectorAll('[data-category]');
    let visibleCount = 0;
    
    products.forEach(product => {
        const priceElement = product.querySelector('.text-primary');
        const priceText = priceElement ? priceElement.textContent.replace('₹', '').trim() : '0';
        const productPrice = parseInt(priceText);
        
        if (productPrice >= minPrice && productPrice <= maxPrice) {
            product.style.display = '';
            visibleCount++;
        } else {
            product.style.display = 'none';
        }
    });
    
    updateResultsCount(visibleCount);
}

function initPagination() {
    const paginationItems = document.querySelectorAll('.page-item');
    
    paginationItems.forEach(item => {
        const link = item.querySelector('.page-link');
        if (link && !item.classList.contains('disabled')) {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                
                paginationItems.forEach(p => p.classList.remove('active'));
                
                if (!link.querySelector('.bi-chevron-left, .bi-chevron-right')) {
                    item.classList.add('active');
                }
                
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
                
                showProductNotification(`Loading page ${link.textContent}...`, 'info');
            });
        }
    });
}

function showQuickViewModal(name, price, image, rating, description) {
    const modal = document.createElement('div');
    modal.className = 'modal fade';
    modal.innerHTML = `
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Quick View</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                </div>
                <div class="modal-body">
                    <div class="row">
                        <div class="col-md-6">
                            <img src="${image}" class="img-fluid rounded" alt="${name}">
                        </div>
                        <div class="col-md-6">
                            <h4>${name}</h4>
                            <div class="mb-3">${rating ? rating.outerHTML : ''}</div>
                            <p class="text-muted">${description}</p>
                            <h5 class="text-primary mb-3">${price}</h5>
                            <div class="mb-3">
                                <label class="form-label">Quantity:</label>
                                <div class="input-group" style="width: 120px;">
                                    <button class="btn btn-outline-secondary" type="button">-</button>
                                    <input type="number" class="form-control text-center" value="1" min="1">
                                    <button class="btn btn-outline-secondary" type="button">+</button>
                                </div>
                            </div>
                            <div class="d-grid gap-2">
                                <button class="btn btn-primary">Add to Cart</button>
                                <button class="btn btn-outline-secondary">Add to Wishlist</button>
                            </div>
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

function updateFilterUI(activeRadio) {
    document.querySelectorAll('[name="category"]').forEach(radio => {
        const label = radio.nextElementSibling;
        if (radio === activeRadio) {
            label.classList.add('active');
        } else {
            label.classList.remove('active');
        }
    });
}

function updateSortUI(activeItem, sortType) {
    const dropdownButton = document.getElementById('sortDropdown');
    if (dropdownButton) {
        dropdownButton.innerHTML = `<i class="bi bi-sort-down me-1"></i>${sortType}`;
    }
}

function updateResultsCount(count) {
    const productCountElement = document.getElementById('product-count');
    if (productCountElement) {
        productCountElement.textContent = count;
    }
}

function showNoResultsMessage(show) {
    let noResultsElement = document.querySelector('.no-results');
    
    if (show && !noResultsElement) {
        noResultsElement = document.createElement('div');
        noResultsElement.className = 'no-results col-12 text-center py-5';
        noResultsElement.innerHTML = `
            <i class="bi bi-search display-1 text-muted mb-3"></i>
            <h4>No products found</h4>
            <p class="text-muted">Try adjusting your filters or search terms</p>
        `;
        
        const container = document.querySelector('.row.g-4');
        container.appendChild(noResultsElement);
    } else if (!show && noResultsElement) {
        noResultsElement.remove();
    }
}

function clearSearch() {
    const searchInput = document.querySelector('[data-search]');
    if (searchInput) {
        searchInput.value = '';
        searchProducts('');
    }
}

function addToWishlist(productId) {
    let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    if (!wishlist.includes(productId)) {
        wishlist.push(productId);
        localStorage.setItem('wishlist', JSON.stringify(wishlist));
    }
}

function removeFromWishlist(productId) {
    let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    wishlist = wishlist.filter(id => id !== productId);
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
}

function showProductNotification(message, type = 'info') {
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

function initializeTooltips() {
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
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

window.filterByPrice = filterByPrice;
window.clearSearch = clearSearch;
