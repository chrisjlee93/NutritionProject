package com.lee.healthapp.repository;

import com.lee.healthapp.entity.LogData;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LogDataRepository extends JpaRepository<LogData, Long> {}
