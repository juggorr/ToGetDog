package com.ssafy.togetdog.appointment.controller;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.togetdog.appointment.model.dto.AppointmentInfoRespDTO;
import com.ssafy.togetdog.appointment.model.service.AppointmentService;
import com.ssafy.togetdog.board.model.dto.BoardDTO;
import com.ssafy.togetdog.board.model.dto.BoardShowDTO;
import com.ssafy.togetdog.board.model.dto.CommentDTO;
import com.ssafy.togetdog.board.model.dto.LikeDTO;
import com.ssafy.togetdog.board.model.service.BoardService;
import com.ssafy.togetdog.board.model.service.CommentService;
import com.ssafy.togetdog.board.model.service.LikeService;
import com.ssafy.togetdog.dog.model.dto.DogInfoForUserDTO;
import com.ssafy.togetdog.dog.model.entity.Dog;
import com.ssafy.togetdog.dog.model.service.DogService;
import com.ssafy.togetdog.follow.model.service.FollowService;
import com.ssafy.togetdog.user.model.dto.UserIncludesDogsDTO;
import com.ssafy.togetdog.user.model.dto.UserInfoRespDTO;
import com.ssafy.togetdog.user.model.service.UserService;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.v3.oas.annotations.parameters.RequestBody;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/meeting")
@Api("Board API")
public class AppointmentRestController {
	
	/*ExceptionRestControllerAdvice에서 exception 처리를 하는 대상 controller입니다.*/
	private static final String SUCCESS = "success";
	private final Logger logger = LoggerFactory.getLogger(AppointmentRestController.class);
	
//	private final UserService userService;
//	private final DogService dogService;
//	private final BoardService boardService;
//	private final CommentService commentService;
//	private final LikeService likeService;
//	private final FollowService followService;
	private final AppointmentService appointmentService;
		
	/***
	 * get appointment list
	 * @param dogId, pageNo
	 * @return status 200, 401, 500
	 */
	@ApiOperation(value = "산책 리스트 조회", notes = "산책 예정된 약속/대기중 요청/종료된 약속 리스트, status가 confirmed/sent, received/cancelled, done")
	@GetMapping("/")
	public ResponseEntity<?> getFeed(@RequestBody int userId){ // 추후 토큰으로 바꿔야함
		Map<String, Object> resultMap = new HashMap<String, Object>();
		
		List<AppointmentInfoRespDTO> appointemntInfo = appointmentService.findAllByUserId(userId);
		
		
		resultMap.put("result", SUCCESS);
//		resultMap.put("user", userDTO);
		resultMap.put("msg", "산책 리스트가 반환되었습니다.");
		return new ResponseEntity<Map<String, Object>>(resultMap, HttpStatus.OK);
	}
	
	/***
	 * request appointment
	 * @param userId, myDogs, partnerDogs, date, place
	 * @return status 200, 401, 500
	 */
	@ApiOperation(value = "게시글 등록", notes = "게시글을 등록함")
	@PostMapping("/")
	public ResponseEntity<?> requestAppointment(/*@RequestBody long userId,*/ @RequestParam List<Long> myDogs,
			@RequestParam List<Long> partnerDogs/*, @RequestBody LocalDateTime date, @RequestBody String place*/) {
		Map<String, Object> resultMap = new HashMap<String, Object>();
		Long myId = 4L;
//		Long myId = jwt;
		LocalDateTime now = LocalDateTime.now();
		
		logger.info("=================== mydog : {}", myDogs);
		logger.info("=================== pdog : {}", partnerDogs);
		
		List<Dog> myDogList = new ArrayList<Dog>();
		for (Long pDog : myDogs) {
			Dog dog = new Dog();
			dog.setDogId(pDog);
			myDogList.add(dog);
		}
		List<Dog> partnerDogList = new ArrayList<Dog>();
		for (Long pDog : partnerDogs) {
			Dog dog = new Dog();
			dog.setDogId(pDog);
			partnerDogList.add(dog);
		}
//		appointmentService.addAppointment(myId, userId, myDogs, partnerDogs, date, place);
		appointmentService.addAppointment(myId, 1L, myDogList, partnerDogList, now, "멀티캠퍼스");
		
		resultMap.put("result", SUCCESS);
//		resultMap.put("boardId", boardService.save(boardDto));
		resultMap.put("msg", "게시물이 등록되었습니다.");
		return new ResponseEntity<Map<String, Object>>(resultMap, HttpStatus.OK);
	}
	
//	/***
//	 * update board
//	 * @param boardId, content
//	 * @return status 200, 401, 500
//	 */
//	@ApiOperation(value = "게시물 수정", notes = "선택된 단건 게시글을 수정")
//	@PutMapping("/")
//	public ResponseEntity<?> modifyBoard(@RequestBody BoardDTO boardDto) {
//		Map<String, Object> resultMap = new HashMap<String, Object>();
//		
//		BoardDTO newBoardDto = boardService.update(boardDto);
//		
//		resultMap.put("result", SUCCESS);
//		resultMap.put("board", newBoardDto);
//		resultMap.put("msg", "게시물이 수정되었습니다.");
//		return new ResponseEntity<Map<String, Object>>(resultMap, HttpStatus.OK);
//	}
//	
//	/***
//	 * delete board
//	 * @param boardId
//	 * @return status 200, 401, 500
//	 */
//	@ApiOperation(value = "게시물 삭제", notes = "선택된 단건 게시글을 삭제")
//	@DeleteMapping("/")
//	public ResponseEntity<?> deleteBoard(@RequestBody BoardDTO boardDto) {
//		Map<String, Object> resultMap = new HashMap<String, Object>();
//		
//		boardService.delete(boardDto);
//		
//		resultMap.put("result", SUCCESS);
//		resultMap.put("msg", "게시물이 삭제되었습니다.");
//		return new ResponseEntity<Map<String, Object>>(resultMap, HttpStatus.OK);
//	}
//	
//	/***
//	 * write comment on a board
//	 * @param boardId
//	 * @return status 200, 401, 500
//	 */
//	@ApiOperation(value = "댓글 등록", notes = "게시글애 댓글을 등록함")
//	@PostMapping("/comment")
//	public ResponseEntity<?> addComment(@RequestBody CommentDTO commentDto) {
//		Map<String, Object> resultMap = new HashMap<String, Object>();
//		commentService.save(commentDto);
//		List<CommentDTO> comments = commentService.findAllCommentsInBoard(commentDto.getBoardId());
//		
//		resultMap.put("result", SUCCESS);
//		resultMap.put("comments", comments);
//		resultMap.put("msg", "댓글이 등록되었습니다.");
//		return new ResponseEntity<Map<String, Object>>(resultMap, HttpStatus.OK);
//	}
//	
//	/***
//	 * delete comment on a board
//	 * @param boardId
//	 * @return status 200, 401, 500
//	 */
//	@ApiOperation(value = "댓글 삭제", notes = "선택된 단건 댓글을 삭제")
//	@DeleteMapping("/comment")
//	public ResponseEntity<?> deleteComment(@RequestBody CommentDTO commentDto) {
//		Map<String, Object> resultMap = new HashMap<String, Object>();
//		
//		commentService.delete(commentDto.getCommentId());
//		List<CommentDTO> comments = commentService.findAllCommentsInBoard(commentDto.getBoardId());
//		
//		resultMap.put("result", SUCCESS);
//		resultMap.put("comments", comments);
//		resultMap.put("msg", "댓글이 삭제되었습니다.");
//		return new ResponseEntity<Map<String, Object>>(resultMap, HttpStatus.OK);
//	}
//	
//	/***
//	 * like board
//	 * @param boardId
//	 * @return status 200, 401, 500
//	 */
//	@ApiOperation(value = "좋아요", notes = "게시글에 좋아요")
//	@PostMapping("/like")
//	public ResponseEntity<?> addLike(@RequestBody LikeDTO likeDTO) {
//		Map<String, Object> resultMap = new HashMap<String, Object>();
//		
//		likeService.save(likeDTO);
//		
//		resultMap.put("result", SUCCESS);
//		resultMap.put("likeCnt", likeService.getLikes(likeDTO.getBoardId()));
//		resultMap.put("msg", "게시글 좋아요!");
//		return new ResponseEntity<Map<String, Object>>(resultMap, HttpStatus.OK);
//	}
//	
//	/***
//	 * unlike board
//	 * @param boardId
//	 * @return status 200, 401, 500
//	 */
//	@ApiOperation(value = "좋아요  취소", notes = "게시글에 좋아요 취소")
//	@DeleteMapping("/like")
//	public ResponseEntity<?> deleteLike(@RequestBody LikeDTO likeDTO) {
//		Map<String, Object> resultMap = new HashMap<String, Object>();
//		
//		likeService.delete(likeDTO);
//
//		resultMap.put("result", SUCCESS);
//		resultMap.put("likeCnt", likeService.getLikes(likeDTO.getBoardId()));
//		resultMap.put("msg", "게시글 좋아요 취소!");
//		return new ResponseEntity<Map<String, Object>>(resultMap, HttpStatus.OK);
//	}
	
}
