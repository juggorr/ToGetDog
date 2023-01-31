package com.ssafy.togetdog.user.model.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
public class UserInfoRespDTO {
	private String email;
	private String nickName;
	private String birth;
	private String userGender;
	private String address;
	private String regionCode;
	private String social;
	private double rating;
}
