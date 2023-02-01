package com.ssafy.togetdog.board.model.dto;

import com.ssafy.togetdog.board.model.entity.Board;
import com.ssafy.togetdog.dog.model.entity.Dog;
import com.ssafy.togetdog.user.model.entity.User;

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
	private User user;
	private Dog dog;
	private String image;
    private String content;
    
    public Board toEntity() {
    	Board board = Board.builder()
    			.boardId(boardId)
    			.user(user)
    			.dog(dog)
    			.image(image)
    			.content(content)
    			.build();
    	return board;
    }

    @Builder
	public BoardDto(long boardId, User user, Dog dog, String image, String content) {
		super();
		this.boardId = boardId;
		this.user = user;
		this.dog = dog;
		this.image = image;
		this.content = content;
	}
}
