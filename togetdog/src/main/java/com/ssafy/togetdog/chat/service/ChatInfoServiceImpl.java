package com.ssafy.togetdog.chat.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import javax.transaction.Transactional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import com.ssafy.togetdog.board.controller.BoardRestController;
import com.ssafy.togetdog.chat.model.dto.ChatInUserInfo;
import com.ssafy.togetdog.chat.model.dto.ChatInfoDTO;
import com.ssafy.togetdog.chat.model.entity.ChatInfo;
import com.ssafy.togetdog.chat.model.entity.ChatInfo.ChatInfoBuilder;
import com.ssafy.togetdog.chat.model.entity.ChatMsg;
import com.ssafy.togetdog.chat.model.entity.ChatRoom;
import com.ssafy.togetdog.chat.repository.ChatInfoRepository;
import com.ssafy.togetdog.chat.repository.ChatMsgRepository;
import com.ssafy.togetdog.chat.repository.ChatRoomRepository;
import com.ssafy.togetdog.user.model.entity.User;
import com.ssafy.togetdog.user.model.repository.UserRepository;

import lombok.RequiredArgsConstructor;
@Service
@Transactional
@RequiredArgsConstructor
public class ChatInfoServiceImpl implements ChatInfoService{

	private final ChatInfoRepository chatInfoRepo;
	
	private final ChatMsgRepository chatMsgRepo;

	private final ChatRoomRepository chatRoomRepo;
	
	private final UserRepository userRepository;
	
	private final Logger logger = LoggerFactory.getLogger(ChatInfoServiceImpl.class);

	@Transactional
	public void updateChatInfo(long roomId, Set<Long> nowUser) {
		ChatMsg cm = chatMsgRepo.findFirstByRoomIdOrderByIdDesc(roomId);
		List<ChatInfo> list = chatInfoRepo.findByRoomId(roomId).orElse(null);
		if(list == null)
			return;
		for(ChatInfo user : list) {
			if(user.getActivation() == 2L) {
				user.updateAct(1 , null);
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
		
		// 삭제된 사용자인 경우 리스트에 띄우지 않음
		for (int i = 0; i < list.size(); i++) {
			User user = userRepository.findById(list.get(i).getOther().getUserId()).orElse(null);
			if(user.getNickName().contains("delete")) {
				list.remove(list.get(i));
			}
		}
		
		return list.stream()
				.map(m->ChatInfoDTO.of(m))
				.collect(Collectors.toList());
	}

	@Transactional
	public ChatInUserInfo otherUserInfo(long userId , User other) {
		ChatInfo result = chatInfoRepo.findByUserIdAndOther(userId, other).orElse(null);
		if(result == null)
			return null;
		return ChatInUserInfo.of(result);
	}

	@Transactional
	public ChatInUserInfo createChatRoom(User userId, User otherId) {
		long roomId = chatRoomRepo.save(new ChatRoom()).getId();
		ChatMsg firstChat = chatMsgRepo.save(ChatMsg.builder()
				.idx(1)
				.userId(1)
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
		
		return ChatInUserInfo.of(info);
	}

	@Transactional
	public boolean chatInfoActi(long roomId, long userId) {
		ChatInfo info = chatInfoRepo.findByRoomIdAndUserId(roomId, userId).orElse(null);
		if(info == null)
			return true;
		ChatMsg cm = chatMsgRepo.findByIdxAndRoomId(1 , roomId);
		info.updateAct(2 , cm);
		chatInfoRepo.save(info);
		return false;
	}
}
