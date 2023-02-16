package com.ssafy.togetdog.appointment.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.togetdog.appointment.model.dto.AppointmentAddDTO;
import com.ssafy.togetdog.appointment.model.dto.AppointmentListDTO;
import com.ssafy.togetdog.appointment.model.service.AppointmentService;
import com.ssafy.togetdog.dog.model.dto.DogRecommendListDTO;
import com.ssafy.togetdog.dog.model.entity.Dog;
import com.ssafy.togetdog.notify.model.service.NotifyService;
import com.ssafy.togetdog.user.model.service.JwtService;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/meeting")
@Api("Appointment API")
public class AppointmentRestController {
	
	/*ExceptionRestControllerAdvice에서 exception 처리를 하는 대상 controller입니다.*/
	private static final String SUCCESS = "success";
	private final Logger logger = LoggerFactory.getLogger(AppointmentRestController.class);
	
	private final AppointmentService appointmentService;
	private final JwtService jwtService;
	private final NotifyService notifyService;
		
	/***
	 * get confirmed appointment list
	 * @param token
	 * @return status 200, 401, 500
	 */
	@ApiOperation(value = "예정된 산책 리스트 조회", notes = "산책 예정된 약속 리스트, status가 confirmed인 약속 리스트를 반환합니다.")
	@GetMapping("/confirmed")
	public ResponseEntity<?> getConfirmedAppointments(
			@RequestHeader(value = "Authorization") @ApiParam(required = true) String token
			) {
		Map<String, Object> resultMap = new HashMap<String, Object>();
		
		jwtService.validateToken(token);
		long userId = jwtService.getUserId(token);
		List<AppointmentListDTO> appointemntInfo = appointmentService.findConfirmedAppointments(userId);
		
		resultMap.put("result", SUCCESS);
		resultMap.put("appointment", appointemntInfo);
		resultMap.put("msg", "산책 리스트가 반환되었습니다.");
		return new ResponseEntity<Map<String, Object>>(resultMap, HttpStatus.OK);
	}
	
	/***
	 * get wait appointment list
	 * @param token
	 * @return status 200, 401, 500
	 */
	@ApiOperation(value = "대기 중인 산책 리스트 조회", notes = "대기중인 약속 리스트, status가 wait인 약속 리스트를 반환합니다.")
	@GetMapping("/wait")
	public ResponseEntity<?> getWaitAppointments(
			@RequestHeader(value = "Authorization") @ApiParam(required = true) String token
			) {
		Map<String, Object> resultMap = new HashMap<String, Object>();
		
		jwtService.validateToken(token);
		long userId = jwtService.getUserId(token);
		List<AppointmentListDTO> appointemntInfo = appointmentService.findWaitAppointments(userId);
		
		resultMap.put("result", SUCCESS);
		resultMap.put("appointment", appointemntInfo);
		resultMap.put("msg", "산책 리스트가 반환되었습니다.");
		return new ResponseEntity<Map<String, Object>>(resultMap, HttpStatus.OK);
	}
	
	/***
	 * get cancelled or done appointment list
	 * @param token
	 * @return status 200, 401, 500
	 */
	@ApiOperation(value = "종료된 산책 리스트 조회", notes = "종료된 약속 리스트, status가 cancelled/done인 약속 리스트를 반환합니다.")
	@GetMapping("/done")
	public ResponseEntity<?> getDoneAppointments(
			@RequestHeader(value = "Authorization") @ApiParam(required = true) String token
			) {
		Map<String, Object> resultMap = new HashMap<String, Object>();
		
		jwtService.validateToken(token);
		long userId = jwtService.getUserId(token);
		List<AppointmentListDTO> appointemntInfo = appointmentService.findDoneAppointments(userId);
		
		resultMap.put("result", SUCCESS);
		resultMap.put("appointment", appointemntInfo);
		resultMap.put("msg", "산책 리스트가 반환되었습니다.");
		return new ResponseEntity<Map<String, Object>>(resultMap, HttpStatus.OK);
	}
	
	
	/***
	 * request appointment
	 * @param userId, myDogs, partnerDogs, date, place
	 * @return status 200, 401, 500
	 */
	@ApiOperation(value = "산책 약속 요청", notes = "산책 요청을 보냄")
	@PostMapping
	public ResponseEntity<?> requestAppointment(@RequestHeader(value = "Authorization") @ApiParam(required = true) String token,
			@RequestBody @ApiParam(required = true) AppointmentAddDTO registDTO) {
		Map<String, Object> resultMap = new HashMap<String, Object>();
		
		jwtService.validateToken(token);
		Long myId = jwtService.getUserId(token);
//		Long myId = 1L; 
		
		logger.info("=================== registDto : {}", registDTO);
		
		List<Dog> myDogList = new ArrayList<Dog>();
		for (Long pDog : registDTO.getSentDogs()) {
			Dog dog = new Dog();
			dog.setDogId(pDog);
			myDogList.add(dog);
		}
		List<Dog> partnerDogList = new ArrayList<Dog>();
		for (Long pDog : registDTO.getReceivedDogs()) {
			Dog dog = new Dog();
			dog.setDogId(pDog);
			partnerDogList.add(dog);
		}
		if(myDogList.size() <= 0 || partnerDogList.size() <= 0) {
			resultMap.put("result", "fail");
			resultMap.put("msg", "강아지가 비어있습니다!");
			return new ResponseEntity<Map<String, Object>>(resultMap, HttpStatus.BAD_REQUEST);
		}
		appointmentService.addAppointment(myId, registDTO.getReceivedUserId(), myDogList, partnerDogList, registDTO.getDateTime(), registDTO.getPlace());
//		appointmentService.addAppointment(myId, 1L, myDogList, partnerDogList, now, "멀티캠퍼스");
		
		resultMap.put("result", SUCCESS);
		resultMap.put("msg", "산책 요청이 발송되었습니다!");
		return new ResponseEntity<Map<String, Object>>(resultMap, HttpStatus.OK);
	}
	
	/***
	 * cancel appointment
	 * @param token, roomId
	 * @return status 200, 401, 500
	 */
	@ApiOperation(value = "산책 취소", notes = "선택된 산책 요청 취소")
	@PutMapping("/cancel")
	public ResponseEntity<?> cancelAppointment(@RequestHeader(value = "Authorization") @ApiParam(required = true) String token,
			@RequestParam(value="appointmentId") @ApiParam(required = true) long roomId) {
		Map<String, Object> resultMap = new HashMap<String, Object>();
		
		jwtService.validateToken(token);
		appointmentService.updateAppointment(roomId, "cancelled");
		
		// 상대방에게 취소 알림 전송
		notifyService.insertCancelNotify(appointmentService.findAppointmentById(roomId), jwtService.getUserId(token));
		
		resultMap.put("result", SUCCESS);
		resultMap.put("msg", "산책 요청이 취소되었습니다.");
		return new ResponseEntity<Map<String, Object>>(resultMap, HttpStatus.OK);
	}
	
	/***
	 * accept appointment
	 * @param token, roomId
	 * @return status 200, 401, 500
	 */
	@ApiOperation(value = "산책 수락", notes = "선택된 산책 요청 수락")
	@PutMapping("/accept")
	public ResponseEntity<?> acceptAppointment(@RequestHeader(value = "Authorization") @ApiParam(required = true) String token,
			@RequestParam(value="appointmentId") @ApiParam(required = true) long roomId) {
		Map<String, Object> resultMap = new HashMap<String, Object>();
		
		jwtService.validateToken(token);
		appointmentService.updateAppointment(roomId, "confirmed");
		
		resultMap.put("result", SUCCESS);
		resultMap.put("msg", "산책 요청이 수락되었습니다.");
		return new ResponseEntity<Map<String, Object>>(resultMap, HttpStatus.OK);
	}
	
	/***
	 * reject appointment
	 * @param token, roomId
	 * @return status 200, 401, 500
	 */
	@ApiOperation(value = "산책 거절", notes = "선택된 산책 요청 거절")
	@DeleteMapping
	public ResponseEntity<?> rejectAppointment(@RequestHeader(value = "Authorization") @ApiParam(required = true) String token,
			@RequestParam(value="appointmentId") @ApiParam(required = true) long roomId) {
		Map<String, Object> resultMap = new HashMap<String, Object>();
		
		jwtService.validateToken(token);
		appointmentService.deleteAppointment(roomId);
		
		resultMap.put("result", SUCCESS);
		resultMap.put("msg", "산책 요청이 거절되었습니다.");
		return new ResponseEntity<Map<String, Object>>(resultMap, HttpStatus.OK);
	}
	
	/***
	 * rate User
	 * @param token, roomId
	 * @return status 200, 401, 500
	 */
	@ApiOperation(value = "산책 별점", notes = "산책한 상대에게 산책 별점 부여")
	@PostMapping("/rating")
	public ResponseEntity<?> ratingUser(@RequestHeader(value = "Authorization") @ApiParam(required = true) String token,
			@RequestParam(value="appointmentId") @ApiParam(required = true) long roomId,
			@RequestParam(value="rating") @ApiParam(required = true) int rating) {
		Map<String, Object> resultMap = new HashMap<String, Object>();
		
		jwtService.validateToken(token);
		long userId = jwtService.getUserId(token);
//		long userId = 1L;
		appointmentService.rateAppointment(userId, roomId, rating);
		
		resultMap.put("result", SUCCESS);
		resultMap.put("msg", "별점이 부여되었습니다.");
		return new ResponseEntity<Map<String, Object>>(resultMap, HttpStatus.OK);
	}
	
	/***	
	 * recommend friends for a dog 
	 * @param token, roomId
	 * @return status 200, 401, 500
	 */
	@ApiOperation(value = "산책 친구 찾기", notes = "같이 산책할만한 친구 추천")
	@GetMapping("/{dogId}")
	public ResponseEntity<?> findFreindsByRegion(@RequestHeader(value = "Authorization") @ApiParam(required = true) String token,
			@PathVariable(value = "dogId") long dogId) {
		Map<String, Object> resultMap = new HashMap<String, Object>();
		
//		appointmentService.test();
		
		long userId = jwtService.getUserId(token);
//		long userId = 41L;
		List<DogRecommendListDTO> dogList = appointmentService.recommendFriendsForDog(userId, dogId);
		
		resultMap.put("result", SUCCESS);
		resultMap.put("dogs", dogList);
		resultMap.put("msg", "동네 산책친구 리스트가 반환되었습니다.");
		return new ResponseEntity<Map<String, Object>>(resultMap, HttpStatus.OK);
	}
	
	/***
	 * recommend friends
	 * @param token, roomId
	 * @return status 200, 401, 500
	 */
	@ApiOperation(value = "전체 친구 찾기", notes = "전체 강아지 중에서 같이 산책할만한 친구 추천")
	@GetMapping("/all")
	public ResponseEntity<?> findFreinds(@RequestHeader(value = "Authorization") @ApiParam(required = true) String token) {
		Map<String, Object> resultMap = new HashMap<String, Object>();
		
		long userId = jwtService.getUserId(token);
//		long userId = 4L;
		List<DogRecommendListDTO> dogList = appointmentService.recommendFriendsForDog(userId);
		
		resultMap.put("result", SUCCESS);
		resultMap.put("dogs", dogList);
		resultMap.put("msg", "전체 산책친구 리스트가 반환되었습니다.");
		return new ResponseEntity<Map<String, Object>>(resultMap, HttpStatus.OK);
	}
}
