package com.ssafy.togetdog.board.model.service;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.ssafy.togetdog.board.model.dto.BoardDTO;
import com.ssafy.togetdog.board.model.dto.BoardHomeDTO;
import com.ssafy.togetdog.board.model.dto.BoardShowDTO;
import com.ssafy.togetdog.board.model.entity.Board;
import com.ssafy.togetdog.board.model.repository.BoardRepository;
import com.ssafy.togetdog.board.model.repository.LikeRepository;
import com.ssafy.togetdog.dog.model.dto.DogInfoRespDTO;
import com.ssafy.togetdog.dog.model.entity.Dog;
import com.ssafy.togetdog.dog.model.repository.DogRepository;
import com.ssafy.togetdog.global.exception.InvalidInputException;
import com.ssafy.togetdog.global.util.FileUtil;
import com.ssafy.togetdog.user.model.entity.User;

import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class BoardService {
	private final Logger logger = LoggerFactory.getLogger(BoardService.class);

	@Autowired
	private final BoardRepository boardRepository;
	private final DogRepository dogRepository;
	private final LikeRepository likeRepository;
	private final FileUtil fileUtil;
	
	@Value("${file.path.upload-images-boards}")
	private String boardImageFilePath;
	

	@Transactional
	public Long save(BoardDTO boardDTO, MultipartFile image ) throws IllegalStateException, IOException {
		if (boardDTO == null || image.isEmpty()) {
			throw new InvalidInputException("필요한 값이 들어오지 않았습니다.");
		}
		String savePath = fileUtil.fileUpload(image, boardImageFilePath);
		Board board = boardRepository.save(boardDTO.toEntity(savePath));
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
		Board board = boardRepository.getByBoardIdOrderByBoardIdDesc(boardId);
		board.setContent(boardDto.getContent());
		boardRepository.save(board);
		Board newBoard = boardRepository.getByBoardIdOrderByBoardIdDesc(boardId);
		BoardDTO newBoardDto = new BoardDTO(newBoard);
		return newBoardDto;
	}

	@Transactional
	public BoardShowDTO getOne(long userId, long boardId) {
		User user = new User();
		user.setUserId(userId);
		Board board = boardRepository.getByBoardIdOrderByBoardIdDesc(boardId);
		logger.info("return found board Content : {}", board.getContent());
		BoardShowDTO boardDTO = new BoardShowDTO(board);
		Dog dog = dogRepository.findByDogId(board.getDog().getDogId());
		boardDTO.setDog(DogInfoRespDTO.of(dog));
		logger.info("is board Liked : {}", likeRepository.findByBoardAndUser(board, user));
		if(likeRepository.findByBoardAndUser(board, user).orElse(null) != null) {
			boardDTO.setLiked(true);
		} else {
			boardDTO.setLiked(false);
		}
		boardDTO.setLikeCnt(likeRepository.countByBoard(board));
		return boardDTO;
	}

	public Page<BoardDTO> getAllByDogId(long dogId, int page) {
		Pageable pageable = PageRequest.of(page, 27, Sort.by("boardId").descending());
		Dog dog = new Dog();
		dog.setDogId(dogId);
		Page<Board> bList = boardRepository.findAllByDogOrderByBoardIdDesc(dog, pageable);
		logger.debug("return found bList : {}", bList);

		Page<BoardDTO> boardList = bList.map(b -> new BoardDTO(b));
//		List<BoardDTO> boardList = bList.stream().map(b -> new BoardDTO(b))
//                .collect(Collectors.toList());
		
        return boardList; 
	}

	public Page<BoardDTO> findAll(int page) {
		Pageable pageable = PageRequest.of(page, 27, Sort.by("boardId").descending());
		Page<Board> bList = boardRepository.findAll(pageable);
		Page<BoardDTO> boardList = bList.map(b -> new BoardDTO(b));
		return boardList;
	}

	public Page<BoardHomeDTO> getAllInDogIds(List<Long> dogIds, int page) {
		Pageable pageable = PageRequest.of(page, 9, Sort.by("boardId").descending());
		List<Dog> dogList = new ArrayList<Dog>();
		for (Long id : dogIds) {
			Dog dog = dogRepository.findByDogId(id);
			logger.debug("======= dog : {}", dog);
			dogList.add(dog);
		}
		Page<BoardHomeDTO> fbList = boardRepository.findAllByDogInOrderByBoardIdDesc(dogList, pageable);
		for (int i = 0; i < fbList.getNumberOfElements(); i++) {
			long dogId = fbList.getContent().get(i).getDogId();
			fbList.getContent().get(i).setDog(DogInfoRespDTO.of(dogRepository.findByDogId(dogId)));
		}
		logger.debug("======= fbList : {}", fbList.getContent());
		
		return fbList;
	}
	
	public Board findBoardByBoardId(long boardId) {
		return boardRepository.findById(boardId).orElse(null);
	}

}
