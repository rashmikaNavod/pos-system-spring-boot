package org.example.pos_system.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.example.pos_system.entity.OrderDetail;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class ItemDTO {
    private String itemCode;
    private String description;
    private int qtyOnHand;
    private double unitPrice;
    private List<OrderDetailDTO> OrderDetailDTOS;
}
