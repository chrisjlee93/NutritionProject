package com.lee.healthapp.controller;

import com.lee.healthapp.entity.Goals;
import com.lee.healthapp.service.GoalsService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/goals")
public class GoalsController {
    private final GoalsService goalsService;

    public GoalsController(GoalsService goalsService) {
        this.goalsService = goalsService;
    }

    @GetMapping
    public List<Goals> getAllGoals() {
        return goalsService.getGoals();
    }

    @PostMapping
    public ResponseEntity<Goals> createOrUpdateGoal(@RequestBody Goals goals) {
        Goals savedGoal = goalsService.createOrUpdateGoal(goals);
        return ResponseEntity.ok(savedGoal);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteGoal(@PathVariable Long id) {
        goalsService.deleteGoal(id);
        return ResponseEntity.noContent().build();
    }


}
