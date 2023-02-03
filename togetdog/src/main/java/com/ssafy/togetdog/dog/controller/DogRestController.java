package com.ssafy.togetdog.dog.controller;

import java.io.IOException;
import java.util.HashMap;
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
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.ssafy.togetdog.dog.model.dto.DogRegistParamDTO;
import com.ssafy.togetdog.dog.model.dto.DogUpdateParamDTO;
import com.ssafy.togetdog.dog.model.service.DogService;
import com.ssafy.togetdog.user.controller.UserRestController;
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
@RequestMapping("/api/dog")
@Api("DOG API")
public class DogRestController {

	private static final String SUCCESS = "success";
	private final Logger logger = LoggerFactory.getLogger(UserRestController.class);
	
	private final DogService dogService;
	private final JwtService jwtService;
	private final UserService userService;

	/***
	 * Dog information lookup
	 * @param dogid
	 * @return status 200, 400
	 */
	@ApiOperation(value = "강아지 정보 조회", notes = "해당 강아지의 정보를 조회합니다.")
	@GetMapping("/{dogid}")
	public ResponseEntity<?> getDogInfo(
			@PathVariable(value = "dogid") @ApiParam(required = true) String dogid
			) {
		
		logger.info("GetDogInfo parameter : {}", dogid);
		Map<String, Object> resultMap = new HashMap<String, Object>();
		
		resultMap.put("result", SUCCESS);
		resultMap.put("dog", dogService.getDogInfo(dogid));
		return new ResponseEntity<Map<String, Object>>(resultMap, HttpStatus.OK);
	}
	
	/***
	 * Dog information Registration
	 * @param dogInfo
	 * @return 200
	 * @throws IOException 
	 * @throws IllegalStateException 
	 */
	@ApiOperation(value = "강아지 정보 등록", notes = "새로운 강아지를 등록합니다.")
	@PostMapping
	public ResponseEntity<?> registDog(
			//@RequestHeader(value = "Authorization") @ApiParam(required = true) String token,
			@RequestPart(value="dog") @ApiParam(required = true) DogRegistParamDTO dogDTO,
			@RequestPart(value="dogProfile") @ApiParam(required = true) MultipartFile dogImage
			) throws IllegalStateException, IOException {
		
		logger.info("DogInfo registration parameter : {} {}", dogDTO, dogImage.getOriginalFilename());
		Map<String, Object> resultMap = new HashMap<String, Object>();
		
		//jwtService.validateToken(token);
		//long userId = jwtService.getUserId(token);
		User user = userService.findUserByUserId(21);
		dogService.registDog(user, dogDTO, dogImage);
		return new ResponseEntity<Map<String, Object>>(resultMap, HttpStatus.OK);
	}
	
	/***
	 * 
	 * @param dogid
	 * @return
	 */
	@ApiOperation(value = "강아지 정보 삭제", notes = "해당 강아지를 삭제합니다.")
	@DeleteMapping("/{dogid}")
	public ResponseEntity<?> deleteDog(
			@RequestHeader(value = "Authorization") @ApiParam(required = true) String token,
			@PathVariable @ApiParam(required = true) String dogid
			) {
		
		logger.info("GetDogInfo parameter : {}", dogid);
		Map<String, Object> resultMap = new HashMap<String, Object>();
		HttpStatus status = null;
		
		return new ResponseEntity<Map<String, Object>>(resultMap, status);
	}

	/***
	 * 
	 * @param dogInfo
	 * @return
	 */
	@ApiOperation(value = "강아지 정보 수정", notes = "해당 강아지를 수정합니다.")
	@PutMapping
	public ResponseEntity<?> updateDog(
			@RequestHeader(value = "Authorization") @ApiParam(required = true) String token,
			@RequestBody DogUpdateParamDTO dogDTO
			) {
		
		logger.info("GetDogInfo parameter : {}", dogDTO);
		Map<String, Object> resultMap = new HashMap<String, Object>();
		HttpStatus status = null;
		
		return new ResponseEntity<Map<String, Object>>(resultMap, status);
	}
}
