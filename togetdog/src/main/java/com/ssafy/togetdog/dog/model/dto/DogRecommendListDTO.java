package com.ssafy.togetdog.dog.model.dto;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import lombok.experimental.SuperBuilder;

@SuperBuilder
@Builder
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class DogRecommendListDTO {
	private long dogId;
	private long userId;
	private String nickname;
	private String userAddress;
	private String dogName;
	private String dogGender;
	private String dogType;
	private int dogAge;
	private double dogWeight;
	private boolean dogNeutered;
	private String dogCharacter1;
	private String dogCharacter2;
	private String description;
	private String dogProfile;
	
	
	public static DogRecommendListDTO of(Object[] result) {
		//birth 기준으로 개월 수 변환
		LocalDateTime now = LocalDateTime.now();
		int nowMonth = (now.getYear() * 12) + now.getMonthValue();
		int dogMonth = (Integer.parseInt(((String)result[5]).substring(0, 4)) * 12)
				+ Integer.parseInt(((String)result[5]).substring(4, 6));
		
		// character full word로 변환
		String dogC1 = String.valueOf(result[8]);
		String dogC2 = String.valueOf(result[9]);
		if (dogC1.equals("d")) {
			dogC1 = "disobedient";
		} else {
			dogC1 = "obedient";
		}
		if (dogC2.equals("a")) {
			dogC2 = "active";
		} else {
			dogC2 = "inactive";
		}
		
		// gender full word로 변환
		String gender = String.valueOf(result[3]);
		if (gender.equals("f")) {
			gender = "female";
		} else {
			gender = "male";
		}
		
		return DogRecommendListDTO.builder()
				.dogId(Long.parseLong(String.valueOf(result[0])))
				.userId(Long.parseLong(String.valueOf(result[1])))
				.dogName(String.valueOf(result[2]))
				.dogGender(gender)
				.dogType(String.valueOf(result[4]))
				.dogAge(nowMonth - dogMonth)
				.dogWeight(Double.parseDouble(String.valueOf(result[6])))
				.dogNeutered(((Boolean) result[7]).booleanValue())
				.dogCharacter1(dogC1)
				.dogCharacter2(dogC2)
				.description(String.valueOf(result[10]))
				.dogProfile(String.valueOf(result[11]))
				.userAddress(String.valueOf(result[12]))
				.nickname(String.valueOf(result[13]))
				.build();
	}
}
