package com.ssafy.togetdog.chat.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ChatListDTO {
	private long userId;
	private int userAge;
	private String gender;
	private String address;
	private long chatRoomId;
	private String lastChatContent;
}
