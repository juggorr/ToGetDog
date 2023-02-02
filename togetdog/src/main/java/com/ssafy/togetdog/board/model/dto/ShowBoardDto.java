//package com.ssafy.togetdog.board.model.dto;
//
//import java.util.List;
//
//import com.ssafy.togetdog.board.model.entity.Board;
//import com.ssafy.togetdog.board.model.entity.Comment;
//
//import lombok.Data;
//import lombok.Getter;
//import lombok.NoArgsConstructor;
//import lombok.Setter;
//import lombok.ToString;
//
//@Getter
//@Setter
//@ToString
//@NoArgsConstructor
//@Data
//public class ShowBoardDto {
//	private long boardId;
//	private long userId;
//	private long dogId;
//	private String image;
//    private String content;
//    private List<Comment> comments;
//    
//    
//	public ShowBoardDto(Board board, Comment comment) {
//		this.boardId = board.getBoardId();
//		this.userId = board.getUserId();
//		this.dogId = board.getDogId();
//		this.image = board.getImage();
//		this.content = board.getContent();
//		this.comments = comments;
//	}
//}
