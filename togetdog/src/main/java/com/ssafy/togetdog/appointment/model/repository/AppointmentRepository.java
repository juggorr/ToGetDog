package com.ssafy.togetdog.appointment.model.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ssafy.togetdog.appointment.model.entity.Appointment;
import com.ssafy.togetdog.user.model.entity.User;

public interface AppointmentRepository extends JpaRepository<Appointment, Long> {

	List<Appointment> findAllBySentUser(User user);

	List<Appointment> findAllByReceivedUser(User user);
}
