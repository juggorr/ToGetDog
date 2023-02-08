package com.ssafy.togetdog.search.service;

import java.util.List;

import com.ssafy.togetdog.search.model.dto.SearchDogDTO;
import com.ssafy.togetdog.search.model.dto.SearchUserDTO;

public interface SearchService {
	List<SearchDogDTO> getDogInfoList(String dogName);
	List<SearchUserDTO> getUserInfoList(String userName);

}
