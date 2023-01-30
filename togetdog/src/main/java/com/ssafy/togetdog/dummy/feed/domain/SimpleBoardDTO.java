package com.ssafy.togetdog.dummy.feed.domain;

import com.ssafy.togetdog.dummy.dog.domain.DogDTO;

import lombok.Data;

@Data
public class SimpleBoardDTO {
	
	private DogDTO dog;
	private long boardId;
	private String image;
}
