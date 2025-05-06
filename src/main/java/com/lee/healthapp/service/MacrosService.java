package com.lee.healthapp.service;

import com.lee.healthapp.dto.MacrosDTO;
import com.lee.healthapp.entity.Macros;

public interface MacrosService {
    Macros createMacros(MacrosDTO dto);

}
