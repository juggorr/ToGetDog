package com.ssafy.togetdog.user.model.dto;

import com.ssafy.togetdog.user.model.entity.User;

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
	private long userId;
	private String nickName;
	
    public static UserSocialLoginRespDTO of(User user) {
    	return UserSocialLoginRespDTO.builder()
    			.userId(user.getUserId())
    			.nickName(user.getNickName())
    			.email(user.getEmail())
    			.build();
    }
}
