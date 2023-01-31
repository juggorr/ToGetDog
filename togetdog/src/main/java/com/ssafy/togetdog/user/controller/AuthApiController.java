package com.ssafy.togetdog.user.controller;

import java.util.Date;

import org.springframework.context.MessageSource;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.togetdog.global.config.AppProperties;
import com.ssafy.togetdog.user.model.dto.ApiResponse;
import com.ssafy.togetdog.user.model.dto.AuthReqModel;
import com.ssafy.togetdog.user.model.etc.UserPrincipal;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/accounts/auth")
@RequiredArgsConstructor
@Api(tags = "소셜로그인 API")
public class AuthApiController {

//    private final AppProperties appProperties;
//    private final AuthenticationManager authenticationManager;
//    private final MessageSource messageSource;
//
//    @PostMapping("/login")
//    @ApiOperation(value = "소셜로그인 진행", notes = "")
//    public ApiResponse<?> login(
//            @RequestBody AuthReqModel authReqModel
//    ) {
//        Authentication authentication = authenticationManager.authenticate(
//                new UsernamePasswordAuthenticationToken(
//                        authReqModel.getId(),
//                        authReqModel.getPassword()
//                )
//        );
//
//        String userId = authReqModel.getId();
//        SecurityContextHolder.getContext().setAuthentication(authentication);
//
//        Date now = new Date();
//        AuthToken accessToken = tokenProvider.createAuthToken(
//                userId,
//                ((UserPrincipal) authentication.getPrincipal()).getRoleType().getCode(),
//                new Date(now.getTime() + appProperties.getAuth().getTokenExpiry())
//        );
//
//        // jwt 토큰 발급
//        return ApiResponse.success("token", accessToken.getToken());
//    }

//    /**
//     * Ouath 로그인, 출석체크 뱃지 체크
//     * @param token
//     * @return
//     */
//    @PutMapping("/login/success")
//    @ApiOperation(value = "소셜로그인 진행 후, 성공했을 시 실행", notes = "Ouath 로그인, 출석체크 뱃지 체크")
//    public ResponseEntity<?> getLoginBadge(@RequestHeader(value = "Authorization") String token){
//
//        if (!jwtTokenProvider.validateToken(token)) {
//            return ResponseEntity
//                    .status(HttpStatus.BAD_REQUEST)
//                    .body(new ErrorResponse(messageSource.getMessage("error.valid.jwt", null, LocaleContextHolder.getLocale())));
//        }
//
//        Long userSeq = jwtTokenProvider.getUserSeq(token);
//
//        List<UserBadge> userbadges = badgeService.getBadgeList(userSeq);
//        List<Long> badges = badgeService.getUserBadgeSeq(userbadges);
//        // jwt 토큰 발급
//        List<Badge> badgeResult = new ArrayList<>();
//        List<Badge> loginBadges = badgeService.checkLoginNum(userSeq, badges);
//        List<Badge> daliyBadges = badgeService.checkDaily(userSeq, badges);
//        if(loginBadges != null)
//        badgeResult.addAll(loginBadges);
//        if(daliyBadges != null)
//        badgeResult.addAll(daliyBadges);
//
//        if(badgeResult == null || badgeResult.size() == 0) return ResponseEntity.ok(null);
//        List<SimpleBadgeDto> badgeDtoResult = badgeResult.stream().map(b -> new SimpleBadgeDto(b)).collect(Collectors.toList());
//        return ResponseEntity.ok(badgeDtoResult);
//
//    }

}