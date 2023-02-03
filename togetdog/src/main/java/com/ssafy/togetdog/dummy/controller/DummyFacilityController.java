package com.ssafy.togetdog.dummy.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.togetdog.dummy.domain.storeDTO;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;

@RestController
@RequestMapping("/dummy/facility")
@Api("애견 시설 관련 더미 API : 무슨 값을 넣든 같은 dummy 결과가 나옵니다.")
public class DummyFacilityController {
	

	private static final String SUCCESS = "success";
	// private static final String FAIL = "fail";

	@ApiOperation(value = "현 위치 기반 시설 리스트 조회 ", notes = "현 위치를 기반으로 가까이에 있는 애견 시설을 조회합니다.")
	@GetMapping
	public ResponseEntity<?> getHomeInfo(
			@RequestParam String latitude,
			@RequestParam String longitude
			) {
		List<storeDTO> storeList = new ArrayList<storeDTO>();
		storeDTO storeInfo = new storeDTO();
		storeInfo.setFacilityId(7);
		storeInfo.setFacilityName("1번가온누리약국");
		storeInfo.setFacilityAddress("강원도 평창군 진부면 하진부리 101번지 74 - 2");
		storeInfo.setType("반려의료");
		storeInfo.setLongitude(37.6376755);
		storeInfo.setLatitude(128.559285);
		storeInfo.setDistance(450.23432);
		storeInfo.setPhone("033-333-7300");
		
		boolean[] closedDays = new boolean[8];
		closedDays[6] = true;
		closedDays[7] = true;
		
		String[] openingHours = new String[7];
		openingHours[0] = "09:00~18:00";
		openingHours[1] = "09:00~18:00";
		openingHours[2] = "09:00~18:00";
		openingHours[3] = "09:00~18:00";
		openingHours[4] = "09:00~18:00";
		openingHours[5] = "10:00~17:00";
		openingHours[6] = "10:00~14:00";
		
		storeInfo.setClosedDays(closedDays);
		storeInfo.setOpeningHours(openingHours);
		
		storeList.add(storeInfo);
		
		Map<String, Object> resultMap = new HashMap<String, Object>();
		resultMap.put("result", SUCCESS);
		resultMap.put("storeList", storeList);
		return new ResponseEntity<Map<String, Object>>(resultMap, HttpStatus.OK);
	}
}
