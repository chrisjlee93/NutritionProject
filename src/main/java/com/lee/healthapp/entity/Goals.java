package com.lee.healthapp.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Goals {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private double calorieGoal;
    private double proteinGoal;
    private double fatGoal;
    private double satFatGoal;
    private double carbGoal;
    private double sugarGoal;
    private double sodiumGoal;
    private double waterGoal;

    public Goals(Long id, double calories, double protein, double fat, double satFat, double carbs, double sugar, double sodium, double water) {
        this.id = id;
        this.calorieGoal = calories;
        this.proteinGoal = protein;
        this.fatGoal = fat;
        this.satFatGoal = satFat;
        this.carbGoal = carbs;
        this.sugarGoal = sugar;
        this.sodiumGoal = sodium;
        this.waterGoal = water;
    }

    public Goals() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public double getCalorieGoal() {
        return calorieGoal;
    }

    public void setCalorieGoal(double calorieGoal) {
        this.calorieGoal = calorieGoal;
    }

    public double getProteinGoal() {
        return proteinGoal;
    }

    public void setProteinGoal(double proteinGoal) {
        this.proteinGoal = proteinGoal;
    }

    public double getFatGoal() {
        return fatGoal;
    }

    public void setFatGoal(double fatGoal) {
        this.fatGoal = fatGoal;
    }

    public double getSatFatGoal() {
        return satFatGoal;
    }

    public void setSatFatGoal(double satFatGoal) {
        this.satFatGoal = satFatGoal;
    }

    public double getCarbGoal() {
        return carbGoal;
    }

    public void setCarbGoal(double carbGoal) {
        this.carbGoal = carbGoal;
    }

    public double getSugarGoal() {
        return sugarGoal;
    }

    public void setSugarGoal(double sugarGoal) {
        this.sugarGoal = sugarGoal;
    }

    public double getSodiumGoal() {
        return sodiumGoal;
    }

    public void setSodiumGoal(double sodiumGoal) {
        this.sodiumGoal = sodiumGoal;
    }

    public double getWaterGoal() {
        return waterGoal;
    }

    public void setWaterGoal(double waterGoal) {
        this.waterGoal = waterGoal;
    }
}
