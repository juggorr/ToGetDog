package com.ssafy.togetdog.chat.util;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class ChatSaveScheduler {
	
	@Autowired
	ChatSaveList csl;
	
	@Scheduled(fixedDelay = 5000)
	public void saveChat() {
//		System.out.println("saveChat");
		csl.saveJpaChat();
	}
	
}
