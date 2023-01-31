package com.ssafy.togetdog.user.controller;

import org.springframework.web.bind.annotation.RestController;

import io.swagger.annotations.Api;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@Api("SNS USER API")
public class SocialUserRestController {
	
////	private final AppProperties appProperties;
////  private final AuthTokenProvider tokenProvider;
//    private final AuthenticationManager authenticationManager;
//    private final JwtService jwtService;
//    private final UserService userService;
////  private final MessageSource messageSource;
//
//    @PostMapping("/user/login/oauth2")
//	@ApiOperation(value = "소셜로그인 진행", notes = "")
//	public ApiResponse login(
//			@RequestBody SocialLoginParamDTO userDTO
//			) {
//		Authentication authentication = authenticationManager.authenticate(
//        		new UsernamePasswordAuthenticationToken(userDTO.getEmail(), userDTO.getPassword()));
//		String email = userDTO.getEmail();
//		SecurityContextHolder.getContext().setAuthentication(authentication);
//
//		Date now = new Date();
//		User user = userService.findUserByEmail(userDTO.getEmail());
//		if (user != null) {
//			long userId = user.getUserId();
//			String accessToken = jwtService.createAccessToken(userId);
//			//return ApiResponse.success("token", accessToken);
//		}
//		return null;
//    }
//
////    /**
////     * Ouath 로그인, 출석체크 뱃지 체크
////     * @param token
////     * @return
////     */
////    @PutMapping("/login/success")
////    @ApiOperation(value = "소셜로그인 진행 후, 성공했을 시 실행", notes = "Ouath 로그인, 출석체크 뱃지 체크")
////    public ResponseEntity<?> getLoginBadge(
////    		@RequestHeader(value = "Authorization") String token){
////
////        if (!jwtTokenProvider.validateToken(token)) {
////            return ResponseEntity
////                    .status(HttpStatus.BAD_REQUEST)
////                    .body(new ErrorResponse(messageSource.getMessage("error.valid.jwt", null, LocaleContextHolder.getLocale())));
////        }
////
////        Long userSeq = jwtTokenProvider.getUserSeq(token);
////
////        // jwt 토큰 발급
////        if(loginBadges != null)
////        badgeResult.addAll(loginBadges);
////        if(daliyBadges != null)
////        badgeResult.addAll(daliyBadges);
////
////        if(badgeResult == null || badgeResult.size() == 0) return ResponseEntity.ok(null);
////        List<SimpleBadgeDto> badgeDtoResult = badgeResult.stream().map(b -> new SimpleBadgeDto(b)).collect(Collectors.toList());
////        return ResponseEntity.ok(badgeDtoResult);
////
////    }
}
