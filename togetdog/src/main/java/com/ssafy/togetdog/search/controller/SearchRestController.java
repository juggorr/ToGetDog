package com.ssafy.togetdog.search.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.togetdog.search.model.dto.SearchDogDTO;
import com.ssafy.togetdog.search.model.dto.SearchUserDTO;
import com.ssafy.togetdog.search.service.SearchService;
import com.ssafy.togetdog.user.model.service.JwtService;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/search")
@Api("SEARCH API")
public class SearchRestController {

	private static final String SUCCESS = "success";

	private final SearchService searchService;
	private final JwtService jwtService;

	@ApiOperation(value = "검색 데이터 조회", notes = "검색 정보에 따른 강아지와 유저의 정보 조회")
	@GetMapping("/list")
	public ResponseEntity<?> methodName(
			@RequestHeader(value = "Authorization") @ApiParam(required = true) String token,
			@RequestParam String content 
			) {
		jwtService.validateToken(token);
		
		Map<String, Object> resultMap = new HashMap<String, Object>();
		List<SearchDogDTO> dogList = searchService.getDogInfoList(content, jwtService.getUserId(token));
		resultMap.put("dog", dogList);
		List<SearchUserDTO> userList = searchService.getUserInfoList(content, jwtService.getUserId(token));
		resultMap.put("user", userList);
		resultMap.put("result", SUCCESS);
		return new ResponseEntity<Map<String, Object>>(resultMap, HttpStatus.OK);
	}
}
