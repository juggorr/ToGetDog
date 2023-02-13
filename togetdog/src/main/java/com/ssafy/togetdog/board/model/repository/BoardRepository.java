package com.ssafy.togetdog.board.model.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import com.ssafy.togetdog.board.model.dto.BoardHomeDTO;
import com.ssafy.togetdog.board.model.entity.Board;
import com.ssafy.togetdog.dog.model.entity.Dog;

public interface BoardRepository extends JpaRepository<Board, Long> {

	Board getByBoardIdOrderByBoardIdDesc(long boardId);
	Page<Board> findAllByDogOrderByBoardIdDesc(Dog dog, Pageable pageable);
	Page<BoardHomeDTO> findAllByDogInOrderByBoardIdDesc(List<Dog> dogList, Pageable pageable);
	Page<Board> findAllOrderByBoardIdDesc(Pageable pageable);
	
}
