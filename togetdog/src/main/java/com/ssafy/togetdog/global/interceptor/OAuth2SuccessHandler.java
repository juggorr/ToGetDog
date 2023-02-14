package com.ssafy.togetdog.global.interceptor;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;
import org.springframework.web.util.UriComponentsBuilder;

import com.ssafy.togetdog.user.model.dto.UserLoginRespDTO;
import com.ssafy.togetdog.user.model.dto.UserSocialLoginRespDTO;
import com.ssafy.togetdog.user.model.entity.User;
import com.ssafy.togetdog.user.model.repository.UserRepository;
import com.ssafy.togetdog.user.model.service.JwtService;
import com.ssafy.togetdog.user.model.vo.UserPrincipal;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class OAuth2SuccessHandler extends SimpleUrlAuthenticationSuccessHandler {
	
	private final JwtService jwtService;
	private final UserRepository userRepository;
	
	private final Logger logger = LoggerFactory.getLogger(OAuth2SuccessHandler.class);

	@Override
	public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
			Authentication authentication) throws IOException, ServletException {
		
        String targetUrl = getTargetUrl(request, response, authentication);
        if (response.isCommitted()) {
            logger.debug("Response를 이미 받으셨습니다. 다음URL에 리다이렉트 할 수 없습니다. URL: " + targetUrl);
            return;
        }
		getRedirectStrategy().sendRedirect(request, response, targetUrl);
	}
	
	protected String getTargetUrl(HttpServletRequest request, HttpServletResponse response, Authentication authentication) {
        UserPrincipal userPrincipal = ((UserPrincipal) authentication.getPrincipal());
        if (authentication.getName().equals("disable")) {
        	logger.debug("이미 이 이메일로 해당 social이 아닌 경로로 가입이 이루어진 유저의 접근");
        	return UriComponentsBuilder.fromUriString("/oautherror")
	                .build().toUriString();
		} else if ((boolean) userPrincipal.getAttribute("login")) {
			logger.debug("소셜 회원의 로그인 시도 입니다.");
			User user = userRepository.findByEmail(authentication.getName()).orElse(null);
			if (user != null) {
				String accessToken = jwtService.createAccessToken(user.getUserId());
				return UriComponentsBuilder.fromUriString("/oauth")
		                .queryParam("access-token", accessToken)
		                .queryParam("user", UserLoginRespDTO.of(user))
		                .build()
		                .encode()
		                .toUriString();
			}
			// user를 찾을 수 없으면 login으로 튕기게 처리
			return UriComponentsBuilder.fromUriString("/login")
	                .build()
	                .encode()
	                .toUriString();
		} else {
			logger.debug("새로운 소셜 가입 시도입니다.");
			User user = User.builder()
					.email(authentication.getName())
					.nickName(userPrincipal.getAttribute("nickname"))
					.social(userPrincipal.getAttribute("social"))
					.build();
			return UriComponentsBuilder.fromUriString("/socialsignup")
	                .queryParam("user", UserSocialLoginRespDTO.of(user))
	                .build()
	                .encode()
	                .toUriString();
		}
    }
	
}
