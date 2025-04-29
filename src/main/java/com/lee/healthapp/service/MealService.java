package com.lee.healthapp.service;

import com.lee.healthapp.entity.Meal;
import com.lee.healthapp.repository.MealRepository;

import java.util.List;

public class MealService {

    private final MealRepository mealRepository;

    public MealService(MealRepository mealRepository) {
        this.mealRepository = mealRepository;
    }

    public List<Meal> getAllMeals() {
        return mealRepository.findAll();
    }

    public Meal createMeal(Meal meal) {
        return mealRepository.save(meal);
    }



}
