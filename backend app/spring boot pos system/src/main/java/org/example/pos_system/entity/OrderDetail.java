package org.example.pos_system.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Entity
public class OrderDetail {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private int qty;
    private double totalPrice;

    @ManyToOne
    @JoinColumn(name = "item_code",referencedColumnName = "itemCode")
    private Item item;

    @ManyToOne
    @JoinColumn(name = "order_id",referencedColumnName = "id")
    private Orders order;

}
