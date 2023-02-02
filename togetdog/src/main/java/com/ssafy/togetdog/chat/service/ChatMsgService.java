package com.ssafy.togetdog.chat.service;

import java.util.List;

import com.ssafy.togetdog.chat.model.ChatDTO;

public interface ChatMsgService {
	void saveChatMsg(List<ChatDTO> list);
//	void testSave();
}
