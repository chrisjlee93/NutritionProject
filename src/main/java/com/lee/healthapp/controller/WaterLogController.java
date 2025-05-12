package com.lee.healthapp.controller;

import com.lee.healthapp.entity.WaterLog;
import com.lee.healthapp.service.WaterLogService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/water")
public class WaterLogController {

    private final WaterLogService waterService;

    public WaterLogController(WaterLogService waterService) {
        this.waterService = waterService;
    }

    @GetMapping("/today")
    public WaterLog getTodayLog() {
        return waterService.getOrCreateTodayLog();
    }

    @PostMapping("/{id}/increment")
    public WaterLog increment(@PathVariable Long id, @RequestParam double amount) {
        return waterService.updateWater(id, amount);
    }

    @PostMapping("/{id}/decrement")
    public WaterLog decrement(@PathVariable Long id, @RequestParam double amount) {
        return waterService.updateWater(id, -amount);
    }

    @GetMapping
    public List<WaterLog> getAllLogs() {
        return waterService.getAll();
    }
}
