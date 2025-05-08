package com.lee.healthapp.controller;

import com.lee.healthapp.dto.MacrosDTO;
import com.lee.healthapp.entity.Macros;
import com.lee.healthapp.service.MacrosService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/macros")
public class MacrosController {

    private final MacrosService macrosService;

    public MacrosController(MacrosService macrosService) {
        this.macrosService = macrosService;
    }

    @PostMapping
    public Macros createMacros(@RequestBody MacrosDTO dto) {
        return macrosService.createMacros(dto);
    }

}