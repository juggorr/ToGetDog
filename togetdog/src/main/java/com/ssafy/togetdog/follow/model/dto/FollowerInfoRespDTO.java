package com.ssafy.togetdog.follow.model.dto;

import java.time.LocalDate;

import javax.validation.constraints.Size;

import com.ssafy.togetdog.user.model.entity.User;
import com.ssafy.togetdog.user.model.vo.ProviderType;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Builder
@Setter
@Getter
@ToString
public class FollowerInfoRespDTO {
	private long userId;
	private String nickname;
	private int userAge;
	private String userGender;
	private String address;
	private String regionCode;
	private String social;
	private double rating;
	
	public static FollowerInfoRespDTO of(User user) {
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
			rating = user.getRatingSum() / user.getRatingCount();
		}
		
		LocalDate now = LocalDate.now();
		return FollowerInfoRespDTO.builder()
				.userId(user.getUserId())
				.nickname(user.getNickName())
				.userAge(now.getYear() - Integer.parseInt(user.getUserBirth()))
				.userGender(gender)
				.address(user.getAddress())
				.regionCode(user.getRegionCode())
				.social(social)
				.rating(rating)
				.build();
	}
}
