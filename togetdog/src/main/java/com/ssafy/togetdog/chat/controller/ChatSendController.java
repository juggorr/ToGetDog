package com.ssafy.togetdog.chat.controller;

import java.time.LocalDateTime;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.togetdog.chat.model.ChatDTO;
import com.ssafy.togetdog.chat.model.SessionInfo;
import com.ssafy.togetdog.chat.util.ChatSaveList;

@RestController
public class ChatSendController {

	@Autowired
	ChatSaveList csl;
	
    @MessageMapping("/messages/sessionNum")
    public void setSesstionId(SessionInfo sessionInfo) {
    	System.out.println(sessionInfo.getSessionId());
    	csl.addSessionId(sessionInfo);
    }
    @MessageMapping("/messages/{roomId}")
    @SendTo("/subscribe/roomId/{roomId}")
    public ChatDTO chat(ChatDTO chatDto) {
    	chatDto.setIdx(2);	// 바꿔야함
    	chatDto.setDate(LocalDateTime.now());
    	
		if(csl.saveChat(chatDto)) {
			return chatDto;			
		}else {
			return null;
		}
    }
}
