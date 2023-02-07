package com.ssafy.togetdog.appointment.model.dto;

import java.time.LocalDateTime;
import java.util.List;

import com.ssafy.togetdog.appointment.model.entity.Appointment;
import com.ssafy.togetdog.dog.model.dto.DogInfoRespDTO;
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
	private long userOneId;
	private int userOneRating; //유저 정보에서 가져와야함
	private long userTwoId;
	private int userTwoRating; //유저 정보에서 가져와야함
	private List<DogInfoRespDTO> userOneDogs; // 개 정보 따로 불러와야함
	private List<DogInfoRespDTO> userTwoDogs; // 개 정보 따로 불러와야함
	private String place;
	private LocalDateTime dateTime;
	private String status;
	private boolean isUserOneRated;
	private boolean isUserTwoRated;
	
	public static AppointmentListDTO of(Appointment appointment) {
		
		return AppointmentListDTO.builder()
				.roomId(appointment.getRoomId())
				.userOneId(appointment.getSentUser().getUserId())
				.userTwoId(appointment.getReceivedUser().getUserId())
				.place(appointment.getPlace())
				.dateTime(appointment.getDateTime())
				.status(appointment.getStatus())
				.isUserOneRated(appointment.isSenderRated())
				.isUserTwoRated(appointment.isReceiverRated())
				.build();
	}
}
