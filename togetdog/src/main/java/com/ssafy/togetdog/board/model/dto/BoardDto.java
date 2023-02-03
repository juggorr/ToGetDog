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
	private long userId;
	private long dogId;
	private String image;
    private String content;
    
    public Board toEntity() {
    	User user = User.builder()
    			.userId(userId).build();
    	
    	Dog dog = Dog.builder()
    			.dogId(dogId).build();
    	
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
	public BoardDto(long boardId, long userId, long dogId, String image, String content) {
		this.boardId = boardId;
		this.userId = userId;
		this.dogId = dogId;
		this.image = image;
		this.content = content;
	}

		public BoardDto(Board entity) {
			this.boardId = entity.getBoardId();
			this.userId = entity.getUser().getUserId();
			this.dogId = entity.getDog().getDogId();
			this.image = entity.getImage();
			this.content = entity.getContent();
		}


}
