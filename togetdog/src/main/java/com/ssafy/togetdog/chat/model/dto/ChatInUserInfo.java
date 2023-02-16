package com.ssafy.togetdog.chat.model.dto;

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
public class ChatInUserInfo {
	private long userId;
	
	private long roomId;

	private String userBirth;
	
	private String gender;

    private String address;

	private String nickName;
	
	private long start;
	
	private long acti;
	
	public static ChatInUserInfo of(ChatInfo info) {
		return ChatInUserInfo.builder()
				.userId(info.getOther().getUserId())
				.roomId(info.getRoomId())
				.userBirth(info.getOther().getUserBirth())
				.acti(info.getActivation())
				.gender(info.getOther().getGender())
				.address(info.getOther().getAddress())
				.nickName(info.getOther().getNickName())
				.start(info.getStart())
				.build();
	}
	
}
