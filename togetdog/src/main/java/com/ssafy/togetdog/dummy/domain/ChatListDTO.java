package com.ssafy.togetdog.dummy.domain;

import lombok.Data;

@Data
public class ChatListDTO {
	private long userId;
	private int userAge;
	private String gender;
	private String address;
	private long chatRoomId;
	private String lastChatContent;
}
