package com.ssafy.togetdog.dummy.feed.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.ssafy.togetdog.dummy.dog.domain.DogDTO;
import com.ssafy.togetdog.dummy.feed.domain.BoardDTO;
import com.ssafy.togetdog.dummy.feed.domain.CommentDTO;
import com.ssafy.togetdog.dummy.feed.domain.SimpleBoardDTO;
import com.ssafy.togetdog.dummy.user.domain.UserDTO;
import com.ssafy.togetdog.dummy.user.domain.UserIncludesDogsDTO;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;

@RestController
@Api("게시물 관련 더미 API : 무슨 값을 넣든 같은 dummy 결과가 나옵니다.")
public class DummyFeedController {

	private static final String SUCCESS = "success";
	// private static final String FAIL = "fail";

	@ApiOperation(value = "홈 화면 조회", notes = "홈 화면 조회에 필요한 값을 리턴합니다.")
	@GetMapping("/home")
	public ResponseEntity<?> getHomeInfo(@RequestParam String pageNo) {
		DogDTO dog = new DogDTO();
		dog.setDogId(123L);
		dog.setUserId(84L);
		dog.setDogName("크림");
		dog.setDogGender("female");
		dog.setDogType("포메라니안");
		dog.setDogAge(24);
		dog.setDogWeight(3.4);
		dog.setDogNeutered(true);
		dog.setDogCharacter1("independent");
		dog.setDogCharacter2("active");
		dog.setDescription("활동적이고 순해요");
		dog.setDogProfile("asdfasdf.jpg");

		List<SimpleBoardDTO> boardList = new ArrayList<SimpleBoardDTO>();
		SimpleBoardDTO board = new SimpleBoardDTO();
		board.setDog(dog);
		board.setBoardId(1);
		board.setImage("cream.png");
		boardList.add(board);

		Map<String, Object> resultMap = new HashMap<String, Object>();
		resultMap.put("result", SUCCESS);
		resultMap.put("boardList", boardList);
		return new ResponseEntity<Map<String, Object>>(resultMap, HttpStatus.OK);
	}

	@ApiOperation(value = "피드", notes = "피드 정보를 리턴합니다.")
	@GetMapping("/feed")
	public ResponseEntity<?> getFeedInfo(@RequestParam String pageNo) {

		// 피드 주인 정보
		UserIncludesDogsDTO user = new UserIncludesDogsDTO();

		// 피드 주인의 강아지 3마리
		DogDTO dog = new DogDTO();
		dog.setDogId(114L);
		dog.setUserId(123L);
		dog.setDogName("뽀삐");
		dog.setDogGender("female");
		dog.setDogType("말티즈");
		dog.setDogAge(72);
		dog.setDogWeight(3.4);
		dog.setDogNeutered(true);
		dog.setDogCharacter1("independent");
		dog.setDogCharacter2("active");
		dog.setDescription("활동적이고 순해요");
		dog.setDogProfile("asdfasdf.jpg");

		user.setUserId(123L);
		user.setNickName("뽀삐엄마");
		user.setUserAge(28);
		user.setAddress("서울시 동작구 흑석동");
		user.setRegionCode("11455");
		user.setSocial("naver");
		user.setRating(3.41);
		user.getDog().add(dog);

		// 부가 정보
		user.setFollow(true);
		user.setFollowCnt(300);

		// feed 게시물 리스트
		List<SimpleBoardDTO> boardList = new ArrayList<SimpleBoardDTO>();
		SimpleBoardDTO board = new SimpleBoardDTO();
		board.setDog(dog);
		board.setBoardId(123);
		board.setImage("cream.png");
		boardList.add(board);

		Map<String, Object> resultMap = new HashMap<String, Object>();
		resultMap.put("result", SUCCESS);
		resultMap.put("user", user);
		resultMap.put("feed", boardList);
		return new ResponseEntity<Map<String, Object>>(resultMap, HttpStatus.OK);
	}

	@ApiOperation(value = "피드 하단 게시물 조회", notes = "피드 하단 게시물을 강아지 번호에 따라 조회합니다.")
	@GetMapping("/list/{dogId}")
	public ResponseEntity<?> getBoardListByDogId(@PathVariable String dogId) {
		// feed 게시물 리스트
		List<SimpleBoardDTO> boardList = new ArrayList<SimpleBoardDTO>();
		SimpleBoardDTO board = new SimpleBoardDTO();
		DogDTO dog = new DogDTO();
		dog.setDogId(Long.parseLong(dogId));
		board.setDog(dog);
		board.setBoardId(123);
		board.setImage("cream.png");
		boardList.add(board);

		Map<String, Object> resultMap = new HashMap<String, Object>();
		resultMap.put("result", SUCCESS);
		resultMap.put("feed", boardList);
		return new ResponseEntity<Map<String, Object>>(resultMap, HttpStatus.OK);
	}

	@ApiOperation(value = "게시물 조회", notes = "특정 게시물을 조회합니다.")
	@GetMapping("/board/{boardId}")
	public ResponseEntity<?> getBoardInfo(@PathVariable String boardId, @RequestParam String pageNo) {
		BoardDTO boardInfo = new BoardDTO();
		boardInfo.setDogId(24L);
		boardInfo.setDogName("크림");
		boardInfo.setDogType("포메라니언");
		boardInfo.setDogGender("female");
		boardInfo.setDogAge(24);
		boardInfo.setDogImage("cream.png");
		boardInfo.setLiked(true);
		boardInfo.setFollwed(true);
		boardInfo.setLikeCnt(34);
		boardInfo.setContent("크림아 화난거 아니지?");
		
		CommentDTO comment = new CommentDTO();
		comment.setCommentId(2L);
		comment.setUserId(3L);
		comment.setUserName("삐뽀아빠");
		comment.setContent("크림아 화내지마~");
		
		boardInfo.getComments().add(comment);
		
		Map<String, Object> resultMap = new HashMap<String, Object>();
		resultMap.put("result", SUCCESS);
		resultMap.put("board", boardInfo);
		return new ResponseEntity<Map<String, Object>>(resultMap, HttpStatus.OK);
	}

	@ApiOperation(value = "게시물 등록", notes = "새로운 게시물을 등록합니다.")
	@PostMapping("/board")
	public ResponseEntity<?> postingBoard(
			@RequestParam String dogId,
			@RequestParam(value="image", required = true) MultipartFile image,
			@RequestParam String content) {
		
		Map<String, Object> resultMap = new HashMap<String, Object>();
		resultMap.put("boardId", 123);
		resultMap.put("result", SUCCESS);
		resultMap.put("msg", "게시물이 등록 되었습니다.");
		return new ResponseEntity<Map<String, Object>>(resultMap, HttpStatus.OK);
	}

	@ApiOperation(value = "게시물 삭제", notes = "해당 게시물을 삭제합니다.")
	@DeleteMapping("/board")
	public ResponseEntity<?> deleteBoard(
			@RequestParam String pageNo,
			@RequestParam String boardId
			) {
		Map<String, String> resultMap = new HashMap<String, String>();
		resultMap.put("result", SUCCESS);
		resultMap.put("msg", "게시물이 삭제 되었습니다.");
		return new ResponseEntity<Map<String, String>>(resultMap, HttpStatus.OK);
	}

	@ApiOperation(value = "게시물 수정", notes = "해당 게시물을 수정합니다.")
	@PutMapping("/board")
	public ResponseEntity<?> updateBoard(
			@RequestParam String pageNo,
			@RequestParam String boardId,
			@RequestParam String content
			) {
		Map<String, String> resultMap = new HashMap<String, String>();
		resultMap.put("result", SUCCESS);
		resultMap.put("msg", "게시물이 수정 되었습니다.");
		return new ResponseEntity<Map<String, String>>(resultMap, HttpStatus.OK);
	}

	@ApiOperation(value = "댓글 등록", notes = "게시글에 새로운 댓글을 등록합니다.")
	@PostMapping("/board/comment")
	public ResponseEntity<?> postingComment(
			@RequestParam String boardId
			) {
		
		BoardDTO boardInfo = new BoardDTO();
		List<CommentDTO> commentList = boardInfo.getComments();
		
		CommentDTO comment = new CommentDTO();
		comment.setCommentId(1);
		comment.setUserId(24);
		comment.setUserName("삐뽀아빠");
		comment.setContent("화내지마");
		commentList.add(comment);
		
		Map<String, Object> resultMap = new HashMap<String, Object>();
		resultMap.put("comments", commentList);
		resultMap.put("result", SUCCESS);
		resultMap.put("msg", "댓글이 등록 되었습니다.");
		return new ResponseEntity<Map<String, Object>>(resultMap, HttpStatus.OK);
	}

	@ApiOperation(value = "댓글 삭제", notes = "게시글에 달린 특정 댓글을 삭제합니다.")
	@DeleteMapping("/board/comment")
	public ResponseEntity<?> deleteComment(
			@RequestParam String commentId
			) {
		BoardDTO boardInfo = new BoardDTO();
		List<CommentDTO> commentList = boardInfo.getComments();
		
		CommentDTO comment = new CommentDTO();
		comment.setCommentId(1);
		comment.setUserId(24);
		comment.setUserName("삐뽀아빠");
		comment.setContent("화내지마");
		commentList.add(comment);
		
		Map<String, Object> resultMap = new HashMap<String, Object>();
		resultMap.put("comments", commentList);
		resultMap.put("result", SUCCESS);
		resultMap.put("msg", "댓글이 삭제 되었습니다.");
		return new ResponseEntity<Map<String, Object>>(resultMap, HttpStatus.OK);
	}

	@ApiOperation(value = "좋아요", notes = "특정 게시물에 좋아요를 합니다.")
	@PostMapping("/board/like")
	public ResponseEntity<?> doLike(
			@RequestParam String pageNo,
			@RequestParam String boardId
			) {
		Map<String, Object> resultMap = new HashMap<String, Object>();
		resultMap.put("likeCnt", 255);
		resultMap.put("result", SUCCESS);
		resultMap.put("msg", "좋아요가 반영되었습니다.");
		return new ResponseEntity<Map<String, Object>>(resultMap, HttpStatus.OK);
	}

	@ApiOperation(value = "좋아요 취소", notes = "특정 게시물에 반영했던 좋아요를 취소합니다.")
	@DeleteMapping("/board/like")
	public ResponseEntity<?> cancelLike(
			@RequestParam String pageNo,
			@RequestParam String boardId
			) {
		Map<String, Object> resultMap = new HashMap<String, Object>();
		resultMap.put("likeCnt", 255);
		resultMap.put("result", SUCCESS);
		resultMap.put("msg", "좋아요가 취소되었습니다.");
		return new ResponseEntity<Map<String, Object>>(resultMap, HttpStatus.OK);
	}

	@ApiOperation(value = "팔로우 리스트 조회", notes = "유저가 팔로우하는 강아지 리스트를 조회합니다.")
	@GetMapping("/follow/following")
	public ResponseEntity<?> getFollowList(
			@RequestParam String userId
			) {
		List<DogDTO> dogList = new ArrayList<DogDTO>();
		
		DogDTO dog = new DogDTO();
		dog.setDogId(114);
		dog.setUserId(12414);
		dog.setDogName("뽀삐");
		dog.setDogGender("female");
		dog.setDogType("말티즈");
		dog.setDogAge(72);
		dog.setDogWeight(3.4);
		dog.setDogNeutered(true);
		dog.setDogCharacter1("independent");
		dog.setDogCharacter2("active");
		dog.setDescription("활동적이고 순해요.");
		dog.setDogProfile("adsfasd.jpg");
		
		dogList.add(dog);
		
		Map<String, Object> resultMap = new HashMap<String, Object>();
		resultMap.put("result", SUCCESS);
		resultMap.put("dogs", dogList);
		return new ResponseEntity<Map<String, Object>>(resultMap, HttpStatus.OK);
	}

	@ApiOperation(value = "팔로워 리스트 조회", notes = "해당 강아지를 팔로우하는 유저 리스트를 조회합니다.")
	@GetMapping("/follow/follower")
	public ResponseEntity<?> getFollwerList(@RequestParam String dogId) {
		List<UserDTO> userList = new ArrayList<UserDTO>();

		UserDTO user = new UserDTO();
		
		user.setUserId(12414);
		user.setNickName("크림엄마");
		user.setUserAge(28);
		user.setUserGender("female");
		user.setAddress("서울특별시 동작구 흑석동");
		user.setRegionCode(11439);
		user.setSocial("naver");
		user.setRating(3.14);
		
		userList.add(user);
		
		Map<String, Object> resultMap = new HashMap<String, Object>();
		resultMap.put("result", SUCCESS);
		resultMap.put("users", userList);
		return new ResponseEntity<Map<String, Object>>(resultMap, HttpStatus.OK);
	}

	@ApiOperation(value = "팔로우", notes = "특정 강아지를 팔로우 처리합니다.")
	@PostMapping("/follow")
	public ResponseEntity<?> doFollow(
			@RequestParam String pageNo,
			@RequestParam String dogId
			) {
		Map<String, Object> resultMap = new HashMap<String, Object>();
		resultMap.put("result", SUCCESS);
		resultMap.put("msg", "좋아요를 반영했습니다.");
		return new ResponseEntity<Map<String, Object>>(resultMap, HttpStatus.OK);
	}

	@ApiOperation(value = "팔로우 취소", notes = "특정 강아지에게 했던 팔로우를 취소처리합니다.")
	@DeleteMapping("/follow")
	public ResponseEntity<?> cancelFollow(
			@RequestParam String pageNo,
			@RequestParam String dogId
			) {
		Map<String, Object> resultMap = new HashMap<String, Object>();
		resultMap.put("result", SUCCESS);
		resultMap.put("msg", "좋아요가 취소되었습니다.");
		return new ResponseEntity<Map<String, Object>>(resultMap, HttpStatus.OK);
	}
}
