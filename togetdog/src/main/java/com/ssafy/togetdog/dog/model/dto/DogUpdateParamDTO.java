package com.ssafy.togetdog.dog.model.dto;

import com.ssafy.togetdog.dog.model.entity.Dog;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class DogUpdateParamDTO extends DogRegistParamDTO {
	private long dogId;
	private String dogImage;
	
	public static Dog of(DogUpdateParamDTO dogDTO, String image) {
		String gender = dogDTO.getDogGender();
		if (gender.equals("female")) gender = "f";
		else gender = "m";
		Dog dog = Dog.builder()
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
	
	public static Dog of(DogUpdateParamDTO dogDTO) {
		String gender = dogDTO.getDogGender();
		if (gender.equals("female")) gender = "f";
		else gender = "m";
		Dog dog = Dog.builder()
				.dogName(dogDTO.getDogName())
				.dogGender(gender)
				.dogType(dogDTO.getDogType())
				.dogBirth(dogDTO.getDogBirth())
				.dogWeight(dogDTO.getDogWeight())
				.dogNeutered(dogDTO.isDogNeutered())
				.dogCharacter1(dogDTO.getDogCharacter1().charAt(0) + "")
				.dogCharacter2(dogDTO.getDogCharacter2().charAt(0) + "")
				.description(dogDTO.getDescription())
				.build();
		return dog;
	}
}
