package com.ssafy.togetdog.chat.model.dto;

import java.time.LocalDateTime;

import com.ssafy.togetdog.chat.model.entity.ChatMsg;

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
public class ChatDTO {

	private long id;
	
	private long idx;
	
	private long userId;
	
	private long roomId;

	private String content;
	
	private String sessionId;
	
	private LocalDateTime date;
	
	public ChatMsg toEntity() {
		return ChatMsg.builder()
				.id(this.id)
		.idx(this.idx)
		.userId(this.userId)
		.roomId(this.roomId)
		.content(this.content)
		.date(this.date)
		.build();
	}
}
