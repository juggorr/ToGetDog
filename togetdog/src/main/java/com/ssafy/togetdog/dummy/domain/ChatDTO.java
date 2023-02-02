package com.ssafy.togetdog.dummy.domain;

import java.util.Date;

import lombok.Data;

@Data
public class ChatDTO {
	private String writer;
	private String content;
	private Date time;
}
