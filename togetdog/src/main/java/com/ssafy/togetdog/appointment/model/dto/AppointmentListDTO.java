package com.ssafy.togetdog.appointment.model.dto;

import java.time.LocalDateTime;
import java.util.List;

import com.ssafy.togetdog.appointment.model.entity.Appointment;
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
public class AppointmentListDTO {
	private long roomId;
	private long sentUserId;
	private int sentUserRating; //유저 정보에서 가져와야함
	private long receivedUserId;
	private int receiveUserRating; //유저 정보에서 가져와야함
	private List<Dog> sentDogs; // 개 정보 따로 불러와야함
	private List<Dog> receivedDogs; // 개 정보 따로 불러와야함
	private String place;
	private LocalDateTime dateTime;
	private String status;
	private boolean isSenderRate;
	private boolean isReceiverRate;
	
	public static AppointmentListDTO of(Appointment appointment) {
		
		return AppointmentListDTO.builder()
				.roomId(appointment.getRoomId())
				.sentUserId(appointment.getSentUser().getUserId())
				.receivedUserId(appointment.getReceivedUser().getUserId())
				.place(appointment.getPlace())
				.dateTime(appointment.getDateTime())
				.status(appointment.getStatus())
				.isSenderRate(appointment.isSenderRated())
				.isReceiverRate(appointment.isReceiverRated())
				.build();
	}
}
