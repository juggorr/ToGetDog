package com.ssafy.togetdog.board.model.dto;

import java.util.List;

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
public class BoardShowDTO {
	private long boardId;
	private long userId;
	private DogInfoRespDTO dog;
	private String image;
	private String content;
	private boolean isLiked;
	private int likeCnt;
	private List<CommentDTO> comments;

	public BoardShowDTO(long boardId, long userId, DogInfoRespDTO dog, String image, String content, List<CommentDTO> comments) {
		this.boardId = boardId;
		this.userId = userId;
		this.dog = dog;
		this.image = image;
		this.content = content;
		this.comments = comments;
	}

	public BoardShowDTO(Board entity) {
		this.boardId = entity.getBoardId();
		this.userId = entity.getUser().getUserId();
//		this.dog = entity.getDog();
		this.image = entity.getImage();
		this.content = entity.getContent();
	}



}
