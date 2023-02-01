package com.ssafy.togetdog.board.model.service;

import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.stereotype.Service;

import com.ssafy.togetdog.board.model.entity.Board;
import com.ssafy.togetdog.board.model.entity.Comment;
import com.ssafy.togetdog.board.model.repository.CommentRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CommentService {

	private final CommentRepository commentRepository;
	private final BoardService boardService;
	
	@Transactional
	public Optional<Comment> findAllCommentsInBoard(Board board){
        return commentRepository.findByBoard(board);
	}
}
