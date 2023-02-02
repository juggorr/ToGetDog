package com.ssafy.togetdog.dog.model.service;

import org.springframework.web.multipart.MultipartFile;

import com.ssafy.togetdog.dog.model.dto.DogInfoRespDTO;
import com.ssafy.togetdog.dog.model.dto.DogRegistParamDTO;
import com.ssafy.togetdog.dog.model.entity.Dog;

public interface DogService {
	DogInfoRespDTO getDogInfo(String dogid) throws NumberFormatException;
	Dog findDogByDogId(long dogId);
	
	void registDog(long userId, DogRegistParamDTO dogDTO, MultipartFile dogImage);
}
