package com.ssafy.togetdog.user.model.service;

import java.util.Collections;

import javax.transaction.Transactional;

import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserService;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.DefaultOAuth2User;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import com.ssafy.togetdog.user.model.entity.User;
import com.ssafy.togetdog.user.model.repository.UserRepository;
import com.ssafy.togetdog.user.model.vo.OAuthAttributes;

import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class UserOAuth2Service implements OAuth2UserService<OAuth2UserRequest, OAuth2User> {

	private final UserRepository userRepository;
	
	@Override
	public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
		
		OAuth2UserService<OAuth2UserRequest, OAuth2User> service = new DefaultOAuth2UserService();
		OAuth2User oAuth2User = service.loadUser(userRequest); // Oath2 정보를 가져옴
		
		String registrationId = userRequest.getClientRegistration().getRegistrationId(); // 소셜 정보 가져옴
        String userNameAttributeName = userRequest.getClientRegistration().getProviderDetails().getUserInfoEndpoint().getUserNameAttributeName(); 
        
        OAuthAttributes attributes = OAuthAttributes.of(registrationId, userNameAttributeName, oAuth2User.getAttributes());

        User user = userRepository.findByEmail(attributes.getEmail()).orElse(null);

        return new DefaultOAuth2User(Collections.singleton(new SimpleGrantedAuthority(user.getRoleType().getCode())),
                attributes.getAttributes(),
        		attributes.getNameAttributeKey());
	}

}