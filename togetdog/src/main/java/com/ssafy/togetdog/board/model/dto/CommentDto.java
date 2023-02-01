package com.ssafy.togetdog.board.model.dto;

import com.ssafy.togetdog.board.model.entity.Board;
import com.ssafy.togetdog.board.model.entity.Comment;
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
public class CommentDto {
	private long commentId;
	private Board board;
	private User user;
	private long userId;
	private String commentContent;
    
    public Comment toEntity() {
    	Comment comment = Comment.builder()
    			.commentId(commentId)
    			.board(board)
    			.user(user)
    			.commentContent(commentContent)
    			.build();
    	return comment;
    }

    @Builder
	public CommentDto(long commentId, Board board, long userId, String commentContent) {
		super();
		this.commentId = commentId;
		this.board = board;
		this.userId = userId;
		this.commentContent = commentContent;
	}
}
