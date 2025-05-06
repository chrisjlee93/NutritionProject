package com.lee.healthapp.entity;

import jakarta.persistence.*;

import java.util.List;

public class Meal {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String category;
    private String imageUrl;
    private String comments;
    private Double rating;
    private Long mealId;

    @ElementCollection
    @CollectionTable(name = "ingredients", joinColumns = @JoinColumn(name = "meal_id"))
    @Column(name = "ingredient")
    private List<String> ingredients;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "macro_id", referencedColumnName = "id")
    private Macros macros;

    public Meal(String name, String category, String imageUrl, String comments, Double rating, Long mealId, List<String> ingredients, Macros macros) {
        this.name = name;
        this.category = category;
        this.imageUrl = imageUrl;
        this.comments = comments;
        this.rating = rating;
        this.mealId = mealId;
        this.ingredients = ingredients;
        this.macros = macros;
    }

    public Meal() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public String getComments() {
        return comments;
    }

    public void setComments(String comments) {
        this.comments = comments;
    }

    public Double getRating() {
        return rating;
    }

    public void setRating(Double rating) {
        this.rating = rating;
    }

    public Long getMealId() {
        return mealId;
    }

    public void setMealId(Long mealId) {
        this.mealId = mealId;
    }

    public List<String> getIngredients() {
        return ingredients;
    }

    public void setIngredients(List<String> ingredients) {
        this.ingredients = ingredients;
    }

    public Macros getMacros() {
        return macros;
    }

    public void setMacro(Macros macros) {
        this.macros = macros;
    }
}

