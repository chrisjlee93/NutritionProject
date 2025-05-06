package com.lee.healthapp.controller;


import com.lee.healthapp.entity.Meal;
import com.lee.healthapp.service.MealServiceImpl;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/meals")
public class MealController {

    private final MealServiceImpl mealService;

    public MealController(MealServiceImpl mealService) {
        this.mealService = mealService;
    }

    @GetMapping
    public List<Meal> getAllMeals() {
        return mealService.getAllMeals();
    }

    @PostMapping
    public Meal createMeal(@RequestBody Meal meal) {
        return mealService.createMeal(meal);
    }


}
