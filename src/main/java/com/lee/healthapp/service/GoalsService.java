package com.lee.healthapp.service;

import com.lee.healthapp.entity.Goals;
import com.lee.healthapp.repository.GoalsRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public class GoalsService {

    private final GoalsRepository goalsRepo;

    public GoalsService(GoalsRepository goalsRepo) {
        this.goalsRepo = goalsRepo;
    }

    public List<Goals> getGoals() {
        return goalsRepo.findAll();
    }


    public Goals createOrUpdateGoal(Goals goals) {
        if (goals.getId() != null && goalsRepo.existsById(goals.getId())) {
            Goals existing = goalsRepo.findById(goals.getId())
                    .orElseThrow(() -> new EntityNotFoundException("Goal not found"));

            existing.setCalorieGoal(goals.getCalorieGoal());
            existing.setProteinGoal(goals.getProteinGoal());
            existing.setCarbGoal(goals.getCarbGoal());
            existing.setFatGoal(goals.getFatGoal());
            existing.setSatFatGoal(goals.getSatFatGoal());
            existing.setSugarGoal(goals.getSugarGoal());
            existing.setSodiumGoal(goals.getSodiumGoal());
            existing.setWaterGoal(goals.getWaterGoal());

            return goalsRepo.save(existing);
        } else {
            // Create new
            return goalsRepo.save(goals);
        }
    }

    public void deleteGoal(Long id) {
        goalsRepo.deleteById(id);
    }

}


