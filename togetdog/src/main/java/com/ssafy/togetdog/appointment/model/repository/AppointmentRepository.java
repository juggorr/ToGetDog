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

	@Query(value = "select * from request r "
			+ "where r.status = :status "
			+ "and (r.sent_user_id = :senderId or r.received_user_id = :receiverId) "
			+ "order by date_time", nativeQuery = true)
	List<Appointment> findStatusList(
			@Param("status") String status, 
			@Param("senderId") long senderId, @Param("receiverId") long receiverId);
	
	@Query(value = "select * from request r "
			+ "where r.status in (:status1, :status2) "
			+ "and (r.sent_user_id = :senderId or r.received_user_id = :receiverId) "
			+ "order by (r.status = 'done' and r.is_receiver_rate = 0) desc, date_time desc", nativeQuery = true)
	List<Appointment> findStatusesList(
			@Param("status1") String status1, @Param("status2") String status2,
			@Param("senderId") long senderId, @Param("receiverId") long receiverId);
	
	Long countByReceivedUserAndStatus(User user, String status);
	
	
	@Query(value = "select dog_id, d.user_id, dog_name, dog_gender, dog_type, dog_birth, dog_weight, dog_neutered, dog_character1, dog_character2, description, dog_image, u.address, u.nickname " + 
			"from user u join dog d " + 
			"on u.user_id = d.user_id " + 
			"where not u.user_id=:userId and u.region_code=:regionCode and d.dog_neutered=1 "
			+ "and d.dog_birth between :yearBefore and :thisYear and d.dog_weight between :startWeight and :endWeight", nativeQuery = true)
	List<Object[]> getNeuturedList(@Param("userId") long userId, @Param("regionCode") String regionCode, 
			@Param("yearBefore") String yearBefore, @Param("thisYear") String thisYear,
			@Param("startWeight")String startWeight, @Param("endWeight") String endWeight);
	
	@Query(value = "select dog_id, d.user_id, dog_name, dog_gender, dog_type, dog_birth, dog_weight, dog_neutered, dog_character1, dog_character2, description, dog_image, u.address, u.nickname " + 
			"from user u join dog d " + 
			"on u.user_id = d.user_id " + 
			"where not u.user_id=:userId and u.region_code=:regionCode and d.dog_neutered=0 "
			+ "and d.dog_birth between :yearBefore and :thisYear and d.dog_weight between :startWeight and :endWeight and d.dog_gender=:gender", nativeQuery = true)
	List<Object[]> getGenderList(@Param("userId") long userId, @Param("regionCode") String regionCode, 
			@Param("yearBefore") String yearBefore, @Param("thisYear") String thisYear,
			@Param("startWeight") String startWeight, @Param("endWeight") String endWeight,
			@Param("gender") String gender);
	
	@Query(value = "select dog_id, d.user_id, dog_name, dog_gender, dog_type, dog_birth, dog_weight, dog_neutered, dog_character1, dog_character2, description, dog_image, u.address, u.nickname " + 
			"from user u join dog d " + 
			"on u.user_id = d.user_id " + 
			"where not u.user_id=:userId and d.dog_id not in :followDogIds order by rand() limit 10", nativeQuery = true)
	List<Object[]> getDogAllList(@Param("userId") long userId, @Param("followDogIds") List<Long> followDogIds);


}