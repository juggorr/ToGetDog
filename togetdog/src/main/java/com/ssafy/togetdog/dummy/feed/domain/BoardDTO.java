package com.ssafy.togetdog.dummy.feed.domain;

import java.util.ArrayList;
import java.util.List;

import lombok.Data;

@Data
public class BoardDTO {
	private long dogId;
	private String dogName;
	private String dogType;
	private String dogGender;
	private int dogAge;
	private String dogImage;
	private boolean isLiked;
	private boolean isFollwed;
	private int likeCnt;
	private String content;
	private List<CommentDTO> comments = new ArrayList<>();
}
