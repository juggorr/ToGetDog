package com.ssafy.togetdog.board.model.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ssafy.togetdog.board.model.dto.BoardDto;
import com.ssafy.togetdog.board.model.entity.Board;
import com.ssafy.togetdog.board.model.entity.Comment;

public interface CommentRepository extends JpaRepository<Comment, Long> {
	Optional<List<Comment>> findAllByBoard(Board board);
	
}
