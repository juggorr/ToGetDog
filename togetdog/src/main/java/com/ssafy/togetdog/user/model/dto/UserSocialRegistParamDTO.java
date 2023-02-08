package com.ssafy.togetdog.user.model.dto;

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
public class UserSocialRegistParamDTO {
	private String email;
	private String password;
	private String nickname;
	private String gender;
	private String birth;
	private String address;
	private String regionCode;
	private String social;
}
