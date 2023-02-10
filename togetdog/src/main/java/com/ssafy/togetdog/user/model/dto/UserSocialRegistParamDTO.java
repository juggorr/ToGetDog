package com.ssafy.togetdog.user.model.dto;

import com.ssafy.togetdog.user.model.entity.User;
import com.ssafy.togetdog.user.model.vo.ProviderType;
import com.ssafy.togetdog.user.model.vo.RoleType;

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
public class UserSocialRegistParamDTO {
	private String email;
	private String nickname;
	private String gender;
	private String birth;
	private String address;
	private String regionCode;
	private String social;
	
	public static User of(UserSocialRegistParamDTO userDTO) {
		ProviderType social = ProviderType.N;
		if (userDTO.getSocial().equals("kakao") || userDTO.getSocial().equals("k") || userDTO.getSocial().equals("K")) {
			social = ProviderType.K;
		}
		if (userDTO.getSocial().equals("google") || userDTO.getSocial().equals("g") || userDTO.getSocial().equals("G")) {
			social = ProviderType.G;
		}
		return User.builder()
				.email(userDTO.getEmail())
				.nickName(userDTO.getNickname())
				.password("=====social=====")
				.gender(userDTO.getGender().charAt(0) + "")
				.userBirth(userDTO.getBirth())
				.address(userDTO.getAddress())
				.regionCode(userDTO.getRegionCode())
				.social(social)
				.ratingSum(0)
				.ratingCount(0)
				.roleType(RoleType.USER)
				.build();
	}
}
