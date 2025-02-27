package org.example.pos_system.service;

import org.example.pos_system.dto.ItemDTO;
import org.example.pos_system.entity.Item;

import java.util.List;

public interface ItemService{
    void saveItem(ItemDTO itemDTO);
    void updateItem(ItemDTO itemDTO);
    void deleteItem(String id);
    List<ItemDTO> getAllItems();
    ItemDTO getItemById(String id);
}
