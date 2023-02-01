package com.ssafy.togetdog.dummy.appointment.domain;

import java.util.Date;
import java.util.List;

import com.ssafy.togetdog.dummy.dog.domain.DogForMeetingDTO;

import lombok.Data;

@Data
public class MeetingDTO {
	
	private String partnerName;
	private double rating;
	private long appointmentId;
	private String place;
	private Date date;
	private List<DogForMeetingDTO> myDogs;
	private List<DogForMeetingDTO> partnerDogs;
	private String status;
	private boolean isRated;
}
