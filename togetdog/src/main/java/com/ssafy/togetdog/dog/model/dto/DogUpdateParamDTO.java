package com.ssafy.togetdog.dog.model.dto;

import com.ssafy.togetdog.dog.model.entity.Dog;
import com.ssafy.togetdog.user.model.entity.User;

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
	
	public Dog of(DogUpdateParamDTO dogDTO, Dog dog, User user) {
		String gender = dogDTO.getDogGender();
		if (gender.equals("female")) gender = "f";
		else gender = "m";
		dog.setUser(user);
		dog.setDogName(dogDTO.getDogName());
		dog.setDogGender(gender);
		dog.setDogType(dogDTO.getDogType());
		dog.setDogBirth(dogDTO.getDogBirth());
		dog.setDogWeight(dogDTO.getDogWeight());
		dog.setDogNeutered(dogDTO.isDogNeutered());
		dog.setDogCharacter1(dogDTO.getDogCharacter1().charAt(0) + "");
		dog.setDogCharacter2(dogDTO.getDogCharacter2().charAt(0) + "");
		dog.setDescription(dogDTO.getDescription());
		return dog;
	}
	
	public Dog of(DogUpdateParamDTO dogDTO, Dog dog, User user, String image) {
		String gender = dogDTO.getDogGender();
		if (gender.equals("female")) gender = "f";
		else gender = "m";
		dog.setUser(user);
		dog.setDogName(dogDTO.getDogName());
		dog.setDogGender(gender);
		dog.setDogType(dogDTO.getDogType());
		dog.setDogBirth(dogDTO.getDogBirth());
		dog.setDogWeight(dogDTO.getDogWeight());
		dog.setDogNeutered(dogDTO.isDogNeutered());
		dog.setDogCharacter1(dogDTO.getDogCharacter1().charAt(0) + "");
		dog.setDogCharacter2(dogDTO.getDogCharacter2().charAt(0) + "");
		dog.setDescription(dogDTO.getDescription());
		dog.setDogImage(image);
		return dog;
	}
}
