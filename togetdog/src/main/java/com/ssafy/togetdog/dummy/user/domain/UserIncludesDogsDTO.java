package com.ssafy.togetdog.dummy.user.domain;

import java.util.ArrayList;
import java.util.List;

import com.ssafy.togetdog.dummy.dog.domain.DogDTO;

import lombok.Data;

@Data
public class UserIncludesDogsDTO {
	private Long userId;
	private String nickName;
	private int userAge;
	private String userGender;
	private String address;
	private String regionCode;
	private String social;
	private double rating;
	private List<DogDTO> dog = new ArrayList<>();
	private boolean isFollow;
	private int followCnt;
}
