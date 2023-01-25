package com.ssafy.togetdog.dummy.user.domain;

import java.util.Date;

import lombok.Data;

// DB Entity와 일치하는 Object
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
