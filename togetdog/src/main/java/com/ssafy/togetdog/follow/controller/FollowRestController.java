package com.ssafy.togetdog.follow.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.togetdog.board.model.dto.BoardDto;
import com.ssafy.togetdog.board.model.entity.Board;
import com.ssafy.togetdog.board.model.service.BoardService;
import com.ssafy.togetdog.follow.model.service.FollowService;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.v3.oas.annotations.parameters.RequestBody;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/follow")
@Api("Follow API")
public class FollowRestController {
	
	@Autowired
	private final FollowService followService; 
	
	@ApiOperation(value = "팔로잉 조회", notes = "내가 팔로우 하는 강아지 리스트 조회")
	@GetMapping("/following")
	public List<DogDto> getFollowingList(){
		return null;
	}
	
	@ApiOperation(value = "팔로워 조회", notes = "해당 강아지를 팔로우하는 유저 조회")
	@GetMapping("/follower")
	public List<UserDto> getFollwerList(){
		return null;
	}
	
	@ApiOperation(value = "팔로우", notes = "강아지를 팔로우함")
	@PostMapping("/")
	public Long addFollow(@RequestBody DogDto dogDto) {
//		return boardService.save(boardDto);
		return null;
	}
	
	@ApiOperation(value = "팔로우 취소", notes = "강아지를 팔로우 취소함")
	@DeleteMapping("/")
	public Board deleteFollow(@RequestBody DogDto dogDto) {
		return null;
	}
	
	
}
