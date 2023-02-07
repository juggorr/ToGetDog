package com.ssafy.togetdog.chat.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ssafy.togetdog.chat.model.ChatInfoDTO;
import com.ssafy.togetdog.chat.model.entity.ChatInfo;
import com.ssafy.togetdog.chat.model.entity.ChatInfo.ChatInfoBuilder;
import com.ssafy.togetdog.chat.model.entity.ChatMsg;
import com.ssafy.togetdog.chat.model.entity.ChatRoom;
import com.ssafy.togetdog.chat.repository.ChatInfoRepository;
import com.ssafy.togetdog.chat.repository.ChatMsgRepository;
import com.ssafy.togetdog.chat.repository.ChatRoomRepository;
import com.ssafy.togetdog.user.model.entity.User;

import lombok.RequiredArgsConstructor;
@Service
@Transactional
@RequiredArgsConstructor
public class ChatInfoServiceImpl implements ChatInfoService{

	@Autowired
	ChatInfoRepository chatInfoRepo;
	
	@Autowired
	ChatMsgRepository chatMsgRepo;

	@Autowired
	ChatRoomRepository chatRoomRepo;

	@Transactional
	public void updateChatInfo(long roomId, Set<Long> nowUser ) {
		ChatMsg cm = chatMsgRepo.findFirstByRoomIdOrderByIdDesc(roomId);
		List<ChatInfo> list = chatInfoRepo.findByRoomId(roomId).orElse(null);
		if(list == null)
			return;
		for(ChatInfo user : list) {
			if(user.getActivation() == 2) {
				user.updateAct(1);
			}
			user.updateLast(cm);
			if(nowUser.contains(user.getUserId())) {
				user.updateCnt(cm.getIdx());
			}
			chatInfoRepo.save(user);
		}
	}

	@Transactional
	public boolean credentUser(long roomId , long userId) {
		ChatInfo ci = chatInfoRepo.findByRoomIdAndUserId(roomId , userId).orElse(null);
		if(ci == null)
			return true;
		else
			return false;
	}

	@Transactional
	public List<ChatInfoDTO> callChatList(long userId) {
		List<ChatInfo> list = chatInfoRepo.findByUserIdAndActivation(userId , 1).orElse(null);
		if(list == null)
			return null;
		return list.stream()
				.map(ChatInfo::toChatInfoDTO)
				.collect(Collectors.toList());
	}

	@Transactional
	public ChatInfoDTO otherUserInfo(long userId , User other) {
		ChatInfo result = chatInfoRepo.findByUserIdAndOther(userId, other).orElse(null);
		if(result == null)
			return null;
		return result.toChatInnerDTO();
	}

	@Transactional
	public ChatInfoDTO createChatRoom(User userId, User otherId) {
		long roomId = chatRoomRepo.save(new ChatRoom()).getId();
		ChatMsg firstChat = chatMsgRepo.save(ChatMsg.builder()
				.idx(0)
				.userId(0)
				.roomId(roomId)
				.content("채팅방에 오신걸 환영합니다")
				.date(LocalDateTime.now())
				.build());
		
		ChatInfoBuilder infoBuilder = ChatInfo.builder()
				.roomId(roomId)
				.activation(1)
				.start(1)
				.last(1)
				.lastChat(firstChat)
				;
		ChatInfo info = infoBuilder
				.other(userId)
				.userId(otherId.getUserId())
				.build();
		chatInfoRepo.save(info);
		info = infoBuilder
				.other(otherId)
				.userId(userId.getUserId())
				.build();
		info = chatInfoRepo.save(info);
		return info.toChatInnerDTO();
	}

	@Transactional
	public boolean chatInfoActi(long roomId, long userId) {
		ChatInfo info = chatInfoRepo.findByRoomIdAndUserId(roomId, userId).orElse(null);
		if(info == null)
			return true;
		info.setActivation(2);
		chatInfoRepo.save(info);
		return false;
	}
}
