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
public class AppointmentInfoRespDTO {
	private long roomId;
	private long sentUserId;
	private long receivedUserId;
	private List<Dog> sentDogs;
	private List<Dog> receivedDogs;
	private String place;
	private LocalDateTime dateTime;
	private String status;
	private boolean isSenderRate;
	private boolean isReceiverRate;
	
	
	public static AppointmentInfoRespDTO of(Appointment appointment) {
		
		return AppointmentInfoRespDTO.builder()
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
