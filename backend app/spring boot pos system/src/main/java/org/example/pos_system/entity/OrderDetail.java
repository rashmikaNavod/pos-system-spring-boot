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
    private double total_price;

    @ManyToOne
    @JoinColumn(name = "item_code",referencedColumnName = "item_code")
    private Item item;

    @ManyToOne
    @JoinColumn(name = "order_id",referencedColumnName = "id")
    private Orders order;

}
