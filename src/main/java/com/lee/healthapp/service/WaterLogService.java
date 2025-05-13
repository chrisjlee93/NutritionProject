package com.lee.healthapp.service;

import com.lee.healthapp.entity.WaterLog;
import com.lee.healthapp.repository.WaterLogRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class WaterLogService {

    private final WaterLogRepository waterRepo;

    public WaterLogService(WaterLogRepository waterRepo) {
        this.waterRepo = waterRepo;
    }

    public WaterLog getOrCreateLog(LocalDate date) {
        return waterRepo.findByDate(date)
                .orElseGet(() -> waterRepo.save(new WaterLog(0.0, date)));
    }


    public WaterLog updateWater(Long id, double amountDelta) {
        WaterLog log = waterRepo.findById(id).orElseThrow();
        log.setWaterAmount(Math.max(0, log.getWaterAmount() + amountDelta)); // prevent negatives
        return waterRepo.save(log);
    }

    public List<WaterLog> getAll() {
        return waterRepo.findAll();
    }
}
