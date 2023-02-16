package com.ssafy.togetdog.chat.service;

import java.util.List;
import java.util.Set;

import com.ssafy.togetdog.chat.model.dto.ChatInUserInfo;
import com.ssafy.togetdog.chat.model.dto.ChatInfoDTO;
import com.ssafy.togetdog.user.model.entity.User;

public interface ChatInfoService {
	boolean credentUser(long roomId , long userId);
	List<ChatInfoDTO> callChatList(long userId);
	ChatInUserInfo otherUserInfo(long userId , User otherId);
	void updateChatInfo(long roomId , Set<Long> nowUser);
	ChatInUserInfo createChatRoom(User user, User other) ;
	boolean chatInfoActi(long roomId , long userId);
	void updateChatActi(long roomId , long userId);
}
