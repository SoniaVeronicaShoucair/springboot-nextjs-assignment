package com.example.demo.controller;

import com.example.demo.model.Item;
import com.example.demo.repository.ItemRepository;

import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController  //REST API class
@RequestMapping("/api/items")
@CrossOrigin(origins = "http://localhost:3000") //Allows access from the next.js frontend
public class ItemController {

    private final ItemRepository itemRepository;

    @Autowired
    public ItemController(ItemRepository itemRepository) {
        this.itemRepository = itemRepository;
    }

    //Create new item
    @PostMapping
    public Item createItem(@Valid @RequestBody Item item) {
        return itemRepository.save(item);
    }

    //List all items
    @GetMapping
    public List<Item> getAllItems() {
        return itemRepository.findAll();
    }
}
