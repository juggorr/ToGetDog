package com.ssafy.togetdog.board.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.togetdog.board.model.dto.BoardDto;
import com.ssafy.togetdog.board.model.entity.Board;
import com.ssafy.togetdog.board.model.service.BoardService;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.v3.oas.annotations.parameters.RequestBody;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/board")
@Api("Board API")
public class BoardRestController {
	
	@Autowired
	private final BoardService boardService; 
	
	@ApiOperation(value = "홈화면 게시글 리스트", notes = "홈화면에서 구독한 개들의 게시글 표시")
	@GetMapping("/home")
	public List<BoardDto> getBoardListForHome(){
		return null;
	}
	
	@ApiOperation(value = "피드 조회", notes = "피드 상단은 강아지 정보, 피드 하단은 게시글 리스트")
	@GetMapping("/feed/{dogId}")
	public List<BoardDto> getFeed(){
		return null;
	}
	
	@ApiOperation(value = "피드 하단 게시물 리스트", notes = "피드 하단에 보일 게시글 리스트를 반환")
	@GetMapping("/list/{dogId}")
	public List<BoardDto> getBoardListByDogId(@PathVariable String dogId){
		return null;
	}
	
	@ApiOperation(value = "게시글 단건 가져오기", notes = "boardId에 해당하는 게시글 반환")
	@GetMapping("/{boardId}")
	public List<BoardDto> getBoard(@PathVariable String boardId){
		return null;
	}
	
	@ApiOperation(value = "게시글 등록", notes = "게시글을 등록함")
	@PostMapping("/")
	public Long addBoard(@RequestBody BoardDto boardDto) {
		return boardService.save(boardDto);
	}
	
	@ApiOperation(value = "게시물 수정", notes = "선택된 단건 게시글을 수정")
	@PutMapping("/")
	public Board modifyBoard(@RequestBody BoardDto boardDto) {
		return null;
	}
	
	@ApiOperation(value = "게시물 삭제", notes = "선택된 단건 게시글을 삭제")
	@DeleteMapping("/")
	public Board deleteBoard(@RequestBody BoardDto boardDto) {
		return null;
	}
	
	@ApiOperation(value = "댓글 등록", notes = "게시글애 댓글을 등록함")
	@PostMapping("/comment")
	public Long addComment(@RequestBody BoardDto boardDto) {
//		return commentService.save(boardDto);
		return null;
	}
	
	@ApiOperation(value = "댓글 삭제", notes = "선택된 단건 댓글을 삭제")
	@DeleteMapping("/comment")
	public Board deleteComment(@RequestBody BoardDto boardDto) {
		return null;
	}
	
	@ApiOperation(value = "좋아요", notes = "게시글애 좋아요")
	@PostMapping("/like")
	public Long addLike(@RequestBody BoardDto boardDto) {
//		return commentService.save(boardDto);
		return null;
	}
	
	@ApiOperation(value = "좋아요  취소", notes = "게시글에 좋아요 취소")
	@DeleteMapping("/like")
	public Board deleteLike(@RequestBody BoardDto boardDto) {
		return null;
	}
	
}
