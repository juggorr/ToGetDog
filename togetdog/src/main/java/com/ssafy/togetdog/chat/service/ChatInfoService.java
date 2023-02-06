package com.ssafy.togetdog.chat.service;

import java.util.List;
import java.util.Set;

import com.ssafy.togetdog.chat.model.ChatInfoDTO;

public interface ChatInfoService {
	boolean credentUser(long userId , long roomId);
	List<ChatInfoDTO> callChatList(long userId);
	ChatInfoDTO otherUserInfo(long roomId , long userId);
	void updateChatInfo(long roomId , Set<Long> nowUser);
}
