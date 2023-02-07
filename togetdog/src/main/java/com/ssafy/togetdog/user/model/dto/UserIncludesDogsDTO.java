package com.ssafy.togetdog.user.model.dto;

import java.time.LocalDate;
import java.util.List;

import com.ssafy.togetdog.dog.model.dto.DogInfoForUserDTO;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class UserIncludesDogsDTO {
	long userId;
	String nickname;
	int userAge;
	String userGender;
	String address;
	String regionCode;
	String social;
	double rating;
	List<DogInfoForUserDTO> dogs;
	int followCnt;
	
	public UserIncludesDogsDTO(UserInfoRespDTO userInfo) {
		LocalDate now = LocalDate.now();
		
		this.nickname = userInfo.getNickName();
		this.userAge = now.getYear() - Integer.parseInt(userInfo.getBirth());
		this.userGender = userInfo.getUserGender();
		this.address = userInfo.getAddress();
		this.regionCode = userInfo.getRegionCode();
		this.social = userInfo.getSocial();
		this.rating = userInfo.getRating();
	}

}
