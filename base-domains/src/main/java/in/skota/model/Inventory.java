package in.skota.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "inventory")
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Inventory {

    @Id
    private String id;

    private String productId;
    private String productName;
    private int quantity;
    private double price;
    private String category;
    private boolean isInStock;
    private String imageUrl;

    // Helper method to check if there's enough stock
    public boolean hasStock(int requiredQuantity) {
        return this.quantity >= requiredQuantity;
    }

    // Helper method to reduce stock
    public void reduceStock(int quantity) {
        if (this.quantity >= quantity) {
            this.quantity -= quantity;
            this.isInStock = this.quantity > 0;
        } else {
            throw new IllegalArgumentException("Not enough stock available");
        }
    }
}
