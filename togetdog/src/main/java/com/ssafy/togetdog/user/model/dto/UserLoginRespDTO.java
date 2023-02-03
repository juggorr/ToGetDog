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
public class UserLoginRespDTO {
	private String email;
	private long userId;
	private String nickName;
	private String address;
	
    public static UserLoginRespDTO of(User user) {
    	return UserLoginRespDTO.builder()
    			.email(user.getEmail())
    			.userId(user.getUserId())
    			.nickName(user.getNickName())
    			.address(user.getAddress())
    			.build();
    }
}
