package com.ssafy.togetdog.appointment.model.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ssafy.togetdog.appointment.model.entity.Appointment;
import com.ssafy.togetdog.appointment.model.entity.ReceivedAppointment;
import com.ssafy.togetdog.appointment.model.entity.SentAppointment;

public interface SentAppointmentRepository extends JpaRepository<SentAppointment, Long> {

	List<SentAppointment> findAllByAppointment(Appointment appointment);


}
