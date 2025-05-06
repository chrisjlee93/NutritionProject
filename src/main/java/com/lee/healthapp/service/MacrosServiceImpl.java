package com.lee.healthapp.service;

import com.lee.healthapp.dto.MacrosDTO;
import com.lee.healthapp.entity.Macros;
import com.lee.healthapp.repository.MacrosRepository;
import org.springframework.stereotype.Service;


@Service
public class MacrosServiceImpl implements MacrosService {

    private final MacrosRepository macrosRepo;

    public MacrosServiceImpl(MacrosRepository macrosRepo) {
        this.macrosRepo = macrosRepo;
    }

    @Override
    public Macros createMacros(MacrosDTO dto) {
        Macros macros = new Macros();
        macros.setCalories(dto.calories);
        macros.setProtein(dto.protein);
        macros.setCarbs(dto.carbs);
        macros.setFat(dto.fat);
        macros.setSatFat(dto.satFat);
        macros.setSugar(dto.sugar);
        macros.setSodium(dto.sodium);

        return macrosRepo.save(macros);
    }


}


