package com.ssafy.togetdog.dog.model.dto;

import java.time.LocalDateTime;

import com.ssafy.togetdog.dog.model.entity.Dog;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

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
		
		return DogInfoRespDTO.builder()
				.dogId(dog.getDogId())
				.userId(dog.getUser().getUserId())
				.dogName(dog.getDogName())
				.dogGender(dog.getDogGender())
				.dogType(dog.getDogType())
				.dogAge(nowMonth - dogMonth)
				.dogWeight(dogWeight)
				.dogNeutered(dog.isDogNeutered())
				.dogCharacter1(dog.getDogCharacter1())
				.dogCharacter2(dog.getDogCharacter2())
				.description(dog.getDescription())
				.dogProfile(dog.getDogImage())
				.build();
	}
}