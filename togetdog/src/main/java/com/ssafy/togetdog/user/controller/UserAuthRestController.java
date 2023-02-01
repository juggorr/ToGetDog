package com.ssafy.togetdog.user.controller;

import java.util.HashMap;
import java.util.Random;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.togetdog.user.model.service.UserOAuth2Service;
import com.ssafy.togetdog.user.model.service.UserService;
import com.ssafy.togetdog.user.model.vo.OAuthAttributes;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiParam;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/AuthUser")
@Api("USER AUTH API")
public class UserAuthRestController {

//	private static final String SUCCESS = "success";
//	private static final String FAIL = "fail";
//	private final Logger logger = LoggerFactory.getLogger(UserRestController.class);
//
//	private final UserService userService;	
//	private final UserOAuth2Service userOauthService;
//
//	@PostMapping("/kakaologin")
//	public ResponseEntity<?>  kakaologin(@RequestParam String code,
//			@RequestBody @ApiParam(value="로그인 정보", required = true) OAuthAttributes oAuthAttributes)  {
//		String access_Token = userService.getKaKaoAccessToken(code);
//		HashMap<String, Object> userInfo = userService.getKakaoUser(access_Token);
//		Object userEmail = userInfo.get("email");
//		Object nickname = userInfo.get("nickname");
//
//		UserSignUpReq userSignUpReq= new UserSignUpReq();
//		userSignUpReq.setUserEmail(userEmail.toString());
//
//		Random rnd = new Random();
//		String randomStr = "";
//		for(int i=0; i<3; i++){
//			randomStr += String.valueOf((char) ((int) (rnd.nextInt(26)) + 97));
//		}
//
//		userSignUpReq.setUserNickname(nickname.toString()+randomStr);
//		userSignUpReq.setUserPw("faASd156!@#156SDASCQWE@G");
//
//		if(userService.checkNickname(nickname.toString())){
//			return ResponseEntity.ok(UserLoginPostRes.of(200, "Success", JwtTokenUtil.getToken(userEmail.toString())));
//		} else {
//			userService.signUp(userSignUpReq);
//			return ResponseEntity.ok(UserLoginPostRes.of(200, "Success", JwtTokenUtil.getToken(userEmail.toString())));
//		}
//
//	}

}