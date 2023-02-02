package com.ssafy.togetdog.chat.model;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public class ChatDTO {

	private String userName;

	private String content;

	private int rooms;
}
