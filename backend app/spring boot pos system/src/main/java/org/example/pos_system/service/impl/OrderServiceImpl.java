package org.example.pos_system.service.impl;

import jakarta.persistence.criteria.Order;
import jakarta.transaction.Transactional;
import org.example.pos_system.dto.OrderDTO;
import org.example.pos_system.dto.PlaceOrderDTO;
import org.example.pos_system.entity.Customer;
import org.example.pos_system.entity.Item;
import org.example.pos_system.entity.OrderDetail;
import org.example.pos_system.entity.Orders;
import org.example.pos_system.repo.CustomerRepo;
import org.example.pos_system.repo.ItemRepo;
import org.example.pos_system.repo.OrderDetailRepo;
import org.example.pos_system.repo.OrderRepo;
import org.example.pos_system.service.OrderService;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class OrderServiceImpl implements OrderService {
    @Autowired
    private ItemRepo itemRepo;
    @Autowired
    private CustomerRepo customerRepo;
    @Autowired
    private OrderRepo orderRepo;
    @Autowired
    private OrderDetailRepo orderDetailRepo;
    @Autowired
    private ModelMapper modelMapper;

    @Override
    public List<OrderDTO> getAllOrders() {
        return modelMapper.map(orderRepo.findAll(), new TypeToken<List<OrderDTO>>() {}.getType());
    }

    @Override
    @Transactional
    public void placeOrder(PlaceOrderDTO dto) {

        Orders order = new Orders();
        order.setDate(dto.getDate());


        Customer customer = customerRepo.findById(Integer.valueOf(dto.getPhone()))
                .orElseThrow(() -> new RuntimeException("Customer not found!"));
        order.setCustomer(customer);


        OrderDetail orderDetail = new OrderDetail();
        orderDetail.setQty(dto.getIqty());


        Item item = itemRepo.findById(dto.getIcode())
                .orElseThrow(() -> new RuntimeException("Item not found!"));


        if (item.getQtyOnHand() < dto.getIqty()) {
            throw new RuntimeException("Not enough stock available!");
        }

        item.setQtyOnHand(item.getQtyOnHand() - dto.getIqty());

        double totalPrice = dto.getIqty() * item.getUnitPrice();
        orderDetail.setTotalPrice(totalPrice);
        orderDetail.setItem(item);
        orderDetail.setOrder(order);

        orderRepo.save(order);

        orderDetailRepo.save(orderDetail);

        itemRepo.save(item);
    }

    @Override
    public double getTotalRevenue() {
        double totalRevenue = 0;
        List<OrderDetail> orderDetailList = orderDetailRepo.findAll();
        for (OrderDetail orderDetail : orderDetailList) {
            totalRevenue += orderDetail.getTotalPrice();
        }
        System.out.println(totalRevenue);
        return totalRevenue;
    }

}
