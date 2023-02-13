package com.ssafy.togetdog.chat.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ssafy.togetdog.chat.model.entity.ChatRoom;

public interface ChatRoomRepository extends JpaRepository<ChatRoom, Long>{

}
