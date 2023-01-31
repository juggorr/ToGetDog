package com.ssafy.togetdog.user.model.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.ssafy.togetdog.user.model.entity.User;

public interface UserRepository extends JpaRepository<User, Long> {
	Optional<User> findByEmail(String email);
	Optional<User> findByEmailAndPassword(String email, String password);
	Optional<User> findByNickName(String nickName);
	
	@Modifying
	@Query(value = "UPDATE USER u SET u.token = :token where u.user_id = :userId", nativeQuery = true)
	int updateToken (@Param(value="userId") long userId, @Param(value="token") String token);
	
	@Modifying
	@Query(value = "UPDATE USER u SET u.token = null where u.user_id = :userId", nativeQuery = true)
	int deleteToken (@Param(value="userId") long userId);
	
	@Modifying
	@Query(value = "UPDATE USER u SET u.password = :password where u.user_id = :userId", nativeQuery = true)
	int updatePassword (@Param(value="userId") long userId, @Param(value="password") String password);
	
	@Modifying
	@Query(value = "UPDATE USER u SET u.nickname = :nickName"
			+ "and u.user_gender = :gender and u.user_birth = :birth"
			+ "and u.address = :address and u.region_code = :regionCode"
			+ "where u.user_id = :userId", nativeQuery = true)
	int updateUser (
			@Param(value="userId") long userId, @Param(value="nickName") String nickName,
			@Param(value="gender") String gender, @Param(value="birth") String birth,
			@Param(value="address") String address, @Param(value="regionCode") String regionCode);
}
