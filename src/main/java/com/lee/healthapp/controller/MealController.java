package com.lee.healthapp.controller;


import com.lee.healthapp.dto.MealDTO;
import com.lee.healthapp.entity.Meal;
import com.lee.healthapp.service.MealService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/meals")
public class MealController {

    private final MealService mealService;

    public MealController(MealService mealService) {
        this.mealService = mealService;
    }

    @GetMapping
    public List<Meal> getAllMeals() {
        return mealService.getAllMeals();
    }

    @GetMapping("/{id}")
    public Meal getMealById(@PathVariable Long id) {
        return mealService.getMealById(id);
    }

    @PostMapping
    public Meal createMeal(@RequestBody MealDTO meal) {
        return mealService.createMeal(meal);
    }

    @DeleteMapping("/{id}")
    public void deleteMeal(@PathVariable Long id) {
        mealService.deleteMeal(id);
    }

    @PutMapping("/{id}")
    public Meal updateMealById(@PathVariable Long id, @RequestBody MealDTO meal) {
        return mealService.updateMeal(id, meal);
    }


}
