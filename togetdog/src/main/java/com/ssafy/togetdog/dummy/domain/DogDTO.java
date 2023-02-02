package com.ssafy.togetdog.dummy.domain;

import lombok.Data;

@Data
public class DogDTO {
	private long dogId;
	private String dogName;
	
	private long userId;
	private String nickName;
	private String address;
	
	private String dogGender;
	private String dogType;
	private int dogAge;
	private double dogWeight;
	private boolean dogNeutered;
	private String dogCharacter1;
	private String dogCharacter2;
	private String description;
	private String dogProfile;
}
