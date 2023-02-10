package com.ssafy.togetdog.appointment.model.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import com.ssafy.togetdog.dog.model.entity.Dog;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name = "RECEIVED_REQUEST_DOG")
@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class ReceivedAppointment {
	
    @Id
    @Column(name = "received_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long receivedId;
    
    @OneToOne
    @JoinColumn(name="room_id")
    private Appointment appointment;
    
    @ManyToOne
    @JoinColumn(name="dog_id")
    private Dog dog;
}    