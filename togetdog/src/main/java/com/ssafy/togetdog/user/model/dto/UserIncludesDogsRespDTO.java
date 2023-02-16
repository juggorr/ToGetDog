package com.ssafy.togetdog.user.model.dto;

import java.time.LocalDate;
import java.util.List;

import javax.validation.constraints.Size;

import com.ssafy.togetdog.dog.model.dto.DogInfoForUserDTO;
import com.ssafy.togetdog.user.model.entity.User;
import com.ssafy.togetdog.user.model.vo.ProviderType;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Builder
@Getter
@Setter
@ToString
public class UserIncludesDogsRespDTO {
	long userId;
	String nickname;
	int userAge;
	String userGender;
	String address;
	String regionCode;
	String social;
	double rating;
	List<DogInfoForUserDTO> dogs;
	
	public static UserIncludesDogsRespDTO of(User user, List<DogInfoForUserDTO> dogs) {
		String gender = user.getGender();
		if (gender.equals("f")) gender = "female";
		else if (gender.equals("m")) gender = "male";
		else gender = "none";

		String social = "origin";
		@Size(min = 1, max = 1)
		ProviderType beforeSocial = user.getSocial();
		if (beforeSocial.equals(ProviderType.N))
			social = "naver";
		else if (beforeSocial.equals(ProviderType.K))
			social = "kakao";
		else if (beforeSocial.equals(ProviderType.G))
			social = "google";

		double rating = 0;
		if (user.getRatingCount() != 0) {
			rating = (int) user.getRatingSum() / user.getRatingCount();
		}
		
		LocalDate now = LocalDate.now();
		return UserIncludesDogsRespDTO.builder()
				.userId(user.getUserId())
				.nickname(user.getNickName())
				.userAge(now.getYear() - Integer.parseInt(user.getUserBirth()))
				.userGender(gender)
				.address(user.getAddress())
				.regionCode(user.getRegionCode())
				.social(social)
				.rating(rating)
				.dogs(dogs)
				.build();
	}

}