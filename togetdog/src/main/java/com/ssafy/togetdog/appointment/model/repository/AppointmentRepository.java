package com.ssafy.togetdog.appointment.model.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.ssafy.togetdog.appointment.model.entity.Appointment;
import com.ssafy.togetdog.dog.model.dto.DogInfoRespDTO;
import com.ssafy.togetdog.user.model.entity.User;

public interface AppointmentRepository extends JpaRepository<Appointment, Long> {

	List<Appointment> findAllBySentUser(User user);

	List<Appointment> findAllByReceivedUser(User user);

	List<Appointment> findAllBySentUserOrReceivedUser(User userOne, User userTwo);
	
	Long countByReceivedUserAndStatus(User user, String status);
	
	
	@Query(value = "select dog_id, d.user_id, dog_name, dog_gender, dog_type, dog_birth, dog_weight, dog_neutered, dog_character1, dog_character2, description, dog_image " + 
			"from user u join dog d " + 
			"on u.user_id = d.user_id " + 
			"where not u.user_id=:userId and u.region_code=:regionCode and d.dog_neutered=1 "
			+ "and d.dog_birth between :yearBefore and :thisYear and d.dog_weight between :startWeight and :endWeight", nativeQuery = true)
	List<Object[]> getNeuturedList(@Param("userId") long userId, @Param("regionCode") String regionCode, 
			@Param("yearBefore") String yearBefore, @Param("thisYear") String thisYear,
			@Param("startWeight")String startWeight, @Param("endWeight") String endWeight);
	
	@Query(value = "select dog_id, d.user_id, dog_name, dog_gender, dog_type, dog_birth, dog_weight, dog_neutered, dog_character1, dog_character2, description, dog_image " + 
			"from user u join dog d " + 
			"on u.user_id = d.user_id " + 
			"where not u.user_id=:userId and u.region_code=:regionCode and d.dog_neutered=0 "
			+ "and d.dog_birth between :yearBefore and :thisYear and d.dog_weight between :startWeight and :endWeight and d.dog_gender=:gender", nativeQuery = true)
	List<Object[]> getGenderList(@Param("userId") long userId, @Param("regionCode") String regionCode, 
			@Param("yearBefore") String yearBefore, @Param("thisYear") String thisYear,
			@Param("startWeight") String startWeight, @Param("endWeight") String endWeight,
			@Param("gender") String gender);
	
	@Query(value = "select dog_id, d.user_id, dog_name, dog_gender, dog_type, dog_birth, dog_weight, dog_neutered, dog_character1, dog_character2, description, dog_image " + 
			"from user u join dog d " + 
			"on u.user_id = d.user_id " + 
			"where not u.user_id=:userId and d.dog_neutered=1 "
			+ "and d.dog_birth between :yearBefore and :thisYear and d.dog_weight between :startWeight and :endWeight", nativeQuery = true)
	List<Object[]> getNeuturedList(@Param("userId") long userId, 
			@Param("yearBefore") String yearBefore, @Param("thisYear") String thisYear,
			@Param("startWeight")String startWeight, @Param("endWeight") String endWeight);
	
	@Query(value = "select dog_id, d.user_id, dog_name, dog_gender, dog_type, dog_birth, dog_weight, dog_neutered, dog_character1, dog_character2, description, dog_image " + 
			"from user u join dog d " + 
			"on u.user_id = d.user_id " + 
			"where not u.user_id=:userId and d.dog_neutered=0 "
			+ "and d.dog_birth between :yearBefore and :thisYear and d.dog_weight between :startWeight and :endWeight and d.dog_gender=:gender", nativeQuery = true)
	List<Object[]> getGenderList(@Param("userId") long userId, 
			@Param("yearBefore") String yearBefore, @Param("thisYear") String thisYear,
			@Param("startWeight") String startWeight, @Param("endWeight") String endWeight,
			@Param("gender") String gender);
}