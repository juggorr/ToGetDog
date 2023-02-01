package com.ssafy.togetdog.dummy.user.domain;

import java.util.Date;

import lombok.Data;

@Data
public class User {
	private int user_id;
	private String email;
	private String nickname;
	private String password;
	private Date user_birth;
	private String user_gender;
	private String address;
	private int region_code;
	private String social;
	private int rating_sum;
	private int rating_count;
	private String token;
}
