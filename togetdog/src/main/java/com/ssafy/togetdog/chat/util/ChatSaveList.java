package com.ssafy.togetdog.chat.util;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

import com.ssafy.togetdog.chat.model.ChatDTO;
import com.ssafy.togetdog.chat.model.SessionInfo;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public class ChatSaveList {
	// 채팅 저장 리스트 , key - 방번호 : values - 채팅리스트
	private static Map<Integer , ArrayList<ChatDTO>> chatList = new HashMap<>();
	
	// 세션 정보 저장 , key - 세션ID : values - 세션정보(방번호 , 유저아이디)
	private static Map<String , SessionInfo> sessionIdMap = new HashMap<>();
	
	// 방의 현재 인원 저장 변수 , key - 방번호 : values - 현재 인원수
	private static Map<Integer , Integer> roomCntMap = new HashMap<>();
	
	// 채팅 내용 불러오기
	public static ArrayList<ChatDTO> getList(int rooms){
		return chatList.get(rooms);
	}
	
	// 채팅 저장 메소드
	public static void saveChat(ChatDTO chatDto) {
		chatList.get(chatDto.getRooms()).add(chatDto);
	}
	
	// 삭제 리스트
	public static void resetList(int rooms) {
		chatList.remove(rooms);
	}

	// 세션 정보 저장
	public static void addSessionId(SessionInfo si) {
		sessionIdMap.put(si.getUrl() , si);
		if(!roomCntMap.containsKey(si.getRooms())) {
			chatList.put(si.getRooms(), new ArrayList<>());
		}
		roomCntMap.put(si.getRooms() , roomCntMap.getOrDefault(si.getRooms(), 0) + 1);
	}

	// 세션 정보 삭제
	public static void deleteSessionId(String sessionId) {
		int rooms = sessionIdMap.remove(sessionId).getRooms();
		if(roomCntMap.get(rooms) == 1) {
			roomCntMap.remove(rooms);
			System.out.println(rooms + " 번호 채팅 내역");
			for(ChatDTO c : chatList.get(rooms)) {
				System.out.println(c.getContent());
			}
			// 여기에 채팅을 저장하는 JPA
			chatList.remove(rooms);			
		}else {
			roomCntMap.put(rooms , 1);
		}
	}	
}
