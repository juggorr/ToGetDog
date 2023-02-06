package com.ssafy.togetdog.board.controller;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.xml.crypto.dsig.keyinfo.PGPData;

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
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.togetdog.board.model.dto.BoardDTO;
import com.ssafy.togetdog.board.model.dto.CommentDTO;
import com.ssafy.togetdog.board.model.dto.LikeDTO;
import com.ssafy.togetdog.board.model.dto.BoardShowDTO;
import com.ssafy.togetdog.board.model.service.BoardService;
import com.ssafy.togetdog.board.model.service.CommentService;
import com.ssafy.togetdog.board.model.service.LikeService;
import com.ssafy.togetdog.dog.model.dto.DogInfoForUserDTO;
import com.ssafy.togetdog.dog.model.dto.DogInfoRespDTO;
import com.ssafy.togetdog.dog.model.service.DogService;
import com.ssafy.togetdog.follow.model.service.FollowService;
import com.ssafy.togetdog.user.model.dto.UserIncludesDogsDTO;
import com.ssafy.togetdog.user.model.dto.UserInfoRespDTO;
import com.ssafy.togetdog.user.model.service.JwtService;
import com.ssafy.togetdog.user.model.service.UserService;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import io.swagger.v3.oas.annotations.parameters.RequestBody;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
@Api("Board API")
public class BoardRestController {
	
	/*ExceptionRestControllerAdvice에서 exception 처리를 하는 대상 controller입니다.*/
	private static final String SUCCESS = "success";
	private final Logger logger = LoggerFactory.getLogger(BoardRestController.class);
	
	private final UserService userService;
	private final DogService dogService;
	private final BoardService boardService;
	private final CommentService commentService;
	private final LikeService likeService;
	private final FollowService followService;
	private final JwtService jwtService;
	
	/***
	 * get home
	 * @param token, pageNo
	 * @return status 200, 401, 500
	 */
	// 모든 게시물 다 가져오는 상황
	@ApiOperation(value = "홈화면 게시글 리스트", notes = "홈화면에서 구독한 개들의 게시글 표시")
	@GetMapping("/home")
	public ResponseEntity<?> getBoardListForHome(@RequestHeader(value = "Authorization") @ApiParam(required = true) String token,
			@RequestBody int myId, @RequestParam(value = "pageNo") int pageNo){
		Map<String, Object> resultMap = new HashMap<String, Object>();
		jwtService.validateToken(token);
//		List<DogInfoRespDTO> followList = followService.getFollowingList(myId);
//		List<Long> dogIds = new ArrayList<Long>();
//		for (DogInfoRespDTO follow : followList) {
//			dogIds.add(follow.getDogId());
//		}
//		Page<BoardDTO> boardList = boardService.getAllByDogIds(dogIds, pageNo - 1);
		Page<BoardDTO> boardList = boardService.findAll(pageNo - 1);
		
		resultMap.put("result", SUCCESS);
		resultMap.put("boardList", boardList.getContent());
		resultMap.put("msg", "홈 화면입니다.");
		return new ResponseEntity<Map<String, Object>>(resultMap, HttpStatus.OK);
	}
	
	/***
	 * get feed
	 * @param dogId, pageNo
	 * @return status 200, 401, 500
	 */
	@ApiOperation(value = "피드 조회", notes = "피드 상단은 강아지 정보, 피드 하단은 게시글 리스트")
	@GetMapping("/feed/{userId}")
	public ResponseEntity<?> getFeed(@RequestHeader(value = "Authorization") @ApiParam(required = true) String token,
			@PathVariable long userId, @RequestParam(value = "pageNo") int pageNo){
		Map<String, Object> resultMap = new HashMap<String, Object>();
		logger.info("return boardList : {}", jwtService.getUserId(token));
		jwtService.validateToken(token);
		logger.info("return boardList : {}", jwtService.getUserId(token));
		
		UserInfoRespDTO userInfo = userService.getUserInfo(Long.toString(userId));
		UserIncludesDogsDTO userDTO = new UserIncludesDogsDTO(userInfo);
		userDTO.setUserId(userId);
		List<DogInfoForUserDTO> dogList = dogService.findDogsByUserId(userId);
		logger.debug("return dog info : {}", dogList);
		for (DogInfoForUserDTO dog : dogList) {
			long dogId = dog.getDogId();
			dog.setDogFollwerCnt(followService.getFollowers(dogId));
			//토큰 값 해결되면 토큰 값 이용해서 넘겨야함
			dog.setFollowing(followService.isFollowing(jwtService.getUserId(token), dogId));
		}
		userDTO.setDogs(dogList);
		userDTO.setFollowCnt(followService.getFollowings(userId));

		logger.debug("return User info : {}", userInfo);
		if(dogList.size() > 0) {
			Page<BoardDTO> boardList = boardService.getAllByDogId(dogList.get(0).getDogId(), pageNo - 1);
			logger.info("return boardList : {}", boardList);
			resultMap.put("feed", boardList.getContent());
		} else {
			resultMap.put("feed", "[]");
		}
		
		resultMap.put("result", SUCCESS);
		resultMap.put("user", userDTO);
		resultMap.put("msg", "피드가 반환되었습니다.");
		return new ResponseEntity<Map<String, Object>>(resultMap, HttpStatus.OK);
	}
	
	/***
	 * get boardList
	 * @param dogId, pageNo
	 * @return status 200, 401, 500
	 */
	@ApiOperation(value = "피드 하단 게시물 리스트", notes = "피드 하단에 보일 게시글 리스트를 반환")
	@GetMapping("/list/{dogId}")
	public ResponseEntity<?> getBoardListByDogId(@RequestHeader(value = "Authorization") @ApiParam(required = true) String token,
			@PathVariable long dogId, @RequestParam(value = "pageNo") int pageNo){
		Map<String, Object> resultMap = new HashMap<String, Object>();
		jwtService.validateToken(token);
		
		Page<BoardDTO> boardList = boardService.getAllByDogId(dogId, pageNo - 1);
		logger.info("return boardList : {}", boardList);
		
		resultMap.put("result", SUCCESS);
		resultMap.put("boardList", boardList.getContent());
		resultMap.put("msg", "게시물 리스트가 반환되었습니다.");
		return new ResponseEntity<Map<String, Object>>(resultMap, HttpStatus.OK);
	}
	
	/***
	 * get board
	 * @param boardId
	 * @return status 200, 401, 500
	 */
	@ApiOperation(value = "게시글 단건 가져오기", notes = "boardId에 해당하는 게시글 반환")
	@GetMapping("/{boardId}")
	public ResponseEntity<?> getBoard(@RequestHeader(value = "Authorization") @ApiParam(required = true) String token,
			@PathVariable long boardId){
		Map<String, Object> resultMap = new HashMap<String, Object>();
		jwtService.validateToken(token);
		
		BoardShowDTO boardDto = boardService.getOne(boardId);
		logger.info("retrun found board : {}", boardDto);
		boardDto.setComments(commentService.findAllCommentsInBoard(boardId));
		logger.info("retrun found board : {}", boardDto);
		
		resultMap.put("result", SUCCESS);
		resultMap.put("board", boardDto);
		resultMap.put("msg", "게시물이 반환되었습니다.");
		return new ResponseEntity<Map<String, Object>>(resultMap, HttpStatus.OK);
	}
	
	/***
	 * write board
	 * @param boardDTO
	 * @return status 200, 401, 500
	 */
	@ApiOperation(value = "게시글 등록", notes = "게시글을 등록함")
	@PostMapping("/")
	public ResponseEntity<?> addBoard(@RequestHeader(value = "Authorization") @ApiParam(required = true) String token,
			@RequestBody BoardDTO boardDto) {
		Map<String, Object> resultMap = new HashMap<String, Object>();
		jwtService.validateToken(token);
		
		resultMap.put("result", SUCCESS);
		resultMap.put("boardId", boardService.save(boardDto));
		resultMap.put("msg", "게시물이 등록되었습니다.");
		return new ResponseEntity<Map<String, Object>>(resultMap, HttpStatus.OK);
	}
	
	/***
	 * update board
	 * @param boardId, content
	 * @return status 200, 401, 500
	 */
	@ApiOperation(value = "게시물 수정", notes = "선택된 단건 게시글을 수정")
	@PutMapping("/")
	public ResponseEntity<?> modifyBoard(@RequestHeader(value = "Authorization") @ApiParam(required = true) String token,
			@RequestBody BoardDTO boardDto) {
		Map<String, Object> resultMap = new HashMap<String, Object>();
		jwtService.validateToken(token);
		
		BoardDTO newBoardDto = boardService.update(boardDto);
		
		resultMap.put("result", SUCCESS);
		resultMap.put("board", newBoardDto);
		resultMap.put("msg", "게시물이 수정되었습니다.");
		return new ResponseEntity<Map<String, Object>>(resultMap, HttpStatus.OK);
	}
	
	/***
	 * delete board
	 * @param boardId
	 * @return status 200, 401, 500
	 */
	@ApiOperation(value = "게시물 삭제", notes = "선택된 단건 게시글을 삭제")
	@DeleteMapping("/")
	public ResponseEntity<?> deleteBoard(@RequestHeader(value = "Authorization") @ApiParam(required = true) String token,
			@RequestBody BoardDTO boardDto) {
		Map<String, Object> resultMap = new HashMap<String, Object>();
		jwtService.validateToken(token);
		
		boardService.delete(boardDto);
		
		resultMap.put("result", SUCCESS);
		resultMap.put("msg", "게시물이 삭제되었습니다.");
		return new ResponseEntity<Map<String, Object>>(resultMap, HttpStatus.OK);
	}
	
	/***
	 * write comment on a board
	 * @param boardId
	 * @return status 200, 401, 500
	 */
	@ApiOperation(value = "댓글 등록", notes = "게시글애 댓글을 등록함")
	@PostMapping("/comment")
	public ResponseEntity<?> addComment(@RequestHeader(value = "Authorization") @ApiParam(required = true) String token,
			@RequestBody CommentDTO commentDto) {
		Map<String, Object> resultMap = new HashMap<String, Object>();
		jwtService.validateToken(token);
		commentService.save(commentDto);
		List<CommentDTO> comments = commentService.findAllCommentsInBoard(commentDto.getBoardId());
		
		resultMap.put("result", SUCCESS);
		resultMap.put("comments", comments);
		resultMap.put("msg", "댓글이 등록되었습니다.");
		return new ResponseEntity<Map<String, Object>>(resultMap, HttpStatus.OK);
	}
	
	/***
	 * delete comment on a board
	 * @param boardId
	 * @return status 200, 401, 500
	 */
	@ApiOperation(value = "댓글 삭제", notes = "선택된 단건 댓글을 삭제")
	@DeleteMapping("/comment")
	public ResponseEntity<?> deleteComment(@RequestHeader(value = "Authorization") @ApiParam(required = true) String token,
			@RequestBody CommentDTO commentDto) {
		Map<String, Object> resultMap = new HashMap<String, Object>();
		jwtService.validateToken(token);
		
		commentService.delete(commentDto.getCommentId());
		List<CommentDTO> comments = commentService.findAllCommentsInBoard(commentDto.getBoardId());
		
		resultMap.put("result", SUCCESS);
		resultMap.put("comments", comments);
		resultMap.put("msg", "댓글이 삭제되었습니다.");
		return new ResponseEntity<Map<String, Object>>(resultMap, HttpStatus.OK);
	}
	
	/***
	 * like board
	 * @param boardId
	 * @return status 200, 401, 500
	 */
	@ApiOperation(value = "좋아요", notes = "게시글에 좋아요")
	@PostMapping("/like")
	public ResponseEntity<?> addLike(@RequestHeader(value = "Authorization") @ApiParam(required = true) String token,
			@RequestBody LikeDTO likeDTO) {
		Map<String, Object> resultMap = new HashMap<String, Object>();
		jwtService.validateToken(token);
		
		likeService.save(likeDTO);
		
		resultMap.put("result", SUCCESS);
		resultMap.put("likeCnt", likeService.getLikes(likeDTO.getBoardId()));
		resultMap.put("msg", "게시글 좋아요!");
		return new ResponseEntity<Map<String, Object>>(resultMap, HttpStatus.OK);
	}
	
	/***
	 * unlike board
	 * @param boardId
	 * @return status 200, 401, 500
	 */
	@ApiOperation(value = "좋아요  취소", notes = "게시글에 좋아요 취소")
	@DeleteMapping("/like")
	public ResponseEntity<?> deleteLike(@RequestHeader(value = "Authorization") @ApiParam(required = true) String token,
			@RequestBody LikeDTO likeDTO) {
		Map<String, Object> resultMap = new HashMap<String, Object>();
		jwtService.validateToken(token);
		
		likeService.delete(likeDTO);

		resultMap.put("result", SUCCESS);
		resultMap.put("likeCnt", likeService.getLikes(likeDTO.getBoardId()));
		resultMap.put("msg", "게시글 좋아요 취소!");
		return new ResponseEntity<Map<String, Object>>(resultMap, HttpStatus.OK);
	}
	
}
