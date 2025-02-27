package org.example.pos_system.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class OrderDetailDTO {
    private int id;
    private int qty;
    private double totalPrice;
    private String itemCode;
    private int orderId;
}
