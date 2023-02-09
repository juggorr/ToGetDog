package com.ssafy.togetdog.dummy.chat.domain;

import java.util.Date;

import lombok.Data;

@Data
public class ChatDTO {
	private String writer;
	private String content;
	private Date time;
}
