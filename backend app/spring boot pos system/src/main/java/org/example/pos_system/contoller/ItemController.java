package org.example.pos_system.contoller;

import org.example.pos_system.dto.ItemDTO;
import org.example.pos_system.service.ItemService;
import org.example.pos_system.util.ResponseUtil;
import org.example.pos_system.util.VarList;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
@RequestMapping("api/v1/item")
public class ItemController {
    @Autowired
    private ItemService itemService;
    @Autowired
    private ResponseUtil responseUtil;

    @PostMapping(path = "save")
    public ResponseEntity saveItem(@RequestBody ItemDTO itemDTO) {
        itemService.saveItem(itemDTO);
        responseUtil.setCode(VarList.RSP_SUCCESS);
        responseUtil.setMsg("Item saved successfully");
        responseUtil.setData(itemDTO);
        return new ResponseEntity(responseUtil, HttpStatus.ACCEPTED);
    }

    @GetMapping(path = "getAll")
    public ResponseEntity getAllItems() {
        responseUtil.setCode(VarList.RSP_SUCCESS);
        responseUtil.setMsg("Item list retrieved");
        responseUtil.setData(itemService.getAllItems());
        return new ResponseEntity(responseUtil, HttpStatus.ACCEPTED);
    }

    @PutMapping(path = "update")
    public ResponseEntity updateItem(@RequestBody ItemDTO itemDTO) {
        itemService.updateItem(itemDTO);
        responseUtil.setCode(VarList.RSP_SUCCESS);
        responseUtil.setMsg("Item updated successfully");
        responseUtil.setData(itemDTO);
        return new ResponseEntity(responseUtil, HttpStatus.ACCEPTED);
    }

    @DeleteMapping(path = "delete/{id}")
    public ResponseEntity deleteItem(@PathVariable("id") String id) {
        itemService.deleteItem(id);
        responseUtil.setCode(VarList.RSP_SUCCESS);
        responseUtil.setMsg("Item deleted successfully");
        responseUtil.setData(null);
        return new ResponseEntity(responseUtil, HttpStatus.ACCEPTED);
    }

    @GetMapping(path = "get_item_by_id/{id}")
    public ResponseEntity getItemById(@PathVariable("id") String id) {
        responseUtil.setCode(VarList.RSP_SUCCESS);
        responseUtil.setMsg("Item retrieved successfully");
        responseUtil.setData(itemService.getItemById(id));
        return new ResponseEntity(responseUtil, HttpStatus.ACCEPTED);
    }

}
