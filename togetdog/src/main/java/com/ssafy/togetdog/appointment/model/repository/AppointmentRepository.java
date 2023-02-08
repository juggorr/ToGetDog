package com.ssafy.togetdog.appointment.model.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.ssafy.togetdog.appointment.model.entity.Appointment;
import com.ssafy.togetdog.user.model.entity.User;

public interface AppointmentRepository extends JpaRepository<Appointment, Long> {

	List<Appointment> findAllBySentUser(User user);

	List<Appointment> findAllByReceivedUser(User user);

	List<Appointment> findAllBySentUserOrReceivedUser(User userOne, User userTwo);
	
	Long countByReceivedUserAndStatus(User user, String status);
	
	@Query(value = "delete from notify n where n.receiver_user_id=:userId and n.notify_type='c'", nativeQuery = true)
	void deleteAppointmentCancelNotifyByUserId(@Param("userId") long userId);
}