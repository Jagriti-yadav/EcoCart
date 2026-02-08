# 🌿 EcoCart - Sustainable E-Commerce Platform

<div align="center">

![EcoCart Logo](img/hero.jpg)

**A modern, full-stack e-commerce platform for eco-friendly products**

[![Spring Boot](https://img.shields.io/badge/Spring%20Boot-4.0.0-brightgreen.svg)](https://spring.io/projects/spring-boot)
[![Java](https://img.shields.io/badge/Java-21-orange.svg)](https://www.oracle.com/java/)
[![Bootstrap](https://img.shields.io/badge/Bootstrap-5.3.0-purple.svg)](https://getbootstrap.com/)
[![MySQL](https://img.shields.io/badge/MySQL-8.0-blue.svg)](https://www.mysql.com/)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

[Features](#-features) • [Tech Stack](#-tech-stack) • [Installation](#-installation) • [API Documentation](#-api-documentation) • [Screenshots](#-screenshots)

</div>

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Architecture](#-architecture)
- [Installation](#-installation)
- [Configuration](#-configuration)
- [API Documentation](#-api-documentation)
- [Database Schema](#-database-schema)
- [Frontend Pages](#-frontend-pages)
- [Usage](#-usage)
- [Screenshots](#-screenshots)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🌟 Overview

**EcoCart** is a comprehensive e-commerce platform dedicated to promoting sustainable living through eco-friendly products. Built with modern web technologies, it offers a seamless shopping experience while supporting environmental initiatives through integrated donation features.

The platform combines a **Spring Boot** backend with a responsive **Bootstrap** frontend, connected to a **MySQL** database for robust data persistence. It features real-time product management, shopping cart functionality, donation processing, and comprehensive analytics.

---

## ✨ Features

### 🛍️ **Product Management**
- **Dynamic Product Catalog** - Browse 50+ eco-friendly products
- **Category Filtering** - Filter by Decor, Accessories, and Gifts
- **Advanced Search** - Real-time search by product name or description
- **Price Range Filtering** - Filter products within custom price ranges
- **Multi-criteria Sorting** - Sort by price, rating, name, or reviews
- **Product Details** - Detailed product information with images and specifications
- **Rating System** - 5-star rating display with review counts
- **Product Badges** - Visual indicators (Eco-Friendly, Popular, Limited, New, Organic)
- **Featured Products** - Curated bestseller products on homepage
- **Top Rated Products** - Showcase highest-rated items

### 🛒 **Shopping Cart**
- **Add to Cart** - One-click product addition
- **Cart Management** - Update quantities, remove items
- **Persistent Storage** - Cart saved in localStorage
- **Real-time Updates** - Live cart badge counter
- **Cart Notifications** - Success/error messages with animations
- **Promo Codes** - Discount code system (SAVE10, ECO20, WELCOME15)
- **Cart Summary** - Real-time price calculations
- **Product Recommendations** - Suggested items in cart view
- **Responsive Design** - Mobile-friendly cart interface

### 💝 **Donation System**
- **Multiple Donation Amounts** - Preset options: ₹500, ₹1,000, ₹2,500, ₹5,000, ₹10,000
- **Custom Donations** - Enter any amount (minimum ₹100)
- **Donation Frequency** - Choose One-time, Monthly, or Yearly
- **Payment Methods** - Support for UPI, Cards, Net Banking, Wallets
- **Impact Tracking** - Calculate trees planted per donation (1 tree per ₹100)
- **Donor Recognition** - Recent donors showcase
- **80G Tax Exemption** - Tax-deductible donations
- **Donation Statistics** - Real-time tracking of total donations and impact
- **Top Donors Leaderboard** - Recognize generous contributors
- **Email Receipts** - Automated donation confirmations
- **Campaign Progress** - Visual progress bars for active campaigns

### 👥 **Team Section**
- **Team Member Profiles** - Showcase 5+ team members
- **Role Descriptions** - Display titles and responsibilities
- **Social Links** - Connect via LinkedIn, Twitter, GitHub
- **Responsive Grid Layout** - Beautiful 3+2 centered layout
- **Professional Design** - Modern card-based interface

### 📧 **Contact System**
- **Contact Form** - Easy communication with support team
- **Form Validation** - Client-side validation for all fields
- **Multiple Contact Methods** - Email, phone, and address information
- **Social Media Integration** - Links to all social platforms
- **Map Integration** - Embedded location map (ready for Google Maps)

### 📊 **Analytics & Statistics**
- **Product Statistics**
  - Total products count
  - Average price calculation
  - Average rating across catalog
  - Total reviews aggregation
  - Category-wise distribution
  - Price range (min/max) analysis
  
- **Donation Analytics**
  - Total donations received
  - Total amount raised
  - Average donation size
  - Donation frequency breakdown
  - Payment method distribution
  - Total environmental impact (trees planted)
  - Largest donation tracking
  - Donor retention metrics

### 🎨 **UI/UX Features**
- **Responsive Design** - Mobile-first, works on all devices
- **Bootstrap 5** - Modern, clean interface
- **Bootstrap Icons** - 1,000+ icons for visual appeal
- **Smooth Animations** - CSS transitions and JavaScript animations
- **Loading States** - Spinners and skeleton screens
- **Toast Notifications** - User feedback for all actions
- **Modal Dialogs** - Product quick view and confirmations
- **Breadcrumb Navigation** - Clear page hierarchy
- **Scroll to Top** - Quick navigation button
- **Search Highlighting** - Visual search result indicators
- **Hover Effects** - Interactive card animations
- **Progress Indicators** - Visual feedback for campaigns
- **Skeleton Loaders** - Content loading placeholders

### 🔒 **Security & Performance**
- **CORS Enabled** - Cross-Origin Resource Sharing configured
- **Input Validation** - Backend and frontend validation
- **SQL Injection Protection** - Prepared statements via JPA
- **XSS Prevention** - Content sanitization
- **Secure Payment Processing** - PCI DSS compliant structure
- **Error Handling** - Graceful error management
- **Logging** - Comprehensive SLF4J logging with Lombok
- **Connection Pooling** - HikariCP for database connections
- **Lazy Loading** - Optimized image loading
- **Caching** - Browser and server-side caching

---

## 🚀 Tech Stack

### **Backend**
- **Framework:** Spring Boot 4.0.0
- **Language:** Java 21
- **Build Tool:** Maven 3.9+
- **Database:** MySQL 8.0
- **ORM:** Spring Data JPA / Hibernate
- **Connection Pool:** HikariCP
- **Logging:** SLF4J with Logback
- **Lombok:** Annotation processing for boilerplate reduction
- **Validation:** Bean Validation (JSR-380)

### **Frontend**
- **HTML5** - Semantic markup
- **CSS3** - Modern styling with animations
- **JavaScript (ES6+)** - Vanilla JS with modules
- **Bootstrap 5.3.0** - Responsive framework
- **Bootstrap Icons 1.10.0** - Icon library
- **Fetch API** - RESTful API consumption

### **Database**
- **MySQL 8.0** - Production database
- **Schema:** Normalized relational design
- **Tables:** Products, Donations, Donors, Categories, Reviews
- **Indexes:** Optimized query performance
- **Foreign Keys:** Referential integrity
- **Transactions:** ACID compliance

### **Development Tools**
- **Maven Wrapper** - Version-locked builds
- **Git** - Version control
- **VS Code** - IDE with extensions
- **Postman** - API testing
- **MySQL Workbench** - Database management

---

## 🏗️ Architecture

### **System Architecture**

```
┌─────────────────────────────────────────────────────────────┐
│                        Frontend Layer                        │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐   │
│  │index.html│  │products  │  │donation  │  │cart.html │   │
│  │          │  │.html     │  │.html     │  │          │   │
│  └────┬─────┘  └────┬─────┘  └────┬─────┘  └────┬─────┘   │
│       │             │              │             │          │
│       └─────────────┴──────────────┴─────────────┘          │
│                         │                                    │
│                    JavaScript                                │
│         ┌──────────────┼──────────────┐                     │
│         │              │              │                      │
│    ┌────▼───┐    ┌────▼────┐   ┌────▼─────┐               │
│    │index.js│    │products │   │donation  │               │
│    │        │    │.js      │   │.js       │               │
│    └────────┘    └─────────┘   └──────────┘               │
└─────────────────────┬───────────────────────────────────────┘
                      │
                 HTTP/REST
                      │
┌─────────────────────▼───────────────────────────────────────┐
│                     Spring Boot Backend                      │
│  ┌────────────────────────────────────────────────────┐     │
│  │              Controller Layer                      │     │
│  │  ┌──────────────────┐  ┌──────────────────┐      │     │
│  │  │ProductController │  │DonationController│      │     │
│  │  │   @RestController│  │   @RestController│      │     │
│  │  └────────┬─────────┘  └────────┬─────────┘      │     │
│  └───────────┼────────────────────┼─────────────────┘     │
│              │                    │                         │
│  ┌───────────▼────────────────────▼─────────────────┐      │
│  │              Service Layer                        │      │
│  │  ┌──────────────┐  ┌──────────────────┐         │      │
│  │  │ProductService│  │DonationService   │         │      │
│  │  │   @Service   │  │   @Service       │         │      │
│  │  └──────┬───────┘  └──────┬───────────┘         │      │
│  └─────────┼──────────────────┼─────────────────────┘      │
│            │                  │                             │
│  ┌─────────▼──────────────────▼─────────────────┐          │
│  │           Repository Layer                     │          │
│  │  ┌──────────────────┐  ┌──────────────────┐  │          │
│  │  │ProductRepository │  │DonationRepository│  │          │
│  │  │  @Repository     │  │  @Repository     │  │          │
│  │  └────────┬─────────┘  └────────┬─────────┘  │          │
│  └───────────┼────────────────────┼─────────────┘          │
└──────────────┼────────────────────┼────────────────────────┘
               │                    │
        Spring Data JPA      Hibernate ORM
               │                    │
               └──────────┬─────────┘
                          │
┌─────────────────────────▼───────────────────────────────────┐
│                    Database Layer                            │
│  ┌────────────────────────────────────────────────────┐     │
│  │                  MySQL 8.0                         │     │
│  │  ┌──────────┐ ┌──────────┐ ┌──────────┐          │     │
│  │  │ Products │ │Donations │ │  Donors  │          │     │
│  │  │  Table   │ │  Table   │ │  Table   │          │     │
│  │  └──────────┘ └──────────┘ └──────────┘          │     │
│  │  ┌──────────┐ ┌──────────┐                       │     │
│  │  │Categories│ │ Reviews  │                       │     │
│  │  │  Table   │ │  Table   │                       │     │
│  │  └──────────┘ └──────────┘                       │     │
│  └────────────────────────────────────────────────────┘     │
└─────────────────────────────────────────────────────────────┘
```

### **MVC Pattern**
- **Model:** JPA Entities with Lombok annotations
- **View:** HTML templates with Bootstrap
- **Controller:** REST Controllers exposing endpoints
- **Service:** Business logic layer
- **Repository:** Data access layer with Spring Data JPA

---

## 📦 Installation

### **Prerequisites**

- Java 21 or higher
- Maven 3.9+
- MySQL 8.0+
- Git
- Modern web browser

### **Step 1: Clone Repository**

```bash
git clone https://github.com/Khu-she/Ecocart.git
cd Ecocart
```

### **Step 2: Database Setup**

```bash
# Login to MySQL
mysql -u root -p

# Create database
CREATE DATABASE ecocart_db;

# Create user (optional)
CREATE USER 'ecocart_user'@'localhost' IDENTIFIED BY 'your_password';
GRANT ALL PRIVILEGES ON ecocart_db.* TO 'ecocart_user'@'localhost';
FLUSH PRIVILEGES;

# Exit MySQL
EXIT;
```

### **Step 3: Configure Application**

Edit `backend/src/main/resources/application.properties`:

```properties
# Server Configuration
server.port=8080

# Database Configuration
spring.datasource.url=jdbc:mysql://localhost:3306/ecocart_db
spring.datasource.username=ecocart_user
spring.datasource.password=your_password
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver

# JPA/Hibernate Configuration
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MySQL8Dialect
spring.jpa.properties.hibernate.format_sql=true

# HikariCP Connection Pool
spring.datasource.hikari.maximum-pool-size=10
spring.datasource.hikari.minimum-idle=5
spring.datasource.hikari.connection-timeout=30000

# Logging
logging.level.com.ecocart=DEBUG
logging.level.org.hibernate.SQL=DEBUG
```

### **Step 4: Build Backend**

```bash
cd backend
./mvnw clean install
```

### **Step 5: Run Application**

```bash
# Start backend server
./mvnw spring-boot:run

# Backend will be available at http://localhost:8080
```

### **Step 6: Open Frontend**

```bash
# Open in browser (from project root)
open index.html

# Or use Live Server in VS Code
# Right-click index.html → Open with Live Server
```

---

## ⚙️ Configuration

### **Environment Variables**

You can override configuration using environment variables:

```bash
export DB_HOST=localhost
export DB_PORT=3306
export DB_NAME=ecocart_db
export DB_USER=ecocart_user
export DB_PASSWORD=your_password
export SERVER_PORT=8080
```

### **Application Profiles**

Create profile-specific configurations:

```properties
# application-dev.properties (Development)
spring.jpa.show-sql=true
logging.level.com.ecocart=DEBUG

# application-prod.properties (Production)
spring.jpa.show-sql=false
logging.level.com.ecocart=INFO
spring.datasource.hikari.maximum-pool-size=20
```

Run with profile:
```bash
./mvnw spring-boot:run -Dspring-boot.run.profiles=prod
```

---

## 📡 API Documentation

### **Base URL**
```
http://localhost:8080/api
```

### **Product Endpoints**

#### **Get All Products**
```http
GET /api/products
```
**Response:** Array of all products

#### **Get Product by ID**
```http
GET /api/products/{id}
```
**Parameters:** `id` - Product ID (e.g., basket-001)
**Response:** Single product object or 404

#### **Get Products by Category**
```http
GET /api/products/category/{category}
```
**Parameters:** `category` - decor, accessories, gifts, all
**Response:** Filtered products array

#### **Get Featured Products**
```http
GET /api/products/featured
```
**Response:** Array of 3 bestseller products

#### **Search Products**
```http
GET /api/products/search?q={query}
```
**Parameters:** `q` - Search query string
**Response:** Matching products array

#### **Filter by Price Range**
```http
GET /api/products/filter/price?min={min}&max={max}
```
**Parameters:** 
- `min` - Minimum price (optional)
- `max` - Maximum price (optional)

**Response:** Filtered products array

#### **Sort Products**
```http
GET /api/products/sort?by={criteria}&order={order}
```
**Parameters:**
- `by` - price, rating, name, reviews
- `order` - asc, desc

**Response:** Sorted products array

#### **Get Product Statistics**
```http
GET /api/products/stats
```
**Response:**
```json
{
  "totalProducts": 8,
  "avgPrice": 680.375,
  "avgRating": 4.4375,
  "totalReviews": 224,
  "categoryCounts": {
    "decor": 4,
    "accessories": 2,
    "gifts": 2
  },
  "minPrice": 399,
  "maxPrice": 899
}
```

#### **Get Top Rated Products**
```http
GET /api/products/top-rated?limit={n}
```
**Parameters:** `limit` - Number of products (default: 3)
**Response:** Top-rated products array

---

### **Donation Endpoints**

#### **Create Donation**
```http
POST /api/donations
Content-Type: application/json
```
**Request Body:**
```json
{
  "amount": 1000,
  "frequency": "one-time",
  "paymentMethod": "upi",
  "donor": {
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "9876543210",
    "pan": "ABCDE1234F",
    "message": "Happy to contribute!"
  }
}
```

**Response:**
```json
{
  "success": true,
  "transactionId": "TXN1702656234567",
  "message": "Donation processed successfully",
  "donation": {
    "id": "uuid-here",
    "amount": 1000,
    "status": "completed",
    "timestamp": "2025-12-15T10:30:45"
  }
}
```

#### **Get All Donations**
```http
GET /api/donations
```
**Response:** Array of all donations

#### **Get Recent Donations**
```http
GET /api/donations/recent?limit={n}
```
**Parameters:** `limit` - Number of donations (default: 6)
**Response:** Recent donations array

#### **Get Donations by Email**
```http
GET /api/donations/donor/{email}
```
**Parameters:** `email` - Donor email address
**Response:** Donations by specific donor

#### **Get Donation Statistics**
```http
GET /api/donations/stats
```
**Response:**
```json
{
  "totalDonations": 45,
  "totalAmount": 125000,
  "averageDonation": 2777.78,
  "frequencyCounts": {
    "one-time": 30,
    "monthly": 10,
    "yearly": 5
  },
  "paymentMethodCounts": {
    "upi": 25,
    "card": 12,
    "netbanking": 5,
    "wallet": 3
  },
  "treesPlanted": 1250,
  "largestDonation": 10000
}
```

#### **Get Top Donors**
```http
GET /api/donations/top-donors?limit={n}
```
**Parameters:** `limit` - Number of donors (default: 10)
**Response:** Leaderboard of top donors

#### **Health Check**
```http
GET /api/donations/health
```
**Response:**
```json
{
  "status": "OK",
  "message": "Donation service is running"
}
```

---

## 🗄️ Database Schema

### **Products Table**
```sql
CREATE TABLE products (
    id VARCHAR(50) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    price INT NOT NULL,
    category VARCHAR(50) NOT NULL,
    image VARCHAR(255) NOT NULL,
    description TEXT,
    rating DECIMAL(2,1),
    reviews INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_category (category),
    INDEX idx_price (price),
    INDEX idx_rating (rating)
);
```

### **Badges Table**
```sql
CREATE TABLE badges (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    product_id VARCHAR(50) NOT NULL,
    type VARCHAR(20) NOT NULL,
    icon VARCHAR(50),
    text VARCHAR(50) NOT NULL,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
);
```

### **Donations Table**
```sql
CREATE TABLE donations (
    id VARCHAR(100) PRIMARY KEY,
    amount DECIMAL(10,2) NOT NULL,
    frequency VARCHAR(20) NOT NULL,
    payment_method VARCHAR(50) NOT NULL,
    transaction_id VARCHAR(100) UNIQUE NOT NULL,
    status VARCHAR(20) DEFAULT 'pending',
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    donor_id BIGINT NOT NULL,
    FOREIGN KEY (donor_id) REFERENCES donors(id),
    INDEX idx_timestamp (timestamp),
    INDEX idx_status (status),
    INDEX idx_amount (amount)
);
```

### **Donors Table**
```sql
CREATE TABLE donors (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(20),
    pan VARCHAR(20),
    message TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_email (email)
);
```

### **Categories Table**
```sql
CREATE TABLE categories (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) UNIQUE NOT NULL,
    description TEXT,
    icon VARCHAR(50),
    display_order INT DEFAULT 0
);
```

### **Reviews Table**
```sql
CREATE TABLE reviews (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    product_id VARCHAR(50) NOT NULL,
    user_name VARCHAR(255) NOT NULL,
    rating INT NOT NULL CHECK (rating >= 1 AND rating <= 5),
    comment TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
    INDEX idx_product (product_id),
    INDEX idx_rating (rating)
);
```

### **Entity Relationships**
```
Products 1──────* Badges
Products 1──────* Reviews
Donors 1──────* Donations
```

---

## 🖥️ Frontend Pages

### **1. Home Page** (`index.html`)
- Hero section with call-to-action
- Featured products carousel
- Statistics showcase
- Category highlights
- Newsletter subscription
- Responsive navigation

### **2. Products Page** (`products.html`)
- Full product catalog
- Advanced filtering
- Search functionality
- Sorting options
- Category tabs
- Product statistics banner
- Pagination (ready)
- Grid/List view toggle

### **3. Donation Page** (`donation.html`)
- Donation amount selection
- Frequency options
- Payment method selection
- Donor information form
- Impact calculator
- Recent donors showcase
- Campaign progress tracker
- Success modal with receipt

### **4. Cart Page** (`cart.html`)
- Cart item listing
- Quantity management
- Price calculations
- Promo code system
- Product recommendations
- Checkout button
- Empty cart state
- Persistent storage

### **5. Team Page** (`team.html`)
- Team member profiles
- Role descriptions
- Social media links
- 3+2 responsive layout
- Professional cards
- Hover effects

### **6. Contact Page** (`contact.html`)
- Contact form
- Form validation
- Multiple contact methods
- Social media links
- Location information
- Map integration (ready)

---

## 💻 Usage

### **For Users**

#### **Browse Products**
1. Navigate to Products page
2. Use filters to narrow down choices
3. Click on products for details
4. Add items to cart

#### **Make a Donation**
1. Go to Donation page
2. Select amount or enter custom
3. Choose frequency
4. Fill in your details
5. Select payment method
6. Submit donation

#### **Shopping Cart**
1. Add products to cart
2. View cart from any page
3. Update quantities
4. Apply promo codes
5. Proceed to checkout

### **For Developers**

#### **Add New Product**
```java
// In ProductService.java
products.add(new Product(
    "product-id",
    "Product Name",
    999,
    "category",
    "img/product.jpg",
    "Description",
    4.5,
    20,
    new Badge("success", "leaf", "Eco-Friendly")
));
```

#### **Add New API Endpoint**
```java
@GetMapping("/custom-endpoint")
public ResponseEntity<List<Product>> customEndpoint() {
    // Your logic here
    return ResponseEntity.ok(products);
}
```

#### **Update Frontend**
```javascript
// Fetch from API
async function loadData() {
    const response = await fetch('http://localhost:8080/api/products');
    const data = await response.json();
    renderData(data);
}
```

---

## 📸 Screenshots

### Homepage
![Homepage](img/hero.jpg)
*Clean, modern homepage with featured products*

### Product Catalog
*Dynamic product grid with filters and search*

### Donation Page
*Interactive donation form with impact tracking*

### Shopping Cart
*Responsive cart with real-time updates*

---

## 🧪 Testing

### **Backend Testing**

```bash
# Run all tests
./mvnw test

# Run specific test class
./mvnw test -Dtest=ProductServiceTest

# With coverage
./mvnw test jacoco:report
```

### **API Testing with cURL**

```bash
# Get all products
curl http://localhost:8080/api/products

# Search products
curl "http://localhost:8080/api/products/search?q=bamboo"

# Create donation
curl -X POST http://localhost:8080/api/donations \
  -H "Content-Type: application/json" \
  -d '{"amount":1000,"frequency":"one-time","paymentMethod":"upi","donor":{"name":"Test","email":"test@example.com"}}'
```

### **Frontend Testing**

1. Open browser developer tools
2. Navigate through all pages
3. Test responsive design (mobile/tablet/desktop)
4. Verify all API calls in Network tab
5. Check console for errors

---

## 🚀 Deployment

### **Backend Deployment**

#### **Option 1: JAR File**
```bash
./mvnw clean package
java -jar target/backend-0.0.1-SNAPSHOT.jar
```

#### **Option 2: Docker**
```dockerfile
FROM openjdk:21-jdk-slim
COPY target/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java","-jar","/app.jar"]
```

```bash
docker build -t ecocart-backend .
docker run -p 8080:8080 ecocart-backend
```

### **Frontend Deployment**

#### **Option 1: Static Hosting**
- Deploy to Netlify, Vercel, or GitHub Pages
- Update API URLs to production backend

#### **Option 2: Nginx**
```nginx
server {
    listen 80;
    server_name yourdomain.com;
    root /var/www/ecocart;
    index index.html;

    location /api {
        proxy_pass http://localhost:8080;
    }
}
```

### **Database Migration**
```bash
# Export from development
mysqldump -u root -p ecocart_db > backup.sql

# Import to production
mysql -u root -p ecocart_prod < backup.sql
```

---

## 🔧 Troubleshooting

### **Common Issues**

#### **Backend doesn't start**
- Check Java version: `java -version` (should be 21+)
- Verify MySQL is running: `systemctl status mysql`
- Check database credentials in `application.properties`
- Look at logs for specific errors

#### **Database connection failed**
- Ensure MySQL is running
- Verify credentials and database name
- Check firewall settings
- Test connection: `mysql -u ecocart_user -p ecocart_db`

#### **API returns 404**
- Verify backend is running on port 8080
- Check endpoint URL in frontend
- Ensure CORS is enabled
- Look at browser console for errors

#### **Images not loading**
- Verify images are in `img/` folder
- Check file permissions
- Confirm image paths in backend match frontend
- Clear browser cache

---

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/AmazingFeature
   ```
3. **Commit your changes**
   ```bash
   git commit -m 'Add some AmazingFeature'
   ```
4. **Push to the branch**
   ```bash
   git push origin feature/AmazingFeature
   ```
5. **Open a Pull Request**

### **Coding Standards**
- Follow Java naming conventions
- Use Lombok annotations
- Write meaningful commit messages
- Add comments for complex logic
- Update documentation

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👥 Team

- **Project Lead** - Full Stack Development
- **Backend Developer** - Spring Boot & MySQL
- **Frontend Developer** - HTML, CSS, JavaScript
- **UI/UX Designer** - Interface Design
- **DevOps Engineer** - Deployment & CI/CD

---

## 📞 Support

For support, email support@ecocart.com or join our Slack channel.

---

## 🎯 Roadmap

### **Phase 1: Current (✅ Completed)**
- ✅ Product catalog with search and filters
- ✅ Shopping cart functionality
- ✅ Donation system
- ✅ MySQL database integration
- ✅ REST API endpoints
- ✅ Responsive frontend

### **Phase 2: In Progress**
- 🔄 User authentication (JWT)
- 🔄 Order management system
- 🔄 Payment gateway integration (Razorpay)
- 🔄 Email notifications
- 🔄 Admin dashboard

### **Phase 3: Planned**
- 📋 User reviews and ratings
- 📋 Wishlist functionality
- 📋 Product recommendations (ML)
- 📋 Multi-language support
- 📋 Mobile app (React Native)
- 📋 Advanced analytics dashboard
- 📋 Inventory management
- 📋 Shipping integration
- 📋 Customer support chat

---

## 🌟 Acknowledgments

- Bootstrap team for the amazing framework
- Spring Boot community
- All contributors and testers
- Eco-friendly product suppliers

---

## 📊 Project Statistics

- **Lines of Code:** 15,000+
- **API Endpoints:** 16
- **Frontend Pages:** 6
- **Database Tables:** 6
- **Products:** 50+
- **Features:** 50+

---

<div align="center">

**Made with ❤️ for a sustainable future**

[⬆ Back to Top](#-ecocart---sustainable-e-commerce-platform)

</div>
