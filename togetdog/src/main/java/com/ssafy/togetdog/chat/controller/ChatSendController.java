package com.ssafy.togetdog.chat.controller;

import java.time.LocalDateTime;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

import com.ssafy.togetdog.chat.model.dto.ChatDTO;
import com.ssafy.togetdog.chat.model.dto.ChattingDTO;
import com.ssafy.togetdog.chat.model.dto.SessionInfo;
import com.ssafy.togetdog.chat.util.ChatSaveList;

import lombok.RequiredArgsConstructor;
@RequiredArgsConstructor
@Controller
public class ChatSendController {

	private final ChatSaveList csl;
	
    @MessageMapping("/messages/sessionNum")
    public void setSesstionId(SessionInfo sessionInfo) {
    	System.out.println(sessionInfo.getSessionId());
    	csl.addSessionId(sessionInfo);
    }
    @MessageMapping("/messages/{roomId}")
    @SendTo("/subscribe/roomId/{roomId}")
    public ChattingDTO chat(ChatDTO chatDto) {
    	if(csl.chatCondent(chatDto.getSessionId(), chatDto.getRoomId())) {
    		chatDto.setDate(LocalDateTime.now());
    		csl.saveChat(chatDto);
    		return ChattingDTO.of(chatDto);
    	}else {
    		return null;
    	}
    }
}
