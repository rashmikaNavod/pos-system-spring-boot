package org.example.pos_system.contoller;

import jakarta.persistence.criteria.Order;
import org.example.pos_system.dto.PlaceOrderDTO;
import org.example.pos_system.entity.OrderDetail;
import org.example.pos_system.service.OrderService;
import org.example.pos_system.util.ResponseUtil;
import org.example.pos_system.util.VarList;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
@RequestMapping("api/v1/order")
public class OrderController {

    @Autowired
    private OrderService orderService;
    @Autowired
    private ResponseUtil responseUtil;

    @GetMapping(path = "get_all_orders")
    public ResponseEntity getAllOrders() {
        responseUtil.setCode(VarList.RSP_SUCCESS);
        responseUtil.setMsg("Order list retrieved");
        responseUtil.setData(orderService.getAllOrders());
        return new ResponseEntity(responseUtil, HttpStatus.ACCEPTED);
    }

    @PostMapping(path = "place_order")
    public ResponseEntity placeOrder(@RequestBody PlaceOrderDTO placeOrderDTO) {
        System.out.println(placeOrderDTO);
        orderService.placeOrder(placeOrderDTO);
        responseUtil.setCode(VarList.RSP_SUCCESS);
        responseUtil.setMsg("Order placed successfully");
        return new ResponseEntity(responseUtil, HttpStatus.CREATED);
    }


}
