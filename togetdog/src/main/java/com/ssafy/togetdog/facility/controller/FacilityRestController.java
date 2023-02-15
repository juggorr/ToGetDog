package com.ssafy.togetdog.facility.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.togetdog.facility.model.dto.FacilityDTO;
import com.ssafy.togetdog.facility.service.FacilityService;
import com.ssafy.togetdog.user.model.service.JwtService;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import io.swagger.v3.oas.annotations.parameters.RequestBody;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/facility")
@Api("Facility API")
public class FacilityRestController {

	private static final String SUCCESS = "success";

	private final FacilityService facilityService;
	private final JwtService jwtService;
	
	@ApiOperation(value = "주변 정보 찾기", notes = "사용자가 입력한 좌표를 통해 주변 3km 내 정보를 가져옴")
	@GetMapping
	public ResponseEntity<?> getFacilityList(
			@RequestHeader(value = "Authorization") @ApiParam(required = true) String token,
			@RequestBody String latitude,
			@RequestBody String longitude
			){
		Map<String, Object> resultMap = new HashMap<String, Object>();
		jwtService.validateToken(token);
		
		resultMap.put("result", SUCCESS);
		List<FacilityDTO> list = facilityService.findList(Double.parseDouble(longitude), Double.parseDouble(latitude));
		resultMap.put("storeList", list);
		return new ResponseEntity<Map<String, Object>>(resultMap, HttpStatus.OK);
		
	}
}
