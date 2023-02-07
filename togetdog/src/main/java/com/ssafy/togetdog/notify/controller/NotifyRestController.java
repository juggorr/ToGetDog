package com.ssafy.togetdog.notify.controller;

import java.util.HashMap;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.togetdog.notify.model.dto.NotifyRespDTO;
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
	
	@ApiOperation(value = "알림 리스트 조회", notes = "알림 탭 들어왔을 때 가져올 알림 정보 전체를 조회합니다.")
	@GetMapping
	public ResponseEntity<?> getNotify(
			@RequestHeader(value = "Authorization") @ApiParam(required = true) String token
			) {
		logger.info("getNotify in");
		Map<String, Object> resultMap = new HashMap<String, Object>();
		
		jwtService.validateToken(token);
		long userId = jwtService.getUserId(token);
		User user = userService.findUserByUserId(userId);
		
		NotifyRespDTO notifyDTO = notifyService.getNotiList(user);
		resultMap.put("result", SUCCESS);
		resultMap.put("notice", notifyDTO);
		return new ResponseEntity<Map<String, Object>>(resultMap, HttpStatus.OK);
	}
	
	@ApiOperation(value = "약속 취소 알림 확인", notes = "알림 탭 들어왔을 때 가져올 알림 정보 전체를 조회합니다.")
	@PutMapping("/cancel")
	public ResponseEntity<?> updateNotify(
			@RequestHeader(value = "Authorization") @ApiParam(required = true) String token
			) {
		logger.info("getNotify in");
		Map<String, Object> resultMap = new HashMap<String, Object>();
		
		jwtService.validateToken(token);
		long userId = jwtService.getUserId(token);
		User user = userService.findUserByUserId(userId);
		
		notifyService.updateNotify(user);
		resultMap.put("result", SUCCESS);
		resultMap.put("msg", "약속 취소 알림을 확인처리했습니다.");
		return new ResponseEntity<Map<String, Object>>(resultMap, HttpStatus.OK);
	}
}
