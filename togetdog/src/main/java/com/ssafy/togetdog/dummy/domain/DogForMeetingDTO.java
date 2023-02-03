package com.ssafy.togetdog.dummy.domain;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class DogForMeetingDTO {
	
	public DogForMeetingDTO(String image, String dogName) {
		this.image = image;
		this.dogName = dogName;
	}

	private String image;
	private String dogName;
	private String dogCharacter1;
	private String dogCharacter2;
	private boolean dogNeutered;
	
}
