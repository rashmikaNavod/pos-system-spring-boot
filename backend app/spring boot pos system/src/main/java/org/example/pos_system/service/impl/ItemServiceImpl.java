package org.example.pos_system.service.impl;

import org.example.pos_system.dto.ItemDTO;
import org.example.pos_system.entity.Item;
import org.example.pos_system.repo.ItemRepo;
import org.example.pos_system.service.ItemService;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ItemServiceImpl implements ItemService {
    @Autowired
    private ItemRepo itemRepo;
    @Autowired
    private ModelMapper modelMapper;

    @Override
    public void saveItem(ItemDTO itemDTO) {
        if(itemRepo.existsById(itemDTO.getItemCode())){
            throw new RuntimeException("Item already exists");
        }
        itemRepo.save(modelMapper.map(itemDTO, Item.class));
    }

    @Override
    public void updateItem(ItemDTO itemDTO) {
        if(!itemRepo.existsById(itemDTO.getItemCode())){
            throw new RuntimeException("Item does not exist");
        }
        itemRepo.save(modelMapper.map(itemDTO, Item.class));
    }

    @Override
    public void deleteItem(String id) {
        if(!itemRepo.existsById(id)){
            throw new RuntimeException("Item does not exist");
        }
        itemRepo.deleteById(id);
    }

    @Override
    public List<ItemDTO> getAllItems() {
        return modelMapper.map(itemRepo.findAll(), new TypeToken<List<ItemDTO>>() {}.getType());
    }

    @Override
    public ItemDTO getItemById(String id) {
        if(!itemRepo.existsById(id)){
            throw new RuntimeException("Item does not exist");
        }
        return modelMapper.map(itemRepo.findById(id).get(), ItemDTO.class);
    }

}
