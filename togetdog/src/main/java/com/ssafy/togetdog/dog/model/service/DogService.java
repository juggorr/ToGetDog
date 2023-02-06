package com.ssafy.togetdog.dog.model.service;

import java.io.IOException;
import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import com.ssafy.togetdog.dog.model.dto.DogInfoRespDTO;
import com.ssafy.togetdog.dog.model.dto.DogRegistParamDTO;
import com.ssafy.togetdog.dog.model.dto.DogUpdateParamDTO;
import com.ssafy.togetdog.dog.model.entity.Dog;
import com.ssafy.togetdog.user.model.entity.User;

public interface DogService {
	DogInfoRespDTO getDogInfo(String dogid) throws NumberFormatException;
	Dog findDogByDogId(long dogId);
	List<Dog> findDogsByUser(User user);
	
	void registDog(User user, DogRegistParamDTO dogDTO, MultipartFile dogImage) throws IllegalStateException, IOException;
	void updateDog(User user, DogUpdateParamDTO dogDTO, MultipartFile dogImage) throws IllegalStateException, IOException;
	void deleteDog(long userId, String dogId);
	
	boolean checkInsertPossible(User user);
}
