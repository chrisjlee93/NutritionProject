package com.lee.healthapp.service;

import com.lee.healthapp.dto.MealDTO;
import com.lee.healthapp.dto.MacrosDTO;
import com.lee.healthapp.entity.Macros;
import com.lee.healthapp.entity.Meal;
import com.lee.healthapp.repository.MealRepository;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public class MealServiceImpl implements MealService {

    private final MealRepository mealRepo;

    public MealServiceImpl(MealRepository mealRepo, MacrosService macrosService) {
        this.mealRepo = mealRepo;
        this.macrosService = macrosService;
    }

    @Override
    public Meal createMeal(MealDTO dto) {
        Meal meal = new Meal();
        meal.setName(dto.name);
        meal.setCategory(dto.category);
        meal.setImageUrl(dto.imageUrl);
        meal.setComments(dto.comments);
        meal.setRating(dto.rating);
        meal.setExternalId(dto.externalId);
        meal.setIngredients(dto.ingredients);

        if (dto.macros != null) {
            Macros macros = new Macros();
            macros.setCalories(dto.macros.calories);
            macros.setProtein(dto.macros.protein);
            macros.setFat(dto.macros.fat);
            macros.setCarbs(dto.macros.carbs);
            meal.setMacros(macros);
        }

        return mealRepo.save(meal);
    }

    @Override
    public List<Meal> getAllMeals() {
        return mealRepo.findAll();
    }

    @Override
    public Meal getMealById(Long id) {
        return mealRepo.findById(id).orElse(null);
    }

    @Override
    public void deleteMeal(Long id) {
        mealRepo.deleteById(id);
    }

    @Override
    public Meal updateMeal(Long id, MealDTO dto) {
        Meal meal = mealRepo.findById(id).orElseThrow(() -> new RuntimeException("Meal not found"));

        meal.setName(dto.name);
        meal.setCategory(dto.category);
        meal.setImageUrl(dto.imageUrl);
        meal.setComments(dto.comments);
        meal.setRating(dto.rating);
        meal.setExternalId(dto.externalId);
        meal.setIngredients(dto.ingredients);

        if (dto.macros != null) {
            Macros macros = new Macros();
            macros.setCalories(dto.macros.calories);
            macros.setProtein(dto.macros.protein);
            macros.setFat(dto.macros.fat);
            macros.setCarbs(dto.macros.carbs);
            meal.setMacros(macros);
        }

        return mealRepo.save(meal);
    }
}

