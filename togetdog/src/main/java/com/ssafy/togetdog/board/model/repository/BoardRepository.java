package com.ssafy.togetdog.board.model.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ssafy.togetdog.board.model.entity.Board;

public interface BoardRepository extends JpaRepository<Board, Long> {

	Board getByBoardId(long boardId);
//	Optional<Board> findAllByDogId(long dogId);
//	Board findByBoardId(long boardId);
	
}
