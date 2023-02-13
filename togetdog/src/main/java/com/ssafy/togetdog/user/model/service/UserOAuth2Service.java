package com.ssafy.togetdog.user.model.service;

import javax.transaction.Transactional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import com.ssafy.togetdog.user.model.entity.User;
import com.ssafy.togetdog.user.model.repository.UserRepository;
import com.ssafy.togetdog.user.model.vo.OAuthAttributes;
import com.ssafy.togetdog.user.model.vo.UserPrincipal;

import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class UserOAuth2Service extends DefaultOAuth2UserService {

	private final UserRepository userRepository;
	private final Logger logger = LoggerFactory.getLogger(UserOAuth2Service.class);
	
	@Override
	public OAuth2User loadUser(
			OAuth2UserRequest userRequest
			) throws OAuth2AuthenticationException {
		logger.info("outh service in");
		
		OAuth2User oAuth2User = super.loadUser(userRequest);
		
		String registrationId = userRequest.getClientRegistration().getRegistrationId(); // ex) naver
        String userNameAttributeName = userRequest.getClientRegistration().getProviderDetails().getUserInfoEndpoint().getUserNameAttributeName();
        
        OAuthAttributes attributes = OAuthAttributes.of(registrationId, userNameAttributeName, oAuth2User.getAttributes());
        
        User user = userRepository.findByEmail(attributes.getEmail()).orElse(null);
        if (user == null) {
        	user = User.builder()
        			.email(attributes.getEmail())
        			.nickName(attributes.getName())
        			.social(attributes.getSocial())
        			.build();
        	return UserPrincipal.create(user);
        } else {
        	// already regist
        	if (user.getSocial() != attributes.getSocial()) {
        		logger.info("outh disable");
        		return UserPrincipal.disable();
        	}
        	// 이미 가입 처리 되어 있고 로그인만 시켜주면 된다는 의미를 보내야 함.
        	logger.info("outh login");
        	return UserPrincipal.login(user);
        }
	}

}