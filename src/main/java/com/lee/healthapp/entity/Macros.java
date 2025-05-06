package com.lee.healthapp.entity;

import jakarta.persistence.*;

@Entity
public class Macros {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private double calories;
    private double protein;
    private double fat;
    private double satFat;
    private double carbs;
    private double sugar;
    private double sodium;

    public Macros(Long id, double calories, double protein, double fat, double satFat, double carbs, double sugar, double sodium) {
        this.id = id;
        this.calories = calories;
        this.protein = protein;
        this.fat = fat;
        this.satFat = satFat;
        this.carbs = carbs;
        this.sugar = sugar;
        this.sodium = sodium;
    }

    public Macros() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public double getCalories() {
        return calories;
    }

    public void setCalories(double calories) {
        this.calories = calories;
    }

    public double getProtein() {
        return protein;
    }

    public void setProtein(double protein) {
        this.protein = protein;
    }

    public double getFat() {
        return fat;
    }

    public void setFat(double fat) {
        this.fat = fat;
    }

    public double getSatFat() {
        return satFat;
    }

    public void setSatFat(double satFat) {
        this.satFat = satFat;
    }

    public double getCarbs() {
        return carbs;
    }

    public void setCarbs(double carbs) {
        this.carbs = carbs;
    }

    public double getSugar() {
        return sugar;
    }

    public void setSugar(double sugar) {
        this.sugar = sugar;
    }

    public double getSodium() {
        return sodium;
    }

    public void setSodium(double sodium) {
        this.sodium = sodium;
    }
}
