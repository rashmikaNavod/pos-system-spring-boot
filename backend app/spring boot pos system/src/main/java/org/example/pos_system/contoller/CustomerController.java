package org.example.pos_system.contoller;

import org.example.pos_system.dto.CustomerDTO;
import org.example.pos_system.entity.Customer;
import org.example.pos_system.service.CustomerService;
import org.example.pos_system.util.ResponseUtil;
import org.example.pos_system.util.VarList;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
@RequestMapping("api/v1/customer")
public class CustomerController {
    @Autowired
    private CustomerService customerService;
    @Autowired
    private ResponseUtil responseUtil;

    @PostMapping(path = "save")
    public ResponseEntity saveCustomer(@RequestBody CustomerDTO customerDTO) {
        customerService.addCustomer(customerDTO);
        responseUtil.setCode(VarList.RSP_SUCCESS);
        responseUtil.setMsg("Customer saved successfully");
        responseUtil.setData(customerDTO);
        return new ResponseEntity(responseUtil, HttpStatus.ACCEPTED);
    }

    @GetMapping(path = "getAll")
    public ResponseEntity getAllCustomer() {
        responseUtil.setCode(VarList.RSP_SUCCESS);
        responseUtil.setMsg("Customer list retrieved");
        responseUtil.setData(customerService.getAllCustomers());
        return new ResponseEntity(responseUtil, HttpStatus.ACCEPTED);
    }

    @PutMapping(path = "update")
    public ResponseEntity updateCustomer(@RequestBody CustomerDTO customerDTO) {
        customerService.updateCustomer(customerDTO);
        responseUtil.setCode(VarList.RSP_SUCCESS);
        responseUtil.setMsg("Customer updated successfully");
        responseUtil.setData(customerDTO);
        return new ResponseEntity(responseUtil, HttpStatus.ACCEPTED);
    }

    @DeleteMapping(path = "delete/{id}")
    public ResponseEntity deleteCustomer(@PathVariable("id") int id) {
        customerService.deleteCustomer(id);
        responseUtil.setCode(VarList.RSP_SUCCESS);
        responseUtil.setMsg("Customer deleted successfully");
        responseUtil.setData(null);
        return new ResponseEntity(responseUtil, HttpStatus.ACCEPTED);
    }

}
