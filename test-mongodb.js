// This script can be used to test the MongoDB connection
// Run it using: mongosh "mongodb://admin:password@localhost:27017/e-commerce?authSource=admin" --file test-mongodb.js

// Print MongoDB version
print("MongoDB server version: " + db.version());

// Switch to the e-commerce database
db = db.getSiblingDB('e-commerce');

// List all collections
print("\nCollections in e-commerce database:");
db.getCollectionNames().forEach(function (collection) {
    print(" - " + collection);
});

// Count documents in inventory collection
if (db.getCollectionNames().includes('inventory')) {
    const count = db.inventory.countDocuments();
    print("\nNumber of documents in inventory collection: " + count);

    // Print a sample document if any exist
    if (count > 0) {
        print("\nSample inventory document:");
        print(JSON.stringify(db.inventory.findOne(), null, 2));
    }
} else {
    print("\nInventory collection does not exist yet.");
}

print("\nMongoDB connection test completed successfully!");
