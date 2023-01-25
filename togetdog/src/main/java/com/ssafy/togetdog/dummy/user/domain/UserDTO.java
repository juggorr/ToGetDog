package com.ssafy.togetdog.dummy.user.domain;

import lombok.Data;

// Client측에 보낼 정보만 추린 DTO
@Data
public class UserDTO {
	private int userId;
	private String nickName;
	private int userAge;
	private String userGender;
	private String address;
	private int regionCode;
	private String social;
	private double rating;
}
