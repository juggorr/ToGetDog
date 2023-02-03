package com.ssafy.togetdog.user.model.dto;

import lombok.Setter;

import java.util.List;

import com.ssafy.togetdog.dog.model.dto.DogInfoRespDTO;

import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

@Builder
@Getter
@Setter
@ToString
public class UserIncludesDogs {
	long userId;
	String nickname;
	String userAge;
	String userGender;
	String address;
	String regionCode;
	String social;
	String rating;
	List<DogInfoRespDTO> dogs;
	boolean follow;
	int followCnt;
}
