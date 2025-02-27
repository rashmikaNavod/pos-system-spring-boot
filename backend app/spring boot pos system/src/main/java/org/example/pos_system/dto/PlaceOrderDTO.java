package org.example.pos_system.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class PlaceOrderDTO {
    private String date;
    private String phone;
    private String icode;
    private int qtyOnHand;
    private double unitPrice;
    private int iqty;
}
