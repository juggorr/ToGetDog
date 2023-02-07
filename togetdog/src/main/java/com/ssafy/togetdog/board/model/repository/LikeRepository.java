package com.ssafy.togetdog.board.model.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ssafy.togetdog.board.model.entity.Board;
import com.ssafy.togetdog.board.model.entity.LikePost;
import com.ssafy.togetdog.user.model.entity.User;

public interface LikeRepository extends JpaRepository<LikePost, Long> {

	int countByBoard(Board board);

	Optional<LikePost> findByBoardAndUser(Board board, User user);

	void deleteByBoardAndUser(Board board, User user);

}
