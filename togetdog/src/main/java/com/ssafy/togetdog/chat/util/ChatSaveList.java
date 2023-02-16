package com.ssafy.togetdog.chat.util;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;

import org.springframework.stereotype.Component;

import com.ssafy.togetdog.chat.model.dto.ChatDTO;
import com.ssafy.togetdog.chat.model.dto.SessionInfo;
import com.ssafy.togetdog.chat.service.ChatInfoService;
import com.ssafy.togetdog.chat.service.ChatMsgService;

import lombok.RequiredArgsConstructor;
@Component
@RequiredArgsConstructor
public class ChatSaveList {

	private final ChatMsgService cms;
	
	private final ChatInfoService cis;
	// 채팅 저장 리스트 , key - 방번호 : values - 채팅리스트
	private Map<Long , ArrayList<ChatDTO>> chatList = new HashMap<>();

	// 세션 정보 저장 , key - 세션ID : values - 세션정보(방번호 , 유저아이디)
	private Map<String , SessionInfo> sessionIdMap = new HashMap<>();

	// 접속한 세션의 아이디를 잠시 저장할 SET - (위조 방지)
	private Set<String> saveSessionId = new HashSet<>();
	
	// 채팅의 인덱스값 저장할 Map
	private Map<Long , Long> chatIdx = new HashMap<>();

	// 방의 현재 인원 저장 변수 , key - 방번호 : values - 현재 인원수
	
	private Map<Long , Set<Long>> roomCntMap = new HashMap<>();

	// 채팅 내용 불러오기
	public ArrayList<ChatDTO> getList(long rooms){
		return chatList.get(rooms);
	}

	// 채팅 권한 확인
	public boolean chatCondent(String sessionId , long roomId) {
		if(sessionIdMap.containsKey(sessionId) && sessionIdMap.get(sessionId).getRoomId() == roomId)
			return true;
		else
			return false;
	}

	// 채팅 저장 메소드
	public void saveChat(ChatDTO chatDto) {
		long roomId = chatDto.getRoomId();
		long idx = chatIdx.get(roomId);
		chatDto.setIdx(idx);
		chatList.get(roomId).add(chatDto);	// 채팅 내역 저장
		chatIdx.put(roomId , idx + 1);
	}

	// 세션 정보 삭제
	public void deleteSessionId(String sessionId) {
		if(!sessionIdMap.containsKey(sessionId))
			return;
		SessionInfo info = sessionIdMap.remove(sessionId);
		long roomId = info.getRoomId();
		long userId = info.getUserId();
		
		this.saveJpaChat(roomId);
		roomCntMap.get(roomId).remove(userId);
		
		// 현재 방 인원 수 줄임
		if(roomCntMap.get(roomId).size() == 0) { 	// 방 인원이 없으면
			roomCntMap.remove(roomId);		// 인원과 채팅방 내용 삭제
			chatIdx.remove(roomId);
			chatList.remove(roomId);
		}
	}	
	
	// 채팅 저장 메소드
	public void saveJpaChat(long roomId) {
		Set<Long> set = new HashSet<>();
		if(roomId == 0) {
			set.addAll(chatList.keySet());
		}else {
			set.add(roomId);
		}
			
		for(long key : set) {
			if(chatList.get(key).size() == 0) {
				continue;
			}
			cms.saveChatMsg(chatList.get(key));
			cis.updateChatInfo(key ,  roomCntMap.get(key));
			chatList.put(key , new ArrayList<>());
		}
	}

	// 핸들러에서 접속한 순간 세션의 아이디를 저장할 메소드 - 하단의 메소드에서 확인하고 삭제
	public void saveSesId(String sessionId){
		saveSessionId.add(sessionId);
	}

	// 세션의 정보를 저장할 메소드
	public void addSessionId(SessionInfo session) {
		// 핸들러에서 해당 세션 아이디가 없으면 
		if(!saveSessionId.contains(session.getSessionId())) {
			return;
		}		
		saveSessionId.remove(session.getSessionId());
		if(cis.credentUser(session.getRoomId(), session.getUserId())) {
			return;
		}

		Long rooms = session.getRoomId();

		if(!chatIdx.containsKey(rooms)) {
			chatIdx.put(rooms , cms.chatCount(rooms)+1);
		}
		
		// 세션 정보 저장 : 세션 아이디 - 세션정보
		sessionIdMap.put(session.getSessionId() , session);

		// 해당 방번호가 채팅으로 열린적이 없다면
		if(!chatList.containsKey(rooms)) {
			// 해당 방번호 List 생성 : 방번호 - List
			chatList.put(rooms, new ArrayList<>());
			roomCntMap.put(rooms , new HashSet<>());
		}
		// 해당 채팅방 번호 저장
		roomCntMap.get(rooms).add(session.getUserId());
	}
}
