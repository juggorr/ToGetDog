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
public class UserLoginParamDTO {
	private String email;
	private String password;
	
	private long userId;
	private String nickName;
	private String address;
	
    public static UserLoginParamDTO of(User user) {
    	return UserLoginParamDTO.builder()
    			.userId(user.getUserId())
    			.nickName(user.getNickName())
    			.address(user.getAddress())
    			.build();
    }
    
    public static UserLoginParamDTO of(User user, String email) {
    	return UserLoginParamDTO.builder()
    			.userId(user.getUserId())
    			.email(email)
    			.nickName(user.getNickName())
    			.address(user.getAddress())
    			.build();
    }
}
