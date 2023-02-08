package com.ssafy.togetdog.search.service;

import java.util.List;

import com.ssafy.togetdog.dog.model.dto.DogInfoRespDTO;
import com.ssafy.togetdog.user.model.dto.UserIncludesDogsRespDTO;

public interface SearchService {
	List<DogInfoRespDTO> getDogInfoList(String dogName);
	List<UserIncludesDogsRespDTO> getUserInfoList(String userName);

}
