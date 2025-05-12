package com.lee.healthapp.controller;

import com.lee.healthapp.entity.LogData;
import com.lee.healthapp.entity.Macros;
import com.lee.healthapp.service.LogDataService;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/logs")
public class LogDataController {

    private final LogDataService logDataService;

    public LogDataController(LogDataService logDataService) {
        this.logDataService = logDataService;
    }

    @GetMapping
    public List<LogData> getAllLogs() {
        return logDataService.getAllLogs();
    }

    @GetMapping("/{id}")
    public LogData getLog(@PathVariable Long id) {
        return logDataService.getLogById(id);
    }

    @GetMapping("/by-date")
    public Map<String, List<LogData>> getLogsGroupedByDate() {
        return logDataService.getLogsGroupedByDate();
    }


    @PostMapping
    public LogData createLog(@RequestBody LogCreateRequest request) {
        Macros macros = new Macros(
                null,
                request.calories,
                request.protein,
                request.fat,
                request.satFat,
                request.carbs,
                request.sugar,
                request.sodium
        );

        LocalDateTime dateTime = (request.date != null)
                ? request.date.atStartOfDay()
                : LocalDateTime.now();

        return logDataService.createLog(request.name, dateTime, macros);

    }

    @DeleteMapping("/{id}")
    public void deleteLog(@PathVariable Long id) {
        logDataService.deleteLog(id);
    }

    // Inner DTO class for creating logs
    public static class LogCreateRequest {
        public String name;
        public double calories;
        public double protein;
        public double fat;
        public double satFat;
        public double carbs;
        public double sugar;
        public double sodium;
        public LocalDate date;
    }
}
