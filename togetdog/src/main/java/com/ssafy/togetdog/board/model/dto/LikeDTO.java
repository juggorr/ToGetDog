package com.ssafy.togetdog.board.model.dto;

import com.ssafy.togetdog.board.model.entity.Board;
import com.ssafy.togetdog.board.model.entity.LikePost;
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
public class LikeDTO {
	private long likeId;
	private long userId;
	private long boardId;
	
	public LikePost toEntity() {
		User user = User.builder()
    			.userId(userId).build();
    	
    	Board board = Board.builder()
    			.boardId(boardId)
    			.image("cant be null") //image값이 null일 수 없어서 쓰레기 값 추가
    			.build();
    	
    	LikePost like = LikePost.builder()
    			.likeId(likeId)
    			.board(board)
    			.user(user)
    			.build();
		return like;
	}

	@Builder
	public LikeDTO(long likeId, long userId, long boardId) {
		this.likeId = likeId;
		this.userId = userId;
		this.boardId = boardId;
	}

	public LikeDTO(LikePost entity) {
		this.likeId = entity.getLikeId();
		this.userId = entity.getUser().getUserId();
		this.boardId = entity.getBoard().getBoardId();
	}
	
	
}
