package com.lee.healthapp.repository;

import com.lee.healthapp.entity.Goals;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GoalsRepository extends JpaRepository<Goals, Long> {}