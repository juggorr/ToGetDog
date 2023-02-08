package com.ssafy.togetdog.chat.service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ssafy.togetdog.chat.model.dto.ChatDTO;
import com.ssafy.togetdog.chat.model.entity.ChatMsg;
import com.ssafy.togetdog.chat.repository.ChatMsgRepository;

import lombok.RequiredArgsConstructor;
@Service
@Transactional
@RequiredArgsConstructor
public class ChatMsgServiceImpl implements ChatMsgService{
	
	@Autowired
	ChatMsgRepository chatMsgRepo;
	
	@Transactional
	public void saveChatMsg(List<ChatDTO> list) {
		List<ChatMsg> saveMsg = new ArrayList<>();
		for(ChatDTO cDto : list) {
			saveMsg.add(cDto.toEntity());
		}
		chatMsgRepo.saveAll(saveMsg);
	}
	
	@Transactional
	public List<ChatDTO> findMessage(long roomId) {
		List<ChatMsg> list =  chatMsgRepo.findByRoomId(roomId).orElse(null);
		if(list == null)
			return null;
		return list.stream()
				.map(ChatMsg::toChatList)
				.collect(Collectors.toList());
	}

	@Transactional
	public Long chatCount(long roomId) {
		return chatMsgRepo.countByRoomId(roomId);
	}
}
