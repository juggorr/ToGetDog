package com.ssafy.togetdog.board.model.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ssafy.togetdog.board.model.dto.BoardDTO;
import com.ssafy.togetdog.board.model.dto.CommentDTO;
import com.ssafy.togetdog.board.model.entity.Comment;
import com.ssafy.togetdog.board.model.repository.CommentRepository;

import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class CommentService {

	private final CommentRepository commentRepository;
	
	public List<CommentDTO> findAllCommentsInBoard(long boardId){
		BoardDTO boardDto = new BoardDTO();
		boardDto.setBoardId(boardId);
		boardDto.setImage("");
		List<Comment> comments = commentRepository.findAllByBoard(boardDto.toEntity()).orElse(null);

		//stream 써서 코드 발전 시킬 수 있음
		List<CommentDTO> cmts = new ArrayList<CommentDTO>();
		for (Comment comment : comments) {
			CommentDTO commentDto = new CommentDTO(comment.getCommentId(), comment.getBoard().getBoardId(), comment.getUser().getUserId(), comment.getCommentContent());
			cmts.add(commentDto);
		}
        return cmts; 
	}
	
	public Long save(final CommentDTO commentDto) {
		Comment comment = commentRepository.save(commentDto.toEntity());
		return comment.getCommentId();
	}

	public void delete(long commentId) {
		commentRepository.deleteById(commentId);
	}
}
