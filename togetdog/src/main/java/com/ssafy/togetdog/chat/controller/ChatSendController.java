package com.ssafy.togetdog.chat.controller;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.togetdog.chat.model.ChatDTO;
import com.ssafy.togetdog.chat.model.SessionInfo;
import com.ssafy.togetdog.chat.util.ChatSaveList;

@RestController
public class ChatSendController {
	
    @MessageMapping("/messages/sessionNum")
    public void setSesstionId(SessionInfo sessionInfo) {
    	SessionInfo se = sessionInfo;
    	String url = se.getUrl();
    	System.out.println(url);
    	int len = url.length();
    	se.setUrl(url.substring(len - 18 , len - 10));
    	ChatSaveList.addSessionId(se);
    }
    @MessageMapping("/messages/{rooms}")
    @SendTo("/subscribe/rooms/{rooms}")
    public ChatDTO chat(ChatDTO chatDto) {
		ChatSaveList.saveChat(chatDto);
    	return chatDto;
    }
}
