package in.skota.service;

import in.skota.model.Inventory;
import in.skota.repository.InventoryRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Slf4j
public class InventoryService {

    private final InventoryRepository inventoryRepository;

    public List<Inventory> getAllInventory() {
        return inventoryRepository.findAll();
    }

    public Optional<Inventory> getInventoryById(String id) {
        return inventoryRepository.findById(id);
    }

    public Optional<Inventory> getInventoryByProductId(String productId) {
        return inventoryRepository.findByProductId(productId);
    }

    public Optional<Inventory> getInventoryByProductName(String productName) {
        return inventoryRepository.findByProductName(productName);
    }

    public Inventory saveInventory(Inventory inventory) {
        return inventoryRepository.save(inventory);
    }

    public void deleteInventory(String id) {
        inventoryRepository.deleteById(id);
    }

    public boolean updateInventoryForOrder(String productName, int quantity) {
        Optional<Inventory> inventoryOptional = inventoryRepository.findByProductName(productName);

        if (inventoryOptional.isPresent()) {
            Inventory inventory = inventoryOptional.get();

            if (inventory.hasStock(quantity)) {
                inventory.reduceStock(quantity);
                inventoryRepository.save(inventory);
                log.info("Inventory updated for product: {}, new quantity: {}", productName, inventory.getQuantity());
                return true;
            } else {
                log.warn("Insufficient stock for product: {}, requested: {}, available: {}",
                        productName, quantity, inventory.getQuantity());
                return false;
            }
        } else {
            log.warn("Product not found in inventory: {}", productName);
            return false;
        }
    }
}
