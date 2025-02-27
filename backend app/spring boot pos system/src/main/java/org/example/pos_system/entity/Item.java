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
    private String item_code;
    private String description;
    private int qty_on_hand;
    private double unit_price;

    @OneToMany(mappedBy = "item",cascade = CascadeType.ALL)
    private List<OrderDetail> order_details;

}
