package com.lee.healthapp.service;

import com.lee.healthapp.entity.LogData;
import com.lee.healthapp.entity.Macros;
import com.lee.healthapp.entity.WaterLog;
import com.lee.healthapp.repository.LogDataRepository;
import com.lee.healthapp.repository.WaterLogRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class LogDataService {

    private final LogDataRepository logRepo;
    private final WaterLogRepository waterRepo;

    public LogDataService(LogDataRepository logRepo, WaterLogRepository waterRepo) {
        this.logRepo = logRepo;
        this.waterRepo = waterRepo;
    }

    public List<LogData> getAllLogs() {
        return logRepo.findAll();
    }

    public LogData getLogById(Long id) {
        return logRepo.findById(id).orElseThrow(() -> new RuntimeException("Log not found"));
    }

    public Map<String, List<LogData>> getLogsGroupedByDate() {
        List<LogData> allLogs = logRepo.findAll();
        return allLogs.stream()
                .collect(Collectors.groupingBy(log ->
                        log.getDateTime().toLocalDate().toString()  // format: YYYY-MM-DD
                ));
    }


    public LogData createLog(String name, LocalDateTime dateTime, Macros macros) {
        LocalDate date = dateTime.toLocalDate();
        WaterLog waterLog = waterRepo.findByDate(date)
                .orElseGet(() -> waterRepo.save(new WaterLog(0, date)));

        LogData log = new LogData(name, dateTime, macros, waterLog);
        return logRepo.save(log);
    }



    public void deleteLog(Long id) {
        logRepo.deleteById(id);
    }
}
