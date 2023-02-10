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
		String receivedSocial = userDTO.getSocial().toUpperCase();
		if (receivedSocial.equals("K")) {
			return User.builder()
					.email(userDTO.getEmail())
					.nickName(userDTO.getNickname())
					.password("=====social=====")
					.gender(userDTO.getGender().charAt(0) + "")
					.userBirth(userDTO.getBirth())
					.address(userDTO.getAddress())
					.regionCode(userDTO.getRegionCode())
					.social(ProviderType.K)
					.ratingSum(0)
					.ratingCount(0)
					.roleType(RoleType.USER)
					.build();
		} else if (receivedSocial.equals("G")) {
			return User.builder()
					.email(userDTO.getEmail())
					.nickName(userDTO.getNickname())
					.password("=====social=====")
					.gender(userDTO.getGender().charAt(0) + "")
					.userBirth(userDTO.getBirth())
					.address(userDTO.getAddress())
					.regionCode(userDTO.getRegionCode())
					.social(ProviderType.G)
					.ratingSum(0)
					.ratingCount(0)
					.roleType(RoleType.USER)
					.build();
		} else {
			return User.builder()
					.email(userDTO.getEmail())
					.nickName(userDTO.getNickname())
					.password("=====social=====")
					.gender(userDTO.getGender().charAt(0) + "")
					.userBirth(userDTO.getBirth())
					.address(userDTO.getAddress())
					.regionCode(userDTO.getRegionCode())
					.social(ProviderType.N)
					.ratingSum(0)
					.ratingCount(0)
					.roleType(RoleType.USER)
					.build();
		}
	}
}
