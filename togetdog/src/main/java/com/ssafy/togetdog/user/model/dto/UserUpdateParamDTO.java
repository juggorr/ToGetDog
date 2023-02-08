package com.ssafy.togetdog.user.model.dto;

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
public class UserUpdateParamDTO {
	private String nickName;
	private String gender;
	private String birth;
	private String address;
	private String regionCode;
	
	public static UserUpdateParamDTO of(UserUpdateParamDTO userDTO) {
		return UserUpdateParamDTO.builder()
				.nickName(userDTO.getNickName())
				.gender(userDTO.getGender().charAt(0) + "")
				.birth(userDTO.getBirth())
				.address(userDTO.getAddress())
				.regionCode(userDTO.getRegionCode())
				.build();
	}
}
