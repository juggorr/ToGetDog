package com.ssafy.togetdog.user.model.dto;

import java.time.LocalDateTime;

import com.ssafy.togetdog.user.model.entity.WaitUser;

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
public class UserRegistParamDTO {
	private String email;
	private String password;
	private String nickname;
	private String gender;
	private String birth;
	private String address;
	private String regionCode;
	
	public WaitUser of(String authKey) {
		String gender = this.gender;
		if (gender.equals("female")) {
			gender = "f";
		} else if (gender.equals("male")) {
			gender = "m";
		} else {
			gender = "n";
		}
		return  WaitUser.builder()
				.email(this.email)
				.nickName(this.nickname)
				.password(this.password)
				.userBirth(this.birth)
				.gender(gender)
				.address(this.address)
				.regionCode(this.regionCode)
				.authKey(authKey)
				.registDate(LocalDateTime.now())
				.build();
	}
}
