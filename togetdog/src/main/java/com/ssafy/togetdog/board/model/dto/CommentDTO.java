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
public class CommentDTO {
	private long commentId;
	private long boardId;
	private long userId;
	private String nickName;
	private String commentContent;
    
    public Comment toEntity() {
    	User user = User.builder()
    			.userId(userId)
    			.nickName(nickName)
    			.build();
    	
    	Board board = Board.builder()
    			.boardId(boardId)
    			.image("cant be null") //image값이 null일 수 없어서 쓰레기 값 추가
    			.build();
    	
    	Comment comment = Comment.builder()
    			.commentId(commentId)
    			.board(board)
    			.user(user)
    			.commentContent(commentContent)
    			.build();
    	return comment;
    }

    @Builder
	public CommentDTO(Comment comment) {
    	this.commentId = comment.getCommentId();
		this.boardId = comment.getCommentId();
		this.userId = comment.getUser().getUserId();
		this.nickName = comment.getUser().getNickName();
		this.commentContent = comment.getCommentContent();
	}	
}
