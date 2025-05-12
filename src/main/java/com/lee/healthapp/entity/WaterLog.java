package com.lee.healthapp.entity;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
public class WaterLog {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private double waterAmount; // in liters, ounces, etc.

    private LocalDate date;

    public WaterLog() {}

    public WaterLog(double waterAmount, LocalDate date) {
        this.waterAmount = waterAmount;
        this.date = date;
    }

    public Long getId() { return id; }

    public double getWaterAmount() { return waterAmount; }

    public void setWaterAmount(double waterAmount) { this.waterAmount = waterAmount; }

    public LocalDate getDate() { return date; }

    public void setDate(LocalDate date) { this.date = date; }
}
