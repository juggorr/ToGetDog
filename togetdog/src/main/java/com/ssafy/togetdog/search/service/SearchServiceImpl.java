package com.ssafy.togetdog.search.service;

import java.util.List;
import java.util.stream.Collectors;

import javax.transaction.Transactional;

import org.springframework.stereotype.Service;

import com.ssafy.togetdog.dog.model.dto.DogInfoRespDTO;
import com.ssafy.togetdog.dog.model.entity.Dog;
import com.ssafy.togetdog.dog.model.repository.DogRepository;
import com.ssafy.togetdog.user.model.dto.UserInfoRespDTO;
import com.ssafy.togetdog.user.model.entity.User;
import com.ssafy.togetdog.user.model.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class SearchServiceImpl implements SearchService{
	
	
	private final DogRepository dogRepository;
	private final UserRepository userRepository;
	
	public List<DogInfoRespDTO> getDogInfoList(String dogName){
		List<Dog> dogs = dogRepository.findByDogNameContains(dogName).orElse(null);
		if(dogs == null)
			return null;
		
		List<DogInfoRespDTO> dogList = dogs.stream().map(d ->DogInfoRespDTO.of(d))
				 .collect(Collectors.toList());
		return dogList;
	}
	
	public List<UserInfoRespDTO> getUserInfoList(String userName){
		List<User> users = userRepository.findByNickNameContains(userName).orElse(null);
		if(users == null)
			return null;
		List<UserInfoRespDTO> userList = users.stream().map(u ->UserInfoRespDTO.of(u))
				 .collect(Collectors.toList());
		return userList;
	}
}
