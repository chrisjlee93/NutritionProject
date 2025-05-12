package com.lee.healthapp.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
public class LogData {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private LocalDateTime dateTime;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "macro_id", referencedColumnName = "id")
    private Macros macros;

    @ManyToOne
    @JoinColumn(name = "water_log_id", nullable = false)
    private WaterLog waterLog;

    public LogData() {}

    public LogData(String name, LocalDateTime dateTime, Macros macros, WaterLog waterLog) {
        this.name = name;
        this.dateTime = dateTime;
        this.macros = macros;
        this.waterLog = waterLog;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public LocalDateTime getDateTime() {
        return dateTime;
    }

    public void setDateTime(LocalDateTime dateTime) {
        this.dateTime = dateTime;
    }

    public Macros getMacros() {
        return macros;
    }

    public void setMacros(Macros macros) {
        this.macros = macros;
    }

    public WaterLog getWaterLog() {
        return waterLog;
    }

    public void setWaterLog(WaterLog waterLog) {
        this.waterLog = waterLog;
    }
}
