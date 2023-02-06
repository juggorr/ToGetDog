package com.ssafy.togetdog.chat.service;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ssafy.togetdog.chat.model.ChatInfoDTO;
import com.ssafy.togetdog.chat.model.entity.ChatInfo;
import com.ssafy.togetdog.chat.model.entity.ChatMsg;
import com.ssafy.togetdog.chat.repository.ChatInfoRepository;
import com.ssafy.togetdog.chat.repository.ChatMsgRepository;

import lombok.RequiredArgsConstructor;
@Service
@Transactional
@RequiredArgsConstructor
public class ChatInfoServiceImpl implements ChatInfoService{

	@Autowired
	ChatInfoRepository chatInfoRepo;
	
	@Autowired
	ChatMsgRepository chatMsgRepo;

	@Transactional
	public void updateChatInfo(long roomId, Set<Long> nowUser ) {
		ChatMsg cm = chatMsgRepo.findFirstByRoomIdOrderByIdDesc(roomId);
		List<ChatInfo> list = chatInfoRepo.findByRoomId(roomId).orElse(null);
		if(list == null)
			return;
		for(ChatInfo user : list) {
			user.updateLast(cm);
			if(nowUser.contains(user.getUserId())) {
				user.updateCnt(cm.getIdx());
			}
			chatInfoRepo.save(user);
		}
	}

	@Transactional
	public boolean credentUser(long userId , long roomId) {
		ChatInfo ci = chatInfoRepo.findByUserIdAndRoomId(userId , roomId).orElse(null);
		if(ci == null)
			return true;
		else
			return false;
	}

	@Transactional
	public List<ChatInfoDTO> callChatList(long userId) {
		List<ChatInfo> list = chatInfoRepo.findByUserIdAndActivation(userId , true).orElse(null);
		if(list == null)
			return null;
		return list.stream()
				.map(ChatInfo::toChatInfoDTO)
				.collect(Collectors.toList());
	}
	
	@Override
	public ChatInfoDTO otherUserInfo(long roomId , long userId) {
		ChatInfo result = chatInfoRepo.findByRoomIdAndUserId(roomId, userId).orElse(null);
		if(result == null)
			return null;
		return result.toChatInnerDTO();
	}
}
