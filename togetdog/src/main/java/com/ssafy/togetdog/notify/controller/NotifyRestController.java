package com.ssafy.togetdog.notify.controller;

import java.util.HashMap;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.togetdog.notify.model.service.NotifyService;
import com.ssafy.togetdog.user.controller.UserRestController;
import com.ssafy.togetdog.user.model.entity.User;
import com.ssafy.togetdog.user.model.service.JwtService;
import com.ssafy.togetdog.user.model.service.UserService;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/notify")
@Api("NOTIFY API")
public class NotifyRestController {
	
	private static final String SUCCESS = "success";
	private final Logger logger = LoggerFactory.getLogger(UserRestController.class);
	
	private final NotifyService notifyService;
	private final UserService userService;
	private final JwtService jwtService;
	
	@ApiOperation(value = "알림 리스트 조회", notes = "알림 탭 들어왔을 때 가져올 정보 전체")
	@GetMapping
	public ResponseEntity<?> getNotify(
			@RequestHeader(value = "Authorization") @ApiParam(required = true) String token
			) {
		logger.info("getNotify in");
		Map<String, Object> resultMap = new HashMap<String, Object>();
		
		jwtService.validateToken(token);
		long userId = jwtService.getUserId(token);
		User user = userService.findUserByUserId(userId);
		
		resultMap.put("result", SUCCESS);
		resultMap.put("msg", "해당 강아지의 정보를 등록했습니다.");
		return new ResponseEntity<Map<String, Object>>(resultMap, HttpStatus.OK);
	}
}
