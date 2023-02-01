package com.ssafy.togetdog.board.model.dto;

import com.ssafy.togetdog.board.model.entity.Board;

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
public class BoardDto {
	private long boardId;
	private long userId;
	private long dogId;
	private String image;
    private String content;
    
    public Board toEntity() {
    	Board board = Board.builder()
    			.boardId(boardId)
    			.userId(userId)
    			.dogId(dogId)
    			.image(image)
    			.content(content)
    			.build();
    	return board;
    }

    @Builder
	public BoardDto(long boardId, long userId, long dogId, String image, String content) {
		this.boardId = boardId;
		this.userId = userId;
		this.dogId = dogId;
		this.image = image;
		this.content = content;
	}
}
