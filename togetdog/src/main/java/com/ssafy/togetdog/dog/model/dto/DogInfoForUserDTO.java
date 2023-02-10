package com.ssafy.togetdog.dog.model.dto;

import java.time.LocalDateTime;

import com.ssafy.togetdog.dog.model.entity.Dog;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import lombok.experimental.SuperBuilder;

@SuperBuilder
@Getter
@Setter
@ToString
public class DogInfoForUserDTO extends DogInfoRespDTO {
	private boolean isFollowing;
	private int dogFollowerCnt;

	public static DogInfoForUserDTO of(Dog dog) {
		//birth 기준으로 개월 수 변환
		LocalDateTime now = LocalDateTime.now();
		int nowMonth = (now.getYear() * 12) + now.getMonthValue();
		int dogMonth = (Integer.parseInt(dog.getDogBirth().substring(0, 4)) * 12)
				+ Integer.parseInt(dog.getDogBirth().substring(4, 6));

		// character full word로 변환
		String dogC1 = dog.getDogCharacter1();
		String dogC2 = dog.getDogCharacter2();
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
		String gender = dog.getDogGender();
		if (gender.equals("f")) {
			gender = "female";
		} else {
			gender = "male";
		}

		return DogInfoForUserDTO.builder()
				.dogId(dog.getDogId())
				.userId(dog.getUser().getUserId())
				.dogName(dog.getDogName())
				.dogGender(gender)
				.dogType(dog.getDogType())
				.dogAge(nowMonth - dogMonth)
				.dogWeight(Double.parseDouble(dog.getDogWeight()))
				.dogNeutered(dog.isDogNeutered())
				.dogCharacter1(dogC1)
				.dogCharacter2(dogC2)
				.description(dog.getDescription())
				.dogProfile(dog.getDogImage())
				.build();
	}
}

