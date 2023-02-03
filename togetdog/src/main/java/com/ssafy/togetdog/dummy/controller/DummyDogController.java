package com.ssafy.togetdog.dummy.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.ssafy.togetdog.dog.model.dto.DogRegistParamDTO;
import com.ssafy.togetdog.dog.model.dto.DogUpdateParamDTO;
import com.ssafy.togetdog.dummy.domain.DogDTO;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;

@RestController
@RequestMapping("/dummy/dog")
@Api("강아지 관련 더미 API : 무슨 값을 넣든 같은 dummy 결과가 나옵니다.")
public class DummyDogController {
	
	private static final String SUCCESS = "success";
	//private static final String FAIL = "fail";
	
	@ApiOperation(value = "강아지 정보 조회", notes = "해당 강아지의 정보를 조회합니다.")
	@GetMapping("/{dogid}")
	public ResponseEntity<?> getDogInfo(@PathVariable String dogid) {
		DogDTO dog = new DogDTO();
		dog.setDogId(Long.parseLong(dogid));
		dog.setUserId(84L);
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
		
		Map<String, Object> resultMap = new HashMap<String,Object>();
		resultMap.put("result", SUCCESS);
		resultMap.put("dpg", dog);
		return new ResponseEntity<Map<String, Object>>(resultMap, HttpStatus.OK);
	}
	
	@ApiOperation(value = "강아지 정보 등록", notes = "새로운 강아지를 등록합니다.")
	@PostMapping
	public ResponseEntity<?> registDog(
			@RequestPart DogRegistParamDTO dogDTO,
			@RequestPart MultipartFile file) {
		Map<String, String> resultMap = new HashMap<String, String>();
		resultMap.put("result", SUCCESS);
		resultMap.put("msg", "해당 강아지의 정보를 등록했습니다.");
		return new ResponseEntity<Map<String, String>>(resultMap, HttpStatus.OK);
	}
	
	@ApiOperation(value = "강아지 정보 삭제", notes = "해당 강아지를 삭제합니다.")
	@DeleteMapping("/{dogid}")
	public ResponseEntity<?> deleteDog(@PathVariable String dogid) {
		Map<String, String> resultMap = new HashMap<String, String>();
		resultMap.put("result", SUCCESS);
		resultMap.put("msg", "해당 강아지의 정보를 삭제했습니다.");
		return new ResponseEntity<Map<String, String>>(resultMap, HttpStatus.OK);
	}
	
	@ApiOperation(value = "강아지 정보 수정", notes = "해당 강아지를 수정합니다.")
	@PutMapping
	public ResponseEntity<?> updateDog(
			@RequestPart DogUpdateParamDTO dogDTO, @RequestPart MultipartFile file) {
		Map<String, String> resultMap = new HashMap<String, String>();
		resultMap.put("result", SUCCESS);
		resultMap.put("msg", "해당 강아지의 정보를 수정했습니다.");
		return new ResponseEntity<Map<String, String>>(resultMap, HttpStatus.OK);
	}
}

