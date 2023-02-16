package com.ssafy.togetdog.chat.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ssafy.togetdog.chat.model.entity.ChatMsg;

public interface ChatMsgRepository extends JpaRepository<ChatMsg, Long>{
	Optional<List<ChatMsg>> findByRoomId(Long roomId);
	Optional<List<ChatMsg>> findTop300ByRoomIdAndIdxGreaterThanOrderByIdDesc(Long roomId , Long idx);
	ChatMsg findFirstByRoomIdOrderByIdDesc(long roomId);
	ChatMsg findByIdxAndRoomId(long idx , long roomId);
	Long countByRoomId(long RoomId);
}
