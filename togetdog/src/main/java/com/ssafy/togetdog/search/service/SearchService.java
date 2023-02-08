package com.ssafy.togetdog.search.service;

import java.util.List;

import com.ssafy.togetdog.dog.model.dto.DogInfoRespDTO;
import com.ssafy.togetdog.user.model.dto.UserInfoRespDTO;

public interface SearchService {
	List<DogInfoRespDTO> getDogInfoList(String dogName);
	List<UserInfoRespDTO> getUserInfoList(String userName);

}
