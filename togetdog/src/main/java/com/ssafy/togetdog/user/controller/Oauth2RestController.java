package com.ssafy.togetdog.user.controller;

import java.util.HashMap;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.annotations.ApiOperation;

@RestController
public class Oauth2RestController {
	
	private static final String SUCCESS = "success";
	private static final String FAIL = "fail";
	private final Logger logger = LoggerFactory.getLogger(UserRestController.class);
	
	/***
	 * User Social Login
	 * @param email
	 * @param password
	 * @return status 200, 401, 500
	 */
	@ApiOperation(value = "소셜 로그인", notes = "소셜 로그인을 진행합니다.")
	@GetMapping("/api/auth/login")
	public ResponseEntity<?> socialLogin(
			OAuth2AuthenticationToken authentication
			) {
		logger.info("login input parameter : {}", authentication.getName(), authentication.getAuthorizedClientRegistrationId());
		System.out.println("!!!");
		Map<String, Object> resultMap = new HashMap<String, Object>();
		HttpStatus status = null;
		
		System.out.println("!!");
		
		return new ResponseEntity<Map<String, Object>>(resultMap, status);
	}
}
