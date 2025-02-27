package org.example.pos_system.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Entity
public class Item {
    @Id
    private String itemCode;
    private String description;
    private int qtyOnHand;
    private double unitPrice;

    @OneToMany(mappedBy = "item",cascade = CascadeType.ALL)
    private List<OrderDetail> OrderDetails;

}
