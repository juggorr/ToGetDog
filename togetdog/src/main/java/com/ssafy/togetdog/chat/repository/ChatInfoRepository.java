package com.ssafy.togetdog.chat.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ssafy.togetdog.chat.model.entity.ChatInfo;

public interface ChatInfoRepository extends JpaRepository<ChatInfo, Long>{
	Optional<List<ChatInfo>> findByUserIdAndActivation(long userId , boolean activation);
	Optional<List<ChatInfo>> findByRoomId(long roomId);
	Optional<ChatInfo> findByRoomIdAndUserId(long roomId , long userId);
	
	// update 시 사용
	Optional<ChatInfo> findByUserIdAndRoomId(long userId , long roomId);
}
