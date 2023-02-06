package com.ssafy.togetdog.chat.controller;

import java.util.Collections;
import java.util.Comparator;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.togetdog.chat.model.ChatDTO;
import com.ssafy.togetdog.chat.model.ChatInfoDTO;
import com.ssafy.togetdog.chat.service.ChatInfoService;
import com.ssafy.togetdog.chat.service.ChatMsgService;
import com.ssafy.togetdog.chat.util.ChatSaveList;
import com.ssafy.togetdog.user.model.service.JwtService;
import com.ssafy.togetdog.user.model.service.UserService;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import io.swagger.v3.oas.annotations.parameters.RequestBody;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/chat")
@Api("CHAT API")
@RequiredArgsConstructor
public class ChatController {

	private static final String SUCCESS = "success";
	private static final String FAIL = "fail";

	private final ChatSaveList csl;
	private final JwtService js;
	private final ChatInfoService cis;
	private final ChatMsgService cms;

	@ApiOperation(value = "채팅 방 목록 조회", notes = "사용자가 참여 중인 채팅 방 목록을 조회합니다.")
	@GetMapping("/list")
	public ResponseEntity<?> getChatList(
			@RequestHeader(value = "Authorization")
			@ApiParam(required = true) 
			String token
			) {
		
		Map<String, Object> resultMap = new HashMap<String, Object>();
		js.validateToken(token);
		
		List<ChatInfoDTO> list = cis.callChatList(js.getUserId(token));
		Collections.sort(list, new Comparator<ChatInfoDTO>() {
			@Override
			public int compare(ChatInfoDTO o1, ChatInfoDTO o2) {
				if(o1.getDate().isAfter(o2.getDate())) {
					return -1;					
				}
				return 1;
			}
		});
		resultMap.put("result", SUCCESS);
		resultMap.put("dm" , list);
		return new ResponseEntity<Map<String, Object>>(resultMap, HttpStatus.OK);
	}

	@ApiOperation(value = "채팅 방 조회", notes = "사용자가 참여 중인 특정 채팅을 조회합니다.")
	@GetMapping("/chatting")
	public ResponseEntity<?> getChat(
			@RequestHeader(value = "Authorization")
			@ApiParam(required = true) 
			String token , 
			@RequestBody long roomId
			) {
		Map<String, Object> resultMap = new HashMap<String, Object>();

		long userId = js.getUserId(token);
		if(cis.credentUser(userId , roomId)) {
			resultMap.put("result", FAIL);
			return new ResponseEntity<Map<String, Object>>(resultMap, HttpStatus.BAD_REQUEST);			
		}
		
		ChatInfoDTO other = cis.otherUserInfo(roomId , userId);
		List<ChatDTO> list = cms.findMessage(roomId);
		if(csl.getList(roomId) != null && csl.getList(roomId).size() > 0)
			list.addAll(csl.getList(roomId));
		list = list.subList((int)other.getStart(), list.size()-1);
		
		resultMap.put("result", SUCCESS);
		resultMap.put("other", other);
		resultMap.put("chats", list);
		return new ResponseEntity<Map<String, Object>>(resultMap, HttpStatus.OK);
	}

	//	@ApiOperation(value = "채팅 방 삭제", notes = "사용자가 참여 중인 특정 채팅방을 삭제합니다.")
	@PutMapping
	public ResponseEntity<?> deleteChat(
			@RequestParam String userId //채팅 상대방 id
			) {
		Map<String, Object> resultMap = new HashMap<String, Object>();
		resultMap.put("result", SUCCESS);
		return new ResponseEntity<Map<String, Object>>(resultMap, HttpStatus.OK);
	}

}
