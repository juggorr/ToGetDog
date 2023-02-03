package com.ssafy.togetdog.board.model.service;


import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ssafy.togetdog.board.model.dto.BoardDto;
import com.ssafy.togetdog.board.model.dto.CommentDto;
import com.ssafy.togetdog.board.model.dto.LikeDTO;
import com.ssafy.togetdog.board.model.entity.Board;
import com.ssafy.togetdog.board.model.entity.Comment;
import com.ssafy.togetdog.board.model.entity.LikePost;
import com.ssafy.togetdog.board.model.repository.LikeRepository;
import com.ssafy.togetdog.user.model.entity.User;

import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class LikeService {
	
	@Autowired
	private final LikeRepository likeRepository;
	
	public Long save(final LikeDTO likeDTO) {
		Board board = new Board();
		board.setBoardId(likeDTO.getBoardId());
		User user = new User();
		user.setUserId(likeDTO.getUserId());
		LikePost alreadyLiked = likeRepository.findByBoardAndUser(board, user).orElse(null);
		if(alreadyLiked == null) {
			LikePost like = likeRepository.save(likeDTO.toEntity());
			return like.getLikeId(); 			
		} else {
			return alreadyLiked.getLikeId();
		}
	}

	public void delete(LikeDTO likeDTO) {
		Board board = new Board();
		board.setBoardId(likeDTO.getBoardId());
		User user = new User();
		user.setUserId(likeDTO.getUserId());
		likeRepository.deleteByBoardAndUser(board, user);
	}

	public Long getLikes(long boardId) {
		BoardDto boardDto = new BoardDto();
		boardDto.setBoardId(boardId);
		boardDto.setImage("");
		return likeRepository.countByBoard(boardDto.toEntity());
	}
	
}
