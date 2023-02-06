package com.ssafy.togetdog.chat.model;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ChatRoomDTO {
	private long userId;
	private String nickName;
	private int userAge;
	private String gender;
	private String address;
	private List<ChatDTO> chats;
}
