document.addEventListener('DOMContentLoaded', function() {
    loadFeaturedProducts();
});

async function loadFeaturedProducts() {
    try {
        const response = await fetch('http://localhost:8080/api/products/featured');
        
        if (!response.ok) {
            throw new Error('Failed to fetch featured products');
        }
        
        const products = await response.json();
        renderFeaturedProducts(products);
        
        if (typeof window.initCart === 'function') {
            window.initCart();
        }
        
    } catch (error) {
        console.error('Error fetching featured products:', error);
        showErrorState();
    }
}
function renderFeaturedProducts(products) {
    const grid = document.getElementById('featured-products-grid');
    
    if (!grid) {
        console.error('Featured products grid not found');
        return;
    }
    
    grid.innerHTML = '';
    
    products.forEach((product, index) => {
        const productCard = createFeaturedProductCard(product, index);
        grid.appendChild(productCard);
    });
}

function createFeaturedProductCard(product, index) {
    const col = document.createElement('div');
    col.className = 'col-lg-4 col-md-6';
    
    const badgeHTML = getBadgeHTML(product, index);
    
    const starsHTML = generateStarRating(product.rating);
    
    col.innerHTML = `
        <div class="card border-0 shadow-hover h-100 product-card-enhanced">
            <div class="position-relative overflow-hidden product-image-wrapper">
                <img src="${product.image}" class="card-img-top product-image" alt="${product.name}" style="height: 280px; object-fit: cover;">
                ${badgeHTML}
            </div>
            <div class="card-body d-flex flex-column p-4">
                <h5 class="card-title fw-bold mb-2">${product.name}</h5>
                <p class="card-text text-muted flex-grow-1 mb-3">${product.description}</p>
                <div class="product-rating mb-3">
                    ${starsHTML}
                    <span class="text-muted ms-2">(${product.reviews})</span>
                </div>
                <div class="d-flex justify-content-between align-items-center">
                    <span class="fs-4 fw-bold text-primary">₹${product.price}</span>
                    <button class="btn btn-primary btn-cart add-to-cart-btn" 
                            data-bs-toggle="tooltip" title="Add to Cart"
                            data-product-id="${product.id}"
                            data-product-name="${product.name}"
                            data-product-price="${product.price}"
                            data-product-image="${product.image}">
                        <i class="bi bi-cart-plus me-2"></i>Add to Cart
                    </button>
                </div>
            </div>
        </div>
    `;
    
    return col;
}
function getBadgeHTML(product, index) {
    if (product.badge && product.badge.type) {
        const iconMap = {
            'leaf': 'leaf-fill',
            'fire': 'fire',
            'lightning': 'gem',
            'stars': 'star-fill',
            'flower1': 'flower1'
        };
        
        const icon = iconMap[product.badge.icon] || product.badge.icon;
        
        return `
            <span class="badge bg-${product.badge.type} position-absolute top-0 start-0 m-3 badge-modern">
                <i class="bi bi-${icon} me-1"></i>${product.badge.text}
            </span>
        `;
    }
    const defaultBadges = [
        { type: 'danger', icon: 'star-fill', text: 'Bestseller' },
        { type: 'success', icon: 'leaf-fill', text: 'Eco-Friendly' },
        { type: 'warning', icon: 'gem', text: 'Limited Edition' }
    ];
    
    if (index < defaultBadges.length) {
        const badge = defaultBadges[index];
        return `
            <span class="badge bg-${badge.type} position-absolute top-0 start-0 m-3 badge-modern">
                <i class="bi bi-${badge.icon} me-1"></i>${badge.text}
            </span>
        `;
    }
    
    return '';
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
    const grid = document.getElementById('featured-products-grid');
    if (grid) {
        grid.innerHTML = `
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
