package com.ssafy.togetdog.chat.model.dto;

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
public class ChattingDTO {

	private long userId;
	
	private String content;
	
	private String date;

	public static ChattingDTO of(ChatMsg msg) {
		return ChattingDTO.builder()
				.userId(msg.getUserId())
				.content(msg.getContent())
				.date(msg.getDate().toString())
				.build();
	}
	
	public static ChattingDTO of(ChatDTO dto) {
		return ChattingDTO.builder()
				.userId(dto.getUserId())
				.content(dto.getContent())
				.date(dto.getDate().toString())
				.build();
	}
}
