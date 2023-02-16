package com.ssafy.togetdog.chat.controller;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.togetdog.chat.model.dto.ChatDTO;
import com.ssafy.togetdog.chat.model.dto.ChatInUserInfo;
import com.ssafy.togetdog.chat.model.dto.ChatInfoDTO;
import com.ssafy.togetdog.chat.model.dto.ChattingDTO;
import com.ssafy.togetdog.chat.service.ChatInfoService;
import com.ssafy.togetdog.chat.service.ChatMsgService;
import com.ssafy.togetdog.chat.util.ChatSaveList;
import com.ssafy.togetdog.user.model.entity.User;
import com.ssafy.togetdog.user.model.service.JwtService;
import com.ssafy.togetdog.user.model.service.UserService;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import io.swagger.v3.oas.annotations.parameters.RequestBody;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/chat")
@Api("CHAT API")
@RequiredArgsConstructor
public class ChatRestController {

	private static final String SUCCESS = "success";
	private static final String FAIL = "fail";

	private final ChatSaveList csl;
	private final JwtService js;
	private final UserService us;
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
		
		List<ChatInfoDTO> list = cis.callChatList(js.getUserId(token));
		if(list == null) {
			resultMap.put("result", SUCCESS);
			resultMap.put("dm", new ArrayList<Object>());
			return new ResponseEntity<Map<String, Object>>(resultMap, HttpStatus.OK);
		}
		
		
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
			String token,
			@RequestBody long otherId
			) {

		js.validateToken(token);
		Map<String, Object> resultMap = new HashMap<String, Object>();
		long userId = js.getUserId(token);
		
		if(userId == otherId) {
			resultMap.put("result", FAIL);
			return new ResponseEntity<Map<String, Object>>(resultMap, HttpStatus.BAD_REQUEST);
		}
		try {
			us.getUserInfo(""+otherId);
		} catch (Exception e) {
			resultMap.put("result", FAIL);
			return new ResponseEntity<Map<String, Object>>(resultMap, HttpStatus.BAD_REQUEST);
		}
		
		User user = us.findUserByUserId(userId);
		User other = us.findUserByUserId(otherId);
		ChatInUserInfo opponent = cis.otherUserInfo(userId , other);
		if(opponent == null) {
			opponent = cis.createChatRoom(user, other);
		}else {
			Set<Long> set = new HashSet<>();
			set.add(userId);
			cis.updateChatInfo(opponent.getRoomId(), set);
		}
		long roomId = opponent.getRoomId();
		List<ChattingDTO> list = cms.findMessage(roomId);
		if(csl.getList(roomId) != null) {
			for(ChatDTO dto : csl.getList(roomId)) {
				list.add(ChattingDTO.of(dto));				
			}
		}
		if(list.size() > 1)
			list = list.subList((int)opponent.getStart(), list.size());
		if(list.size() > 500)
			list = list.subList(list.size()-500, list.size());
		
		resultMap.put("result", SUCCESS);
		resultMap.put("chats", list);
		resultMap.put("other", opponent);
		return new ResponseEntity<Map<String, Object>>(resultMap, HttpStatus.OK);
	}

	@ApiOperation(value = "채팅 방 삭제", notes = "사용자가 참여 중인 특정 채팅방을 삭제합니다.")
	@PutMapping
	public ResponseEntity<?> deleteChat(
			@RequestHeader(value = "Authorization")
			@ApiParam(required = true) 
			String token,
			@RequestParam long roomId
			) {
		js.validateToken(token);
		long userId = js.getUserId(token);
		Map<String, Object> resultMap = new HashMap<String, Object>();
		if(cis.chatInfoActi(roomId, userId)) {
			resultMap.put("result", FAIL);
			return new ResponseEntity<Map<String, Object>>(resultMap, HttpStatus.BAD_REQUEST);
		}else {			
			resultMap.put("result", SUCCESS);
			return new ResponseEntity<Map<String, Object>>(resultMap, HttpStatus.OK);
		}
	}

}
