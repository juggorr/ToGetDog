package com.ssafy.togetdog.facility.service;

import java.util.List;

import com.ssafy.togetdog.facility.model.dto.FacilityDTO;

public interface FacilityService {
	List<FacilityDTO> findList(double lo , double la);
	
}
