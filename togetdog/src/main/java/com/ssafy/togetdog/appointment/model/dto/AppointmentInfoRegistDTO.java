package com.ssafy.togetdog.appointment.model.dto;

import java.time.LocalDateTime;
import java.util.List;

import com.ssafy.togetdog.appointment.model.entity.Appointment;
import com.ssafy.togetdog.appointment.model.entity.ReceivedAppointment;
import com.ssafy.togetdog.appointment.model.entity.SentAppointment;
import com.ssafy.togetdog.dog.model.entity.Dog;
import com.ssafy.togetdog.user.model.entity.User;

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
public class AppointmentInfoRegistDTO {
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
	
	
	public Appointment toAppointment() {
		User sentUser = new User();
		sentUser.setUserId(this.sentUserId);
		User recvUser = new User();
		recvUser.setUserId(this.receivedUserId);
		
		return Appointment.builder()
				.roomId(this.roomId)
				.sentUser(sentUser)
				.receivedUser(recvUser)
				.place(this.place)
				.dateTime(this.dateTime)
				.status(this.status)
				.isSenderRated(this.isSenderRate)
				.isReceiverRated(this.isReceiverRate)
				.build();
	}
	
	public SentAppointment toSentAppointment(long roomId, long dogId) {
		Appointment appointment = new Appointment();
		appointment.setRoomId(roomId);
		Dog dog = new Dog();
		dog.setDogId(dogId);
		return SentAppointment.builder()
				.appointment(appointment)
				.dog(dog)
				.build();
	}
	
	public ReceivedAppointment toReceivedAppointment(long roomId,long dogId) {
		Appointment appointment = new Appointment();
		appointment.setRoomId(roomId);
		Dog dog = new Dog();
		dog.setDogId(dogId);
		return ReceivedAppointment.builder()
				.appointment(appointment)
				.dog(dog)
				.build();
	}
}
