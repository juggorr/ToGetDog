package com.ssafy.togetdog.board.model.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ssafy.togetdog.board.model.dto.BoardDto;
import com.ssafy.togetdog.board.model.entity.Board;
import com.ssafy.togetdog.board.model.repository.BoardRepository;

import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class BoardService {

	@Autowired
	private final BoardRepository boardRepository;
	
	public Long save(final BoardDto boardDto) {
		Board board = boardRepository.save(boardDto.toEntity());
		return board.getBoardId();
	}

	@Transactional
	public void delete(long boardId) {
		boardRepository.deleteById(boardId);
	}

	public BoardDto update(BoardDto boardDto) {
		Board board = boardRepository.getByBoardId(boardDto.getBoardId());
		board.setContent(boardDto.getContent());
		boardRepository.save(board);
		Board newBoard = boardRepository.getByBoardId(boardDto.getBoardId());
		BoardDto newBoardDto = new BoardDto(newBoard);
		return newBoardDto;
	}


}
