package com.ssafy.togetdog.chat.util;

import org.springframework.messaging.Message;
import org.springframework.messaging.MessageChannel;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.messaging.support.ChannelInterceptorAdapter;
import org.springframework.stereotype.Component;

import com.ssafy.togetdog.user.model.service.JwtService;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class StompHandler extends ChannelInterceptorAdapter {

	private final ChatSaveList csl;
	private final JwtService js;
	
    @Override
    public void postSend(Message message, MessageChannel channel, boolean sent) {
        StompHeaderAccessor accessor = StompHeaderAccessor.wrap(message);
        String sessionId = accessor.getSessionId();
        System.out.println(message.toString());
        switch (accessor.getCommand()) {
            case CONNECT:
            	System.out.println("testfor connect : " + sessionId);
            	csl.saveSesId(sessionId);
                break;
            case DISCONNECT:
            	// 세션 종료시
            	System.out.println("testfor disconnect : " + sessionId);
            	csl.deleteSessionId(sessionId);
                break;
            default:
                break;
        }

    }
}