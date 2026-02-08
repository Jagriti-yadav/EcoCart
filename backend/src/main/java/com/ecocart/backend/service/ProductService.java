package com.ecocart.backend.service;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.ecocart.backend.model.Badge;
import com.ecocart.backend.model.Product;
import com.ecocart.backend.repository.ProductRepository;

import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
@RequiredArgsConstructor
public class ProductService {
    
    private final ProductRepository productRepository;

    @PostConstruct
    public void initializeProducts() {
        if (productRepository.count() > 0) {
            log.info("Products already exist in database");
            return;
        }
        
        log.info("Initializing product catalog...");
        
        productRepository.save(new Product(
            null,
            "Handwoven Basket",
            499,
            "decor",
            "img/basket.jpg",
            "Beautiful handwoven basket made from natural materials",
            4.0,
            24,
            new Badge("success", "leaf", "Eco-Friendly")
        ));

        productRepository.save(new Product(
            null,
            "Clay Pot",
            699,
            "decor",
            "img/pot2.jpg",
            "Traditional clay pot perfect for cooking and storage",
            4.5,
            18,
            new Badge("warning", "fire", "Popular")
        ));

        productRepository.save(new Product(
            null,
            "Bamboo Lamp",
            899,
            "decor",
            "img/lamp.jpg",
            "Elegant bamboo lamp with soft ambient lighting",
            5.0,
            32,
            new Badge("danger", "lightning", "Limited")
        ));

        productRepository.save(new Product(
            null,
            "Jute Bag",
            549,
            "accessories",
            "img/bag.jpg",
            "Durable and eco-friendly jute shopping bag",
            4.0,
            15,
            new Badge("info", "stars", "New")
        ));

        productRepository.save(new Product(
            null,
            "Recycled Cup Set",
            749,
            "gifts",
            "img/cup.jpg",
            "Set of 4 cups made from recycled materials",
            4.0,
            21,
            null
        ));

        productRepository.save(new Product(
            null,
            "Bamboo Furniture",
            899,
            "decor",
            "img/bamboo.jpg",
            "Sustainable bamboo furniture for modern homes",
            4.5,
            28,
            null
        ));

        productRepository.save(new Product(
            null,
            "Organic Soap Set",
            399,
            "gifts",
            "img/soap.jpg",
            "Natural organic soap set with essential oils",
            5.0,
            45,
            new Badge("success", "flower1", "Organic")
        ));

        productRepository.save(new Product(
            null,
            "Glass Water Bottle",
            599,
            "accessories",
            "img/bottle.jpg",
            "Reusable glass water bottle with bamboo cap",
            4.0,
            33,
            null
        ));
        
        log.info("Product catalog initialized with {} products", productRepository.count());
    }

    public List<Product> getAllProducts() {
        log.debug("Fetching all products");
        return productRepository.findAll();
    }

    public List<Product> getProductsByCategory(String category) {
        log.debug("Fetching products by category: {}", category);
        if ("all".equalsIgnoreCase(category)) {
            return getAllProducts();
        }
        return productRepository.findByCategory(category);
    }

    public List<Product> getFeaturedProducts() {
        log.debug("Fetching featured products");
        return productRepository.findAll(Sort.by(Sort.Direction.DESC, "rating"))
                .stream()
                .limit(3)
                .toList();
    }

    public Optional<Product> getProductById(Long id) {
        log.debug("Fetching product by ID: {}", id);
        return productRepository.findById(id);
    }
    
    public Product saveProduct(Product product) {
        log.info("Saving product: {}", product.getName());
        return productRepository.save(product);
    }
    
    public void deleteProduct(Long id) {
        log.info("Deleting product with ID: {}", id);
        productRepository.deleteById(id);
    }
}
