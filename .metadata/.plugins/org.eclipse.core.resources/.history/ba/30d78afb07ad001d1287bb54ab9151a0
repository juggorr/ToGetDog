package com.ssafy.togetdog.follow.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.togetdog.dog.model.dto.DogInfoRespDTO;
import com.ssafy.togetdog.dog.model.service.DogService;
import com.ssafy.togetdog.follow.model.dto.FollowDTO;
import com.ssafy.togetdog.follow.model.dto.FollowerInfoRespDTO;
import com.ssafy.togetdog.follow.model.service.FollowService;
import com.ssafy.togetdog.notify.model.service.NotifyService;
import com.ssafy.togetdog.user.model.entity.User;
import com.ssafy.togetdog.user.model.service.JwtService;
import com.ssafy.togetdog.user.model.service.UserService;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import io.swagger.v3.oas.annotations.parameters.RequestBody;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/follow")
@Api("Follow API")
public class FollowRestController {

	/* ExceptionRestControllerAdvice에서 exception 처리를 하는 대상 controller입니다. */
	private static final String SUCCESS = "success";
	private final Logger logger = LoggerFactory.getLogger(FollowRestController.class);

	@Autowired
	private final FollowService followService;
	private final NotifyService notifyService;
	private final UserService userService;
	private final JwtService jwtService;
	private final DogService dogService;

	/***
	 * get following list
	 * 
	 * @param userId
	 * @return status 200, 401, 500
	 */
	@ApiOperation(value = "팔로잉 조회", notes = "내가 팔로우 하는 강아지 리스트 조회")
	@GetMapping("/following")
	public ResponseEntity<?> getFollowingList(@RequestBody long userId) {
		Map<String, Object> resultMap = new HashMap<String, Object>();

		List<DogInfoRespDTO> dogInfo = followService.getFollowingList(userId);

		resultMap.put("result", SUCCESS);
		resultMap.put("dogs", dogInfo);
		resultMap.put("msg", "팔로워 리스트가 반환되었습니다.");
		return new ResponseEntity<Map<String, Object>>(resultMap, HttpStatus.OK);
	}

	/***
	 * get follower list
	 * 
	 * @param dogId
	 * @return status 200, 401, 500
	 */
	@ApiOperation(value = "팔로워 조회", notes = "해당 강아지를 팔로우하는 유저 조회")
	@GetMapping("/follower")
	public ResponseEntity<?> getFollwerList(
			@RequestBody long dogId
			) {
		Map<String, Object> resultMap = new HashMap<String, Object>();

		List<FollowerInfoRespDTO> userInfo = followService.getFollowerList(dogId);

		resultMap.put("result", SUCCESS);
		resultMap.put("users", userInfo);
		resultMap.put("msg", "팔로워 리스트가 반환되었습니다.");
		return new ResponseEntity<Map<String, Object>>(resultMap, HttpStatus.OK);
	}

	/***
	 * follow dog
	 * 
	 * @param boardId
	 * @return status 200, 401, 500
	 */
	@ApiOperation(value = "팔로우", notes = "강아지를 팔로우함")
	@PostMapping
	public ResponseEntity<?> addFollow(
			@RequestHeader(value = "Authorization") @ApiParam(required = true) String token,
			@RequestBody FollowDTO followDTO) {
		Map<String, Object> resultMap = new HashMap<String, Object>();

		followService.save(followDTO);
		logger.info("==============addFollow : {}", followDTO);
		
		// notify 전송
		User sender = userService.findUserByUserId(jwtService.getUserId(token));
		User receiver = dogService.findDogByDogId(followDTO.getDogId()).getUser();
		notifyService.insertFollowNotify(receiver, sender, followDTO.getDogId());

		resultMap.put("result", SUCCESS);
		resultMap.put("msg", "강아지 팔로우!");
		return new ResponseEntity<Map<String, Object>>(resultMap, HttpStatus.OK);
	}

	/***
	 * unfollow dog
	 * 
	 * @param boardId
	 * @return status 200, 401, 500
	 */
	@ApiOperation(value = "팔로우 취소", notes = "강아지를 팔로우 취소함")
	@DeleteMapping
	public ResponseEntity<?> deleteFollow(@RequestBody FollowDTO followDTO) {
		Map<String, Object> resultMap = new HashMap<String, Object>();

		followService.delete(followDTO);
		logger.info("==============deleteFollow : {}", followDTO);

		resultMap.put("result", SUCCESS);
		resultMap.put("msg", "강아지 팔로우 취소!");
		return new ResponseEntity<Map<String, Object>>(resultMap, HttpStatus.OK);
	}

}
