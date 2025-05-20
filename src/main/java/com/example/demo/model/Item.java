package com.example.demo.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import jakarta.validation.constraints.NotBlank;

@Document(collection = "items") //Tells Spring Data MongoDB to store this class in the items collection
public class Item {

    @Id
    private String id;

    //Ensures that the name is not empty or null.
    //This will be used for validating API input in POST requests.
    @NotBlank(message = "Name is required")
    private String name;

    // Constructors
    public Item() {}

    public Item(String name) {
        this.name = name;
    }

    // Getters and setters
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
