package com.ssafy.togetdog.user.controller;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.togetdog.user.model.dto.ApiResponse;
import com.ssafy.togetdog.user.model.dto.UserSocialLoginParamDTO;
import com.ssafy.togetdog.user.model.entity.User;
import com.ssafy.togetdog.user.model.etc.UserPrincipal;
import com.ssafy.togetdog.user.model.service.JwtService;
import com.ssafy.togetdog.user.model.service.UserService;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/accounts/auth")
@RequiredArgsConstructor
@Api(tags = "소셜로그인 API")
public class AuthApiController {

    private final AuthenticationManager authenticationManager;
    private final UserService userService;
    private final JwtService jwtService;

    @PostMapping("/login")
    @ApiOperation(value = "소셜로그인 진행", notes = "")
    public ApiResponse<?> login(
            @RequestBody UserSocialLoginParamDTO userDTO
    ) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        userDTO.getEmail(),
                        userDTO.getPassword()
                )
        );

        String email = userDTO.getEmail();
        SecurityContextHolder.getContext().setAuthentication(authentication);
        
        User user = userService.findUserByEmailAndPassword(email, userDTO.getPassword());
        String token = jwtService.createAccessToken(user.getUserId(), ((UserPrincipal) authentication.getPrincipal()).getRoleType().getCode());
        return ApiResponse.success("access-token", token);
    }

}