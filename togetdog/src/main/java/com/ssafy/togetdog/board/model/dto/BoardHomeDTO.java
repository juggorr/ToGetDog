package com.ssafy.togetdog.board.model.dto;

import com.ssafy.togetdog.board.model.entity.Board;
import com.ssafy.togetdog.dog.model.dto.DogInfoRespDTO;

import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@NoArgsConstructor
@Data
public class BoardHomeDTO {
	private long boardId;
	private long userId;
	private long dogId;
	private DogInfoRespDTO dog;
	private String image;
	private String content;

	public BoardHomeDTO(long boardId, long userId, DogInfoRespDTO dog, String image, String content) {
		this.boardId = boardId;
		this.userId = userId;
		this.dog = dog;
		this.image = image;
		this.content = content;
	}

	public BoardHomeDTO(Board entity) {
		this.boardId = entity.getBoardId();
		this.userId = entity.getUser().getUserId();
		this.dogId = entity.getDog().getDogId();
		this.image = entity.getImage();
		this.content = entity.getContent();
	}



}
