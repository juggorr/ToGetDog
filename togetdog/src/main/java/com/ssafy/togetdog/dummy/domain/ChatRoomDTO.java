package com.ssafy.togetdog.dummy.domain;

import java.util.List;

import lombok.Data;

@Data
public class ChatRoomDTO {
	private long userId;
	private String nickName;
	private int userAge;
	private String gender;
	private String address;
	private List<ChatDTO> chats;
}
