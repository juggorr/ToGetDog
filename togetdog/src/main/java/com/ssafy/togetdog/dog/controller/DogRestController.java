package com.ssafy.togetdog.dog.controller;

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

import com.ssafy.togetdog.dog.model.dto.DogInfoRespDTO;
import com.ssafy.togetdog.dog.model.dto.DogRegistParamDTO;
import com.ssafy.togetdog.dog.model.dto.DogUpdateParamDTO;
import com.ssafy.togetdog.dog.model.entity.Dog;
import com.ssafy.togetdog.dog.model.service.DogService;
import com.ssafy.togetdog.user.controller.UserRestController;
import com.ssafy.togetdog.user.model.service.JwtService;

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
	private static final String FAIL = "fail";
	private final Logger logger = LoggerFactory.getLogger(UserRestController.class);
	
	private final DogService dogService;
	private final JwtService jwtService;

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
		HttpStatus status = null;
		
		try {
			long dogId = Long.parseLong(dogid);
			Dog dog = dogService.findDogByDogId(dogId);
			if (dog == null) {
				resultMap.put("result", FAIL);
				status = HttpStatus.BAD_REQUEST;
			} else {
				double dogWeight = Double.parseDouble(dog.getDogWeight());
				resultMap.put("result", SUCCESS);
				resultMap.put("dog", DogInfoRespDTO.of(dog, dogWeight));
				status = HttpStatus.OK;
			}
		} catch (NumberFormatException e) {
			logger.error("number format Exception! : "  + e.getMessage());
			resultMap.put("result", FAIL);
			status = HttpStatus.BAD_REQUEST;
		}
		
		return new ResponseEntity<Map<String, Object>>(resultMap, status);
	}
	
	/***
	 * Dog information Registration
	 * @param dogInfo
	 * @return 200
	 */
	@ApiOperation(value = "강아지 정보 등록", notes = "새로운 강아지를 등록합니다.")
	@PostMapping
	public ResponseEntity<?> registDog(
			@RequestHeader(value = "Authorization") @ApiParam(required = true) String token,
			@RequestPart DogRegistParamDTO dogDTO,
			@RequestPart MultipartFile dogImage
			) {
		
		logger.info("DogInfo registration parameter : {} {}", dogDTO, dogImage.getOriginalFilename());
		Map<String, Object> resultMap = new HashMap<String, Object>();
		HttpStatus status = null;
		
		jwtService.validateToken(token);
			long userId = jwtService.getUserId(token);
			Dog dog = dogService.findDogByDogId(dogDTO.getDogId());
			if (dog == null) {
				resultMap.put("result", FAIL);
				status = HttpStatus.BAD_REQUEST;
			} else {
				if (userId != dog.getUser().getUserId()) {
					resultMap.put("result", FAIL);
					status = HttpStatus.UNAUTHORIZED;
				} else {
					
					
					resultMap.put("result", SUCCESS);
					status = HttpStatus.OK;
				}
			}
		return new ResponseEntity<Map<String, Object>>(resultMap, status);
	}
	
	/***
	 * 
	 * @param dogid
	 * @return
	 */
	@ApiOperation(value = "강아지 정보 삭제", notes = "해당 강아지를 삭제합니다.")
	@DeleteMapping("/{dogid}")
	public ResponseEntity<?> deleteDog(
			@PathVariable String dogid
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
			@RequestBody DogUpdateParamDTO dogDTO
			) {
		
		logger.info("GetDogInfo parameter : {}", dogDTO);
		Map<String, Object> resultMap = new HashMap<String, Object>();
		HttpStatus status = null;
		
		return new ResponseEntity<Map<String, Object>>(resultMap, status);
	}
}
