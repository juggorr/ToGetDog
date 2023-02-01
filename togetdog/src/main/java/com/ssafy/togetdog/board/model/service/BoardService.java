package com.ssafy.togetdog.board.model.service;

import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.stereotype.Service;

import com.ssafy.togetdog.board.model.dto.BoardDto;
import com.ssafy.togetdog.board.model.entity.Board;
import com.ssafy.togetdog.board.model.repository.BoardRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class BoardService {

	private final BoardRepository boardRepository;
	
	@Transactional
	public Long save(final BoardDto boardDto) {
		Board board = boardRepository.save(boardDto.toEntity());
		return board.getBoardId();
	}
	
	@Transactional
	public Optional<Board> findById(final BoardDto boardDto) {
		Optional<Board> board = boardRepository.findById(boardDto.getBoardId());
		return board;
	}
}
