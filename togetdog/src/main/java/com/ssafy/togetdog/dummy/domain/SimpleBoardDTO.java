package com.ssafy.togetdog.dummy.domain;

import lombok.Data;

@Data
public class SimpleBoardDTO {
	
	private DogDTO dog;
	private long boardId;
	private String image;
}
