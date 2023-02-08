package com.ssafy.togetdog.chat.model.dto;

import java.time.LocalDateTime;

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

	private long start;
	
}
