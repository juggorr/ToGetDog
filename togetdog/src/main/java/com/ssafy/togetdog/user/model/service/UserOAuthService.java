package com.ssafy.togetdog.user.model.service;

import java.util.Collections;

import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserService;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.DefaultOAuth2User;
import org.springframework.security.oauth2.core.user.OAuth2User;

import com.ssafy.togetdog.user.model.entity.User;
import com.ssafy.togetdog.user.model.vo.OAuthAttributes;

public class UserOAuthService implements OAuth2UserService<OAuth2UserRequest, OAuth2User> {

	@Override
	public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
		OAuth2UserService<OAuth2UserRequest, OAuth2User> delegate = new DefaultOAuth2UserService();
		OAuth2User oAuth2User = delegate.loadUser(userRequest);

		String registrationId = userRequest.getClientRegistration().getRegistrationId();
		String userNameAttributeName = userRequest
				.getClientRegistration().getProviderDetails().getUserInfoEndpoint().getUserNameAttributeName();
		// naver, kakao 로그인 구분
		OAuthAttributes attributes = OAuthAttributes.of(registrationId, oAuth2User.getAttributes());
				//(registrationId, userNameAttributeName, oAuth2User.getAttributes());

		User user = saveOrUpdate(attributes);

		return new DefaultOAuth2User(Collections.singleton(new SimpleGrantedAuthority(user.getRoleType().getCode())),
				attributes.getAttributes(), attributes.getNameAttributeKey());
	}
	
	 private User saveOrUpdate(OAuthAttributes attributes) {
	        User user = null;
//	        		userRepository.findByEmail(attributes.getEmail())
//	                .map(entity -> entity.update(attributes.getNickname(), attributes.getPicture()))
//	                .orElse(attributes.toEntity());

	        //return userRepository.save(user);
	        return null;
	    }

}
