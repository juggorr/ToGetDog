package com.ssafy.togetdog.dog.model.service;

import com.ssafy.togetdog.dog.model.entity.Dog;

public interface DogService {
	Dog findDogByDogId(long dogId);
}
