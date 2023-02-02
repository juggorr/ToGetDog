package com.ssafy.togetdog.dummy.domain;

import lombok.Data;

@Data
public class CommentDTO {
	private long commentId;
	private long userId;
	private String userName;
	private String content;
}
