package com.ssafy.togetdog.search.model.dto;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import javax.validation.constraints.Size;

import com.ssafy.togetdog.dog.model.dto.DogInfoForUserDTO;
import com.ssafy.togetdog.user.model.entity.User;
import com.ssafy.togetdog.user.model.vo.ProviderType;

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
public class SearchUserDTO {
	private String email;
	private String nickName;
	private String birth;
	private String userGender;
	private String address;
	private String regionCode;
	private String social;
	private double rating;
	List<String> userDogs;
	
	public static SearchUserDTO of(User user, List<DogInfoForUserDTO> dogs) {
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
		List<String> list = new ArrayList<>();
		for (DogInfoForUserDTO d : dogs) {
			list.add(d.getDogType());
		}
		LocalDate now = LocalDate.now();
		return SearchUserDTO.builder()
				.email(user.getEmail())
				.nickName(user.getNickName())
				.birth(user.getUserBirth())
				.userGender(gender)
				.address(user.getAddress())
				.regionCode(user.getRegionCode())
				.social(social)
				.rating(rating)
				.userDogs(list)
				.build();
	}
}
