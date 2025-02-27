package org.example.pos_system.service;

import org.example.pos_system.dto.OrderDTO;
import org.example.pos_system.dto.PlaceOrderDTO;

import java.util.List;

public interface OrderService {
    List<OrderDTO> getAllOrders();
    void placeOrder(PlaceOrderDTO placeOrderDTO);
    double getTotalRevenue();
}
