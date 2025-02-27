package org.example.pos_system.service;

import org.example.pos_system.dto.CustomerDTO;
import org.example.pos_system.entity.Customer;

import java.util.List;

public interface CustomerService {
    void addCustomer(CustomerDTO customerDTO);
    void updateCustomer(CustomerDTO customerDTO);
    void deleteCustomer(int id);
    List<CustomerDTO> getAllCustomers();
}

