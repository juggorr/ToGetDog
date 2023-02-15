package com.ssafy.togetdog.search.service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import javax.transaction.Transactional;

import org.springframework.stereotype.Service;

import com.ssafy.togetdog.dog.model.entity.Dog;
import com.ssafy.togetdog.dog.model.repository.DogRepository;
import com.ssafy.togetdog.dog.model.service.DogService;
import com.ssafy.togetdog.search.model.dto.SearchDogDTO;
import com.ssafy.togetdog.search.model.dto.SearchUserDTO;
import com.ssafy.togetdog.user.model.entity.User;
import com.ssafy.togetdog.user.model.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class SearchServiceImpl implements SearchService{
	
	
	private final DogRepository dogRepository;
	private final UserRepository userRepository;
	private final DogService dogService;
	
	public List<SearchDogDTO> getDogInfoList(String dogName, long userId){
		User user = userRepository.findById(userId).orElse(null);
		if(user == null) return null;
		List<Dog> myDogs = dogRepository.findAllByUser(user).orElse(new ArrayList<Dog>());
		List<Dog> dogs = dogRepository.findByDogNameContains(dogName).orElse(null);
		for (Dog dog : myDogs) {
			dogs.remove(dog);
		}
		if(dogs == null)
			return null;
		
		List<SearchDogDTO> dogList = dogs.stream().map(d ->SearchDogDTO.of(d))
				 .collect(Collectors.toList());
		return dogList;
	}
	
	public List<SearchUserDTO> getUserInfoList(String userName, long userId){
		User user = userRepository.findById(userId).orElse(null);
		if(user == null) return null;
		List<User> users = userRepository.findByNickNameContains(userName).orElse(null);
		if(users == null) return null;
		users.remove(user);
		List<SearchUserDTO> userList = users.stream().map(u ->SearchUserDTO.of(u, dogService.findDogsByUserId(u.getUserId())))
				 .collect(Collectors.toList());
		return userList;
	}
}
