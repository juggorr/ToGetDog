package com.ssafy.togetdog.dog.model.service;

import java.io.File;
import java.text.SimpleDateFormat;
import java.util.Date;

import javax.transaction.Transactional;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.ssafy.togetdog.dog.model.dto.DogInfoRespDTO;
import com.ssafy.togetdog.dog.model.dto.DogRegistParamDTO;
import com.ssafy.togetdog.dog.model.entity.Dog;
import com.ssafy.togetdog.dog.model.repository.DogRepository;
import com.ssafy.togetdog.global.exception.InvalidInputException;
import com.ssafy.togetdog.global.exception.UnAuthorizedException;

import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class DogServiceImpl implements DogService {
	
	private String filePath;
	private final DogRepository dogRepository;
	
	/*강아지 정보 조회하기*/
	@Override
	public DogInfoRespDTO getDogInfo(String dogid) throws NumberFormatException {
		long dogId = Long.parseLong(dogid);
		Dog dog = findDogByDogId(dogId);
		if (dog == null) {
			throw new InvalidInputException();
		} else {
			double dogWeight = Double.parseDouble(dog.getDogWeight());
			return DogInfoRespDTO.of(dog, dogWeight);
		}
	}
	
	@Override
	public Dog findDogByDogId(long dogId) {
		return dogRepository.findById(dogId).orElse(null);
	}

	/*강아지 정보 등록하기*/
	@Override
	public void registDog(long userId, DogRegistParamDTO dogDTO, MultipartFile image) {
		Dog dog = findDogByDogId(dogDTO.getDogId());
		if (dog == null || image.isEmpty()) {
			throw new InvalidInputException();
		}
		if (userId != dog.getUser().getUserId()) {
			throw new UnAuthorizedException();
		}
		
		String today = new SimpleDateFormat("yyMMdd").format(new Date());
		String saveFolder = filePath + File.separator + today;

		
				
	}
	

}
