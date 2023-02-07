package com.ssafy.togetdog.dog.model.dto;

import java.time.LocalDateTime;

import com.ssafy.togetdog.dog.model.entity.Dog;

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
public class DogInfoRespDTO {
	private long dogId;
	private long userId;
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
	
	
	public static DogInfoRespDTO of(Dog dog, double dogWeight) {
		//birth 기준으로 개월 수 변환
		LocalDateTime now = LocalDateTime.now();
		int nowMonth = (now.getYear() * 12) + now.getMonthValue();
		int dogMonth = (Integer.parseInt(dog.getDogBirth().substring(0, 4)) * 12)
				+ Integer.parseInt(dog.getDogBirth().substring(4, 6));
		
		String dogC1 = dog.getDogCharacter1();
		String dogC2 = dog.getDogCharacter2();
		if (dogC1.equals("d")) {
			dogC1 = "disobedient";
		} else {
			dogC2 = "obedient";
		}
		if (dogC2.equals("a")) {
			dogC2 = "active";
		} else {
			dogC2 = "inactive";
		}
		
		return DogInfoRespDTO.builder()
				.dogId(dog.getDogId())
				.userId(dog.getUser().getUserId())
				.dogName(dog.getDogName())
				.dogGender(dog.getDogGender())
				.dogType(dog.getDogType())
				.dogAge(nowMonth - dogMonth)
				.dogWeight(dogWeight)
				.dogNeutered(dog.isDogNeutered())
				.dogCharacter1(dogC1)
				.dogCharacter2(dogC2)
				.description(dog.getDescription())
				.dogProfile(dog.getDogImage())
				.build();
	}


	public static DogInfoRespDTO of(Dog dog) {
		return DogInfoRespDTO.builder()
				.dogId(dog.getDogId())
				.userId(dog.getUser().getUserId())
				.dogName(dog.getDogName())
				.dogGender(dog.getDogGender())
				.dogProfile(dog.getDogImage())
				.build();
	}
}
