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

import com.ssafy.togetdog.user.model.dto.UserLoginRespDTO;
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

	@GetMapping("/api/auth")
	public ResponseEntity<?> socialLogin(OAuth2AuthenticationToken authentication) {
		
		logger.info("Social login input parameter : {}", authentication.getName());
		Map<String, Object> resultMap = new HashMap<String, Object>();
		HttpStatus status = null;
		
		if (authentication.getName().equals("disable")) {
			resultMap.put("result", FAIL);
			resultMap.put("msg", "이미 이 이메일의 다른 소셜로 가입한 유저입니다.");
			status = HttpStatus.CONFLICT;
		} else if ((boolean) authentication.getPrincipal().getAttribute("login")) {
			User user = userService.findUserByEmail(authentication.getName());
			String accessToken = jwtService.createAccessToken(user.getUserId());
			resultMap.put("result", "LOGIN");
			resultMap.put("msg", "소셜 회원의 로그인시도 입니다.");
			resultMap.put("user", UserLoginRespDTO.of(user));
			resultMap.put("access-token", accessToken);
			status = HttpStatus.OK;
		} else {
			User user = User.builder()
					.email(authentication.getName())
					.nickName(authentication.getPrincipal().getAttribute("nickname"))
					.social(authentication.getPrincipal().getAttribute("social"))
					.build();
			resultMap.put("result", SUCCESS);
			resultMap.put("msg", "새로운 소셜 가입 시도 입니다.");
			resultMap.put("user", UserSocialLoginRespDTO.of(user));
			status = HttpStatus.OK;
		}
		return new ResponseEntity<Map<String, Object>>(resultMap, status);
	}
}
