package com.ssafy.togetdog.user.controller;

import java.util.HashMap;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.togetdog.user.model.dto.UserSocialLoginRespDTO;
import com.ssafy.togetdog.user.model.entity.User;
import com.ssafy.togetdog.user.model.service.JwtService;
import com.ssafy.togetdog.user.model.service.UserService;

import lombok.RequiredArgsConstructor;
import springfox.documentation.annotations.ApiIgnore;

@RestController
@RequiredArgsConstructor
@ApiIgnore
public class Oauth2RestController {
	
	private final UserService userService;
	private final JwtService jwtService;

	private static final String SUCCESS = "success";
	private static final String FAIL = "fail";
	private final Logger logger = LoggerFactory.getLogger(Oauth2RestController.class);

	@GetMapping("/api/auth/login")
	public ResponseEntity<?> socialLogin(OAuth2AuthenticationToken authentication) {
		
		logger.info("Social login input parameter : {}", authentication.getName());
		Map<String, Object> resultMap = new HashMap<String, Object>();
		HttpStatus status = null;
		
		if (authentication.getName().equals("disable")) {
			resultMap.put("result", FAIL);
			status = HttpStatus.CONFLICT;
		} else {
			User user = userService.findUserByEmail(authentication.getName());
			String accessToken = jwtService.createAccessToken(user.getUserId());
			resultMap.put("result", SUCCESS);
			resultMap.put("user", UserSocialLoginRespDTO.of(user));
			resultMap.put("access-token", accessToken);
			status = HttpStatus.OK;
		}
		return new ResponseEntity<Map<String, Object>>(resultMap, status);
	}
}
