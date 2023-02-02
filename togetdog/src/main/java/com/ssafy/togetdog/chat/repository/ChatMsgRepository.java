package com.ssafy.togetdog.chat.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ssafy.togetdog.chat.model.entity.ChatMsg;

public interface ChatMsgRepository extends JpaRepository<ChatMsg, Long>{
	
}
