package com.ssafy.togetdog.dog.model.dto;

import com.ssafy.togetdog.dog.model.entity.Dog;
import com.ssafy.togetdog.user.model.entity.User;

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
public class DogRegistParamDTO {
	private String dogName;
	private String dogGender; 
	private String dogType;
	private String dogBirth;
	private String dogWeight;
	private boolean dogNeutered;
	private String dogCharacter1; //
	private String dogCharacter2; //
	private String description;
	
	public Dog of(DogRegistParamDTO dogDTO, User user, String image) {
		String gender = dogDTO.getDogGender();
		if (gender.equals("female")) gender = "f";
		else gender = "m";
		
		Dog dog = Dog.builder()
				.user(user)
				.dogName(dogDTO.getDogName())
				.dogGender(gender)
				.dogType(dogDTO.getDogType())
				.dogBirth(dogDTO.getDogBirth())
				.dogWeight(dogDTO.getDogWeight())
				.dogNeutered(dogDTO.isDogNeutered())
				.dogCharacter1(dogDTO.getDogCharacter1().charAt(0) + "")
				.dogCharacter2(dogDTO.getDogCharacter2().charAt(0) + "")
				.description(dogDTO.getDescription())
				.dogImage(image)
				.build();
		return dog;
	}
}
