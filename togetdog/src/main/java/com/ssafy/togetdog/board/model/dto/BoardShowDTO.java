package com.ssafy.togetdog.board.model.dto;

import java.util.ArrayList;
import java.util.List;

import com.ssafy.togetdog.board.model.entity.Board;
import com.ssafy.togetdog.board.model.entity.Comment;

import lombok.Builder;
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
	private long dogId;
	private String image;
	private String content;
	private List<CommentDTO> comments = new ArrayList<CommentDTO>();

	@Builder
	public BoardShowDTO(long boardId, long userId, long dogId, String image, String content, List<Comment> comments) {
		super();
		this.boardId = boardId;
		this.userId = userId;
		this.dogId = dogId;
		this.image = image;
		this.content = content;
	}
	
	public BoardShowDTO(Board entity) {
		this.boardId = entity.getBoardId();
		this.userId = entity.getUser().getUserId();
		this.dogId = entity.getDog().getDogId();
		this.image = entity.getImage();
		this.content = entity.getContent();
	}


}
