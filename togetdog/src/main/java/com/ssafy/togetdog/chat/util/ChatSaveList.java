package com.ssafy.togetdog.chat.util;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;

import org.springframework.stereotype.Component;

import com.ssafy.togetdog.chat.model.ChatDTO;
import com.ssafy.togetdog.chat.model.SessionInfo;
import com.ssafy.togetdog.chat.service.ChatMsgService;

import lombok.RequiredArgsConstructor;
@Component
@RequiredArgsConstructor
public class ChatSaveList {

	private final ChatMsgService cms;
	// 채팅 저장 리스트 , key - 방번호 : values - 채팅리스트
	private Map<Long , ArrayList<ChatDTO>> chatList = new HashMap<>();

	// 세션 정보 저장 , key - 세션ID : values - 세션정보(방번호 , 유저아이디)
	private Map<String , SessionInfo> sessionIdMap = new HashMap<>();

	// 접속한 세션의 아이디를 잠시 저장할 SET - (위조 방지)
	private Set<String> saveSessionId = new HashSet<>();

	// 방의 현재 인원 저장 변수 , key - 방번호 : values - 현재 인원수
	private Map<Long , Integer> roomCntMap = new HashMap<>();


//	// 채팅 내용 불러오기
//	public ArrayList<ChatDTO> getList(int rooms){
//		return chatList.get(rooms);
//	}

	// 채팅 저장 메소드
	public boolean saveChat(ChatDTO chatDto) {
		if(sessionIdMap.get(chatDto.getSessionId()).getRooms().equals(chatDto.getRoomId())) {
			chatList.get(chatDto.getRoomId()).add(chatDto);	// 채팅 내역 저장
			return true;
		}
		else
			return false;
	}

	// 세션 정보 삭제
	public void deleteSessionId(String sessionId) {
		long rooms = sessionIdMap.remove(sessionId).getRooms();
		// 해당 유저의 채팅 어디까지 읽었는지 정보도 넘겨줘야함

		// Method Line
		// Method Line
		// Method Line
		// Method Line
		// Method Line
		// Method Line
		// Method Line
		// Method Line
		
		
		// 저장된 채팅이 한개 이상이면
		if(chatList.get(rooms).size() > 0)
			cms.saveChatMsg(chatList.get(rooms));	// JPA 채팅 리스트 저장 CALL

		// 현재 방 인원 수 줄임
		roomCntMap.put(rooms , roomCntMap.get(rooms) - 1);
		if(roomCntMap.get(rooms) == 0) {	// 방 인원이 없으면
			roomCntMap.remove(rooms);		// 인원과 채팅방 내용 삭제
			chatList.remove(rooms);
		}else {								// 있으면 그냥 초기화
			chatList.put(rooms , new ArrayList<>());
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


		// jpa를 통해 해당 방번호 - 유저 의 권한이 있는지 확인해야함

		// Method Line
		// Method Line
		// if(jpa 권한 not){
		// 		return;
		// }
		// Method Line
		// Method Line
		// Method Line
		// Method Line

		Long rooms = session.getRooms();

		// 세션 정보 저장 : 세션 아이디 - 세션정보
		sessionIdMap.put(session.getSessionId() , session);

		// 해당 방번호가 채팅으로 열린적이 없다면
		if(!chatList.containsKey(rooms)) {
			// 해당 방번호 List 생성 : 방번호 - List
			chatList.put(rooms, new ArrayList<>());
		}
		// 해당 채팅방 번호 저장
		roomCntMap.put(rooms , roomCntMap.getOrDefault(rooms, 0) + 1);
	}
}
