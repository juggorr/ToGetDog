package com.ssafy.togetdog.dummy.domain;

import java.util.List;

import lombok.Data;

@Data
public class AppointMentInfo {
	private String userId;
	private List<DogDTO> myDogs;
	private List<DogDTO> partnerDogs;
	private String date;
	private String place;
}
