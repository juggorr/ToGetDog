package com.ssafy.togetdog.dummy.chat.controller;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.togetdog.dummy.chat.domain.ChatDTO;
import com.ssafy.togetdog.dummy.chat.domain.ChatListDTO;
import com.ssafy.togetdog.dummy.chat.domain.ChatRoomDTO;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;

@RestController
@RequestMapping("/chat")
@Api("채팅 관련 더미 API : 무슨 값을 넣든 같은 dummy 결과가 나옵니다.")
public class DummyChatController {
	
	private static final String SUCCESS = "success";
	// private static final String FAIL = "fail";

	@ApiOperation(value = "채팅 방 목록 조회", notes = "사용자가 참여 중인 채팅 방 목록을 조회합니다.")
	@GetMapping("/list")
	public ResponseEntity<?> getChatList(
			) {
		List<ChatListDTO> dmRoomList = new ArrayList<ChatListDTO>();
		ChatListDTO dmRoomInfo = new ChatListDTO();
		dmRoomInfo.setUserId(1234);
		dmRoomInfo.setUserAge(24);
		dmRoomInfo.setGender("female");
		dmRoomInfo.setAddress("경기도 성남시 분당구");
		dmRoomInfo.setChatRoomId(123);
		dmRoomInfo.setLastChatContent("안녕하세요!!");
		dmRoomList.add(dmRoomInfo);
		
		Map<String, Object> resultMap = new HashMap<String, Object>();
		resultMap.put("result", SUCCESS);
		resultMap.put("dm", dmRoomList);
		return new ResponseEntity<Map<String, Object>>(resultMap, HttpStatus.OK);
	}
	
	@ApiOperation(value = "채팅 방 조회", notes = "사용자가 참여 중인 특정 채팅을 조회합니다.")
	@GetMapping
	public ResponseEntity<?> getChat(
			@RequestParam String userId //채팅 상대방 id
			) {
		
		ChatRoomDTO chatRoomInfo = new ChatRoomDTO();
		chatRoomInfo.setUserId(14);
		chatRoomInfo.setNickName("뽀삐엄마");
		chatRoomInfo.setUserAge(28);
		chatRoomInfo.setGender("female");
		chatRoomInfo.setAddress("경기도 성남시 분당구");
		
		List<ChatDTO> chats = new ArrayList<ChatDTO>();
		ChatDTO chat = new ChatDTO();
		chat.setWriter("뽀비엄마");
		chat.setContent("안녕하세요");
		chat.setTime(new Date());
		chats.add(chat);
		
		chatRoomInfo.setChats(chats);
		
		Map<String, Object> resultMap = new HashMap<String, Object>();
		resultMap.put("result", SUCCESS);
		resultMap.put("chatRoomInfo", chatRoomInfo);
		return new ResponseEntity<Map<String, Object>>(resultMap, HttpStatus.OK);
	}
	
	@ApiOperation(value = "채팅 방 삭제", notes = "사용자가 참여 중인 특정 채팅방을 삭제합니다.")
	@PutMapping
	public ResponseEntity<?> deleteChat(
			@RequestParam String userId //채팅 상대방 id
			) {
		Map<String, Object> resultMap = new HashMap<String, Object>();
		resultMap.put("result", SUCCESS);
		return new ResponseEntity<Map<String, Object>>(resultMap, HttpStatus.OK);
	}
}
