package com.ssafy.togetdog.chat.model.dto;

import java.time.LocalDateTime;

import com.ssafy.togetdog.chat.model.entity.ChatInfo;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class ChatInfoDTO {

	// 상대 유저 아이디
	private long userId;
	
	private long roomId;

	private String userBirth;
	
	private String gender;

    private String address;

	private String lastChatContent;

	private LocalDateTime date;
	
	private String nickName;
	
	private long newChat;
	
	public static ChatInfoDTO of(ChatInfo info) {
		long cnt = info.getLastChat().getIdx() - info.getLast();
		if(cnt < 0)
			cnt = 0;
		return ChatInfoDTO.builder()
				.userId(info.getOther().getUserId())
				.roomId(info.getRoomId())
				.userBirth(info.getOther().getUserBirth())
				.gender(info.getOther().getGender())
				.date(info.getLastChat().getDate())
				.address(info.getOther().getAddress())
				.lastChatContent(info.getLastChat().getContent())
				.nickName(info.getOther().getNickName())
				.newChat(cnt)
				.build();
	}
}
