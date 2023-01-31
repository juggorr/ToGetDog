package com.ssafy.togetdog.user.controller;

import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.togetdog.user.model.entity.User;
import com.ssafy.togetdog.user.model.service.UserOAuthService;
import com.ssafy.togetdog.user.model.service.UserService;
import com.ssafy.togetdog.user.model.vo.NaverLoginVo;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/AuthUser")
@Api("USER AUTH API")
public class UserAuthRestController {
	
	private static final String SUCCESS = "success";
	private static final String FAIL = "fail";
	private final Logger logger = LoggerFactory.getLogger(UserRestController.class);
	
	//private final UserOAuthService userOauthService;
	
	
    @GetMapping("/account/login")
    @ApiOperation(value = "로그인")
    public Object login(
    		@RequestParam(required = true) final String email,
            @RequestParam(required = true) final String password
            ) {
        return null;
    }
    
//	// 네이버 로그인 redirect uri
//    @GetMapping("")
//    public @ResponseBody String NaverLogin(
//    		@RequestParam Map<String, String> resValue
//    		) {
//    	
//    	logger.info("NaverLogin Parameter : {}", resValue);
//    	
//        // code 를 받아오면 code 를 사용하여 access_token를 발급받는다.
////        final NaverLoginVo naverLoginVo = naverLoginService.requestNaverLoginAcceccToken(resValue, "authorization_code");
////
////        // access_token를 사용하여 사용자의 고유 id값을 가져온다.
////        final NaverLoginProfile naverLoginProfile = naverLoginService.requestNaverLoginProfile(naverLoginVo);
//
//        return naverLoginProfile.toString();
//    }
//    
    
}
