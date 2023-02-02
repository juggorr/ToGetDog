package com.ssafy.togetdog.dog.model.service;

import javax.transaction.Transactional;

import org.springframework.stereotype.Service;

import com.ssafy.togetdog.dog.model.entity.Dog;
import com.ssafy.togetdog.dog.model.repository.DogRepository;

import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class DogServiceImpl implements DogService {
	
	private final DogRepository dogRepository;
	
	@Override
	public Dog findDogByDogId(long dogId) {
		return dogRepository.findById(dogId).orElse(null);
	}

}
