package org.example.pos_system.contoller;

import org.example.pos_system.service.OrderService;
import org.example.pos_system.util.ResponseUtil;
import org.example.pos_system.util.VarList;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin
@RestController
@RequestMapping("api/v1/order_details")
public class OrderDetailController {
    @Autowired
    private ResponseUtil responseUtil;
    @Autowired
    private OrderService orderService;

    @GetMapping(path = "get_total_revenue")
    public double getTotalRevenue() {
        return orderService.getTotalRevenue();
    }

}
