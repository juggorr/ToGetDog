package com.ssafy.togetdog.board.model.dto;

import com.ssafy.togetdog.board.model.entity.Board;
import com.ssafy.togetdog.board.model.entity.Comment;
import com.ssafy.togetdog.user.model.entity.User;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Builder
@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
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

    public static CommentDTO of(Comment comment) {
    	return CommentDTO.builder()
    			.commentId(comment.getCommentId())
    			.boardId(comment.getBoard().getBoardId())
    			.userId(comment.getUser().getUserId())
    			.nickName(comment.getUser().getUsername())
    			.commentContent(comment.getCommentContent())
    			.build();
    }
}
