package com.ssafy.togetdog.board.model.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import com.ssafy.togetdog.board.model.dto.BoardDTO;
import com.ssafy.togetdog.board.model.entity.Board;
import com.ssafy.togetdog.dog.model.entity.Dog;

public interface BoardRepository extends JpaRepository<Board, Long> {

	Board getByBoardId(long boardId);
	Page<Board> findAllByDog(Dog dog, Pageable pageable);
	Page<BoardDTO> findAllByDogIn(List<Dog> dogList, Pageable pageable);
	
}
