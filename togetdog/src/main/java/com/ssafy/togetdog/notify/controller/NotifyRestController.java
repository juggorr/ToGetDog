package com.ssafy.togetdog.notify.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.togetdog.notify.model.service.NotifyService;
import com.ssafy.togetdog.user.controller.UserRestController;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/notify")
@Api("NOTIFY API")
public class NotifyRestController {
	
	private static final String SUCCESS = "success";
	private final Logger logger = LoggerFactory.getLogger(UserRestController.class);
	
	private final NotifyService notifyService;
	
	@ApiOperation(value = "", notes = "")
	@GetMapping
	public ResponseEntity<?> getNotify() {
		return null;
	}
}
