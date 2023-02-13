package com.ssafy.togetdog.user.model.dto;

import com.ssafy.togetdog.user.model.entity.User;
import com.ssafy.togetdog.user.model.vo.ProviderType;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class UserSocialLoginRespDTO {
	private String email;
	private String nickName;
	private ProviderType social;
	
    public static UserSocialLoginRespDTO of(User user) {
    	return UserSocialLoginRespDTO.builder()
    			.email(user.getEmail())
    			.nickName(user.getNickName())
    			.social(user.getSocial())
    			.build();
    }
}
