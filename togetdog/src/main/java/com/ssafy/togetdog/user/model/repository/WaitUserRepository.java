package com.ssafy.togetdog.user.model.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ssafy.togetdog.user.model.entity.WaitUser;

public interface WaitUserRepository extends JpaRepository<WaitUser, Long> {
	Optional<WaitUser> findByEmail(String email);
	Optional<WaitUser> findByNickName(String nickname);
}
