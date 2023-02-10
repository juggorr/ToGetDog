package com.ssafy.togetdog.chat.service;

import java.util.List;

import com.ssafy.togetdog.chat.model.dto.ChatDTO;
import com.ssafy.togetdog.chat.model.dto.ChattingDTO;

public interface ChatMsgService {
	void saveChatMsg(List<ChatDTO> list);
	List<ChattingDTO> findMessage(long roomId);
	Long chatCount(long roomId);
}
