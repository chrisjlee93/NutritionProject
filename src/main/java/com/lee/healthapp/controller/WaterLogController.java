package com.lee.healthapp.controller;

import com.lee.healthapp.entity.WaterLog;
import com.lee.healthapp.service.WaterLogService;
import org.springframework.web.bind.annotation.*;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/water")
public class WaterLogController {

    private final WaterLogService waterService;

    public WaterLogController(WaterLogService waterService) {
        this.waterService = waterService;
    }


    @GetMapping("/{date}")
    public WaterLog getLog(
            @PathVariable
            @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date) {
        return waterService.getOrCreateLog(date);
    }


    @PatchMapping("/{id}")
    public WaterLog adjustWaterAmount(@PathVariable Long id, @RequestParam double amount) {
        return waterService.updateWater(id, amount);
    }


    @GetMapping
    public List<WaterLog> getAllLogs() {
        return waterService.getAll();
    }
}
