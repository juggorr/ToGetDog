package com.ssafy.togetdog.dog.model.dto;

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
public class DogRegistParamDTO {
	private String dogName;
	private String dogGender;
	private String dogType;
	private String dogBirth;
	private String dogWeight;
	private boolean dogNeutered;
	private String dogCharacter1;
	private String dogCharacter2;
	private String description;
}
