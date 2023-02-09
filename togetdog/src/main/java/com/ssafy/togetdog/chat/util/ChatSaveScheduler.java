package com.ssafy.togetdog.chat.util;

import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class ChatSaveScheduler {
	
	private final ChatSaveList csl;
	
	@Scheduled(fixedDelay = 5000)
	public void saveChat() {
		System.out.println("saveChat");
		csl.saveJpaChat(0);
	}
	
}
