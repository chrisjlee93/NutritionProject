package com.lee.healthapp.service;

import com.lee.healthapp.dto.MealDTO;
import com.lee.healthapp.entity.Meal;

import java.util.List;

public interface MealService {
    Meal createMeal(MealDTO dto);
    List<Meal> getAllMeals();
    Meal getMealById(Long id);

    void deleteMeal(Long id);

    Meal updateMeal(Long id, MealDTO dto);
}
