// This script can be used to initialize the MongoDB with sample inventory data
// Run it using: mongosh "mongodb://admin:password@localhost:27017/e-commerce?authSource=admin" --file init-inventory.js

// Switch to the e-commerce database
db = db.getSiblingDB('e-commerce');

// Create inventory collection if it doesn't exist
if (!db.getCollectionNames().includes('inventory')) {
    db.createCollection('inventory');
}

// Clear existing data
db.inventory.deleteMany({});

// Insert sample inventory data
db.inventory.insertMany([
    {
        productId: "P001",
        productName: "Laptop",
        quantity: 50,
        price: 999.99,
        category: "Electronics",
        imageUrl: "https://placehold.co/600x400/3d4451/ffffff?text=Laptop"
    },
    {
        productId: "P002",
        productName: "Smartphone",
        quantity: 100,
        price: 699.99,
        category: "Electronics",
        imageUrl: "https://placehold.co/600x400/3d4451/ffffff?text=Smartphone"
    },
    {
        productId: "P003",
        productName: "Headphones",
        quantity: 200,
        price: 149.99,
        category: "Electronics",
        imageUrl: "https://placehold.co/600x400/3d4451/ffffff?text=Headphones"
    },
    {
        productId: "P004",
        productName: "T-Shirt",
        quantity: 300,
        price: 19.99,
        category: "Clothing",
        imageUrl: "https://placehold.co/600x400/3d4451/ffffff?text=T-Shirt"
    },
    {
        productId: "P005",
        productName: "Jeans",
        quantity: 150,
        price: 49.99,
        category: "Clothing",
        imageUrl: "https://placehold.co/600x400/3d4451/ffffff?text=Jeans"
    },
    {
        productId: "P006",
        productName: "Coffee Maker",
        quantity: 75,
        price: 89.99,
        category: "Home",
        imageUrl: "https://placehold.co/600x400/3d4451/ffffff?text=Coffee+Maker"
    },
    {
        productId: "P007",
        productName: "Blender",
        quantity: 60,
        price: 59.99,
        category: "Home",
        imageUrl: "https://placehold.co/600x400/3d4451/ffffff?text=Blender"
    },
    {
        productId: "P008",
        productName: "Test Product",
        quantity: 10,
        price: 29.99,
        category: "Other",
        imageUrl: "https://placehold.co/600x400/3d4451/ffffff?text=Test+Product"
    }
]);

print("Inventory data initialized successfully!");
