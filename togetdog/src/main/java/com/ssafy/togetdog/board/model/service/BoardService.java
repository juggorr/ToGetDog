package com.ssafy.togetdog.board.model.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ssafy.togetdog.board.model.dto.BoardDTO;
import com.ssafy.togetdog.board.model.dto.BoardShowDTO;
import com.ssafy.togetdog.board.model.entity.Board;
import com.ssafy.togetdog.board.model.repository.BoardRepository;
import com.ssafy.togetdog.dog.model.dto.DogInfoRespDTO;
import com.ssafy.togetdog.dog.model.entity.Dog;
import com.ssafy.togetdog.dog.model.repository.DogRepository;
import com.ssafy.togetdog.global.exception.InvalidInputException;

import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class BoardService {
	private final Logger logger = LoggerFactory.getLogger(BoardService.class);

	@Autowired
	private final BoardRepository boardRepository;
	private final DogRepository dogRepository;
	

	public Long save(final BoardDTO boardDto) {
		Board board = boardRepository.save(boardDto.toEntity());
		return board.getBoardId();
	}

	@Transactional
	public void delete(BoardDTO boardDto) {
		long boardId = boardDto.getBoardId();
		if (boardId > 0) {
			boardRepository.deleteById(boardId);
		} else {
			throw new InvalidInputException();
		}
	}

	public BoardDTO update(BoardDTO boardDto) {
		long boardId = boardDto.getBoardId();
		if (boardId < 0) {
			throw new InvalidInputException();
		}
		Board board = boardRepository.getByBoardId(boardId);
		board.setContent(boardDto.getContent());
		boardRepository.save(board);
		Board newBoard = boardRepository.getByBoardId(boardId);
		BoardDTO newBoardDto = new BoardDTO(newBoard);
		return newBoardDto;
	}

	@Transactional
	public BoardShowDTO getOne(long boardId) {
		Board board = boardRepository.getByBoardId(boardId);
		logger.info("return found board Content : {}", board.getContent());
//		logger.info("return found dogId : {}", dogRepository.findByDogId(board.getDog().getDogId()).getDogName());
		BoardShowDTO boardDTO = new BoardShowDTO(board);
		Dog dog = dogRepository.findByDogId(board.getDog().getDogId());
		logger.info("ccccccccccccccccccccccccccc : {}", DogInfoRespDTO.of(dog));
		boardDTO.setDog(DogInfoRespDTO.of(dog));
		return boardDTO;
	}

	public Page<BoardDTO> getAllByDogId(long dogId, int page) {
		Pageable pageable = PageRequest.of(page, 96);
		Dog dog = new Dog();
		dog.setDogId(dogId);
		Page<Board> bList = boardRepository.findAllByDog(dog, pageable);
		logger.debug("return found bList : {}", bList);

		Page<BoardDTO> boardList = bList.map(b -> new BoardDTO(b));
//		List<BoardDTO> boardList = bList.stream().map(b -> new BoardDTO(b))
//                .collect(Collectors.toList());
		
        return boardList; 
	}

//	public Page<BoardDTO> getAllByDogIds(List<Long> dogIds, int page) {
//		Pageable pageable = PageRequest.of(page, 96);
//		List<Dog> dogs = new ArrayList<Dog>();
//		for (long dogId : dogIds) {
//			Dog dog = new Dog();
//			dog.setDogId(dogId);
//			dogs.add(dog);
//		}
//		Page<Board> bList = boardRepository.findAllByDog(dogs, pageable);
//		logger.debug("return found bList : {}", bList);
//
//		Page<BoardDTO> boardList = bList.map(b -> new BoardDTO(b));
////		List<BoardDTO> boardList = bList.stream().map(b -> new BoardDTO(b))
////                .collect(Collectors.toList());
//		
//        return boardList; 
//		
//	}

	public Page<BoardDTO> findAll(int page) {
		Pageable pageable = PageRequest.of(page, 96);
		Page<Board> bList = boardRepository.findAll(pageable);
		Page<BoardDTO> boardList = bList.map(b -> new BoardDTO(b));
		return boardList;
	}

}
