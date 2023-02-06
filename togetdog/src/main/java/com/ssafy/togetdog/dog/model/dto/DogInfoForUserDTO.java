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
	private int dogFollwerCnt;

	public static DogInfoForUserDTO of(Dog dog) {
		//birth 기준으로 개월 수 변환
		LocalDateTime now = LocalDateTime.now();
		int nowMonth = (now.getYear() * 12) + now.getMonthValue();
		int dogMonth = (Integer.parseInt(dog.getDogBirth().substring(0, 4)) * 12)
				+ Integer.parseInt(dog.getDogBirth().substring(4, 6));
		
		return DogInfoForUserDTO.builder()
				.dogId(dog.getDogId())
				.userId(dog.getUser().getUserId())
				.dogName(dog.getDogName())
				.dogGender(dog.getDogGender())
				.dogType(dog.getDogType())
				.dogAge(nowMonth - dogMonth)
				.dogWeight(Double.parseDouble(dog.getDogWeight()))
				.dogNeutered(dog.isDogNeutered())
				.dogCharacter1(dog.getDogCharacter1())
				.dogCharacter2(dog.getDogCharacter2())
				.description(dog.getDescription())
				.dogProfile(dog.getDogImage())
				.build();
	}
}

