package org.example.pos_system.service.impl;

import org.example.pos_system.dto.CustomerDTO;
import org.example.pos_system.entity.Customer;
import org.example.pos_system.repo.CustomerRepo;
import org.example.pos_system.service.CustomerService;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CustomerServiceImpl implements CustomerService {
    @Autowired
    private CustomerRepo customerRepo;
    @Autowired
    private ModelMapper modelMapper;

    @Override
    public void addCustomer(CustomerDTO customerDTO) {
        if(customerRepo.existsById(customerDTO.getId())) {
            throw new RuntimeException("Customer already exists");
        }
        customerRepo.save(modelMapper.map(customerDTO, Customer.class));
    }

    @Override
    public void updateCustomer(CustomerDTO customerDTO) {
        if(!customerRepo.existsById(customerDTO.getId())) {
            throw new RuntimeException("Customer does not exist");
        }
        customerRepo.save(modelMapper.map(customerDTO, Customer.class));
    }

    @Override
    public void deleteCustomer(int id) {
        if(!customerRepo.existsById(id)){
            throw new RuntimeException("Customer does not exist");
        }
        customerRepo.deleteById(id);
    }

    @Override
    public List<CustomerDTO> getAllCustomers() {
        return modelMapper.map(customerRepo.findAll(), new TypeToken<List<CustomerDTO>>() {}.getType());
    }

}
