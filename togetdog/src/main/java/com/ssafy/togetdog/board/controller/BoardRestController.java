package com.ssafy.togetdog.board.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.togetdog.board.model.dto.BoardDto;
import com.ssafy.togetdog.board.model.entity.Board;
import com.ssafy.togetdog.board.model.service.BoardService;
import com.ssafy.togetdog.board.model.service.CommentService;

import io.swagger.annotations.Api;
import io.swagger.v3.oas.annotations.parameters.RequestBody;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/board")
@Api("Board API")
public class BoardRestController {
	
	private final BoardService boardService; 
	
	@PostMapping("/")
	public Long save(@RequestBody BoardDto boardDto) {
		return boardService.save(boardDto);
	}
	
	@GetMapping("/comments")
	public List<Commment> getComments(@RequestBody Board board) {
		return CommentService.findAllCommentsInBoard(board);
	}
}
