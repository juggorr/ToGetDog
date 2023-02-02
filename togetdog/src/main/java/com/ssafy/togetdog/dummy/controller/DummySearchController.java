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

import com.ssafy.togetdog.dummy.domain.DogDTO;
import com.ssafy.togetdog.dummy.domain.UserDTO;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;

@RestController
@RequestMapping("/dummy/search")
@Api("검색 관련 더미 API : 무슨 값을 넣든 같은 dummy 결과가 나옵니다.")
public class DummySearchController {

	private static final String SUCCESS = "success";
	// private static final String FAIL = "fail";

	@ApiOperation(value = "", notes = "")
	@GetMapping("/list")
	public ResponseEntity<?> methodName(
			@RequestParam String pageNo,
			@RequestParam boolean isDog 
			) {
		
		Map<String, Object> resultMap = new HashMap<String, Object>();
		resultMap.put("result", SUCCESS);
		if(isDog) {
			List<DogDTO> dogList = new ArrayList<DogDTO>();
			resultMap.put("list", dogList);
		} else {
			List<UserDTO> userList = new ArrayList<UserDTO>();
			resultMap.put("list", userList);
		}
		return new ResponseEntity<Map<String, Object>>(resultMap, HttpStatus.OK);
	}
}
