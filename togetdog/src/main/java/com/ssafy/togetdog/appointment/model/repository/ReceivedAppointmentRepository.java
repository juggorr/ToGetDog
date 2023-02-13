package com.ssafy.togetdog.appointment.model.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ssafy.togetdog.appointment.model.dto.AppointmentListDTO;
import com.ssafy.togetdog.appointment.model.entity.Appointment;
import com.ssafy.togetdog.appointment.model.entity.ReceivedAppointment;

public interface ReceivedAppointmentRepository extends JpaRepository<ReceivedAppointment, Long> {

	List<ReceivedAppointment> findAllByAppointment(AppointmentListDTO appointmentListDTO);

	void deleteByAppointment(Optional<Appointment> appointment);

	List<ReceivedAppointment> findAllByAppointment(Appointment appointment);
}
