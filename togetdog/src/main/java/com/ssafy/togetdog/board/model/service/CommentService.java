package com.ssafy.togetdog.board.model.service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ssafy.togetdog.board.model.dto.CommentDTO;
import com.ssafy.togetdog.board.model.entity.Board;
import com.ssafy.togetdog.board.model.entity.Comment;
import com.ssafy.togetdog.board.model.repository.BoardRepository;
import com.ssafy.togetdog.board.model.repository.CommentRepository;
import com.ssafy.togetdog.global.exception.InvalidInputException;
import com.ssafy.togetdog.global.exception.UnAuthorizedException;

import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class CommentService {

	private final CommentRepository commentRepository;
	private final BoardRepository boardRepository;

	public List<CommentDTO> findAllCommentsInBoard(Board board) {
		List<Comment> comments = commentRepository.findAllByBoard(board).orElse(null);
		if (comments != null) {
			List<CommentDTO> cmts = comments.stream().map(c -> CommentDTO.of(c)).collect(Collectors.toList());
			return cmts;
		} else {
			throw new InvalidInputException("찾을 수없는 boardid입니다.");
		}
	}

	public List<CommentDTO> findAllCommentsInBoard(long boardId) {
		Board board = boardRepository.findById(boardId).orElse(null);
		List<CommentDTO> cmts = new ArrayList<CommentDTO>();
		if (board != null) {
			List<Comment> comments = commentRepository.findAllByBoard(board).orElse(null);
			if(comments != null) {
				cmts = comments.stream().map(c -> CommentDTO.of(c)).collect(Collectors.toList());
			}
		}
		return cmts;
	}

	public Long save(final CommentDTO commentDto) {
		Comment comment = commentRepository.save(commentDto.toEntity());
		return comment.getCommentId();
	}

	public Board deleteAndReturn(long commentId, long userId) {
		Comment comment = commentRepository.findById(commentId).orElse(null);
		if (comment != null && comment.getUser().getUserId() == userId) {
			Board board = comment.getBoard();
			commentRepository.deleteById(commentId);
			return board;
		} else {
			throw new UnAuthorizedException("권한이 없는 사용자의 접근입니다.");
		}
	}
}
