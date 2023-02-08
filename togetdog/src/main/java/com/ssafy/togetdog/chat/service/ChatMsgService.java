package com.ssafy.togetdog.chat.service;

import java.util.List;

import com.ssafy.togetdog.chat.model.dto.ChatDTO;

public interface ChatMsgService {
	void saveChatMsg(List<ChatDTO> list);
	List<ChatDTO> findMessage(long roomId);
	Long chatCount(long roomId);
}
