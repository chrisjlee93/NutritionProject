package com.lee.healthapp.repository;

import com.lee.healthapp.entity.WaterLog;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.Optional;

@Repository
public interface WaterLogRepository extends JpaRepository<WaterLog, Long> {
    Optional<WaterLog> findByDate(LocalDate date);
}
