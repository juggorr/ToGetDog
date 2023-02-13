package com.ssafy.togetdog.facility.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.togetdog.facility.model.dto.FacilityDTO;
import com.ssafy.togetdog.facility.service.FacilityService;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.v3.oas.annotations.parameters.RequestBody;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/facility")
@Api("Facility API")
public class FacilityRestController {

	private static final String SUCCESS = "success";
	private static final String FAIL = "fail";

	private final FacilityService fs;
	
	@ApiOperation(value = "주변 정보 찾기", notes = "사용자가 입력한 좌표를 통해 주변 3km 내 정보를 가져옴")
	@GetMapping
	public ResponseEntity<?> getFacilityList(
			@RequestBody String latitude,
			@RequestBody String longitude
			){
		Map<String, Object> resultMap = new HashMap<String, Object>();
		resultMap.put("result", SUCCESS);
		List<FacilityDTO> list = fs.findList(Double.parseDouble(longitude), Double.parseDouble(latitude));
		resultMap.put("storeList", list);
		return new ResponseEntity<Map<String, Object>>(resultMap, HttpStatus.OK);
		
	}
}
