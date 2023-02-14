package com.ssafy.togetdog.follow.model.service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ssafy.togetdog.dog.model.dto.DogInfoRespDTO;
import com.ssafy.togetdog.dog.model.entity.Dog;
import com.ssafy.togetdog.follow.model.dto.FollowDTO;
import com.ssafy.togetdog.follow.model.dto.FollowerInfoRespDTO;
import com.ssafy.togetdog.follow.model.entity.Follow;
import com.ssafy.togetdog.follow.model.repository.FollowRepository;
import com.ssafy.togetdog.user.model.entity.User;

import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class FollowService {

	private final FollowRepository followRepository;

	public List<DogInfoRespDTO> getFollowingList(long userId) {
		User user = new User();
		user.setUserId(userId);
		List<Follow> followList = followRepository.findAllByUser(user);
		List<DogInfoRespDTO> dogList = new ArrayList<DogInfoRespDTO>();
		for (Follow follow : followList) {
			dogList.add(DogInfoRespDTO.of(follow.getDog()));
		}

		return dogList;
	}

	public List<FollowerInfoRespDTO> getFollowerList(long dogId) {
		Dog dog = new Dog();
		dog.setDogId(dogId);
		List<Follow> followList = followRepository.findAllByDog(dog);
		List<FollowerInfoRespDTO> userList = new ArrayList<FollowerInfoRespDTO>();

		for (Follow follow : followList) {
			// 삭제된 유저의 경우, 닉네임과 이메일이 같음
			if (follow.getUser().getNickName().equals(follow.getUser().getEmail()))
				continue;
			userList.add(FollowerInfoRespDTO.of(follow.getUser()));
		}
		return userList;
	}

	public Long save(FollowDTO followDTO) {
		User user = new User();
		user.setUserId(followDTO.getUserId());
		Dog dog = new Dog();
		dog.setDogId(followDTO.getDogId());
		Follow isFollowing = followRepository.findByDogAndUser(dog, user).orElse(null);
		if (isFollowing == null) {
			Follow follow = followRepository.save(followDTO.toEntity());
			return follow.getFollowId();
		} else {
			return isFollowing.getFollowId();
		}
	}

	public void delete(FollowDTO followDTO) {
		User user = new User();
		user.setUserId(followDTO.getUserId());
		Dog dog = new Dog();
		dog.setDogId(followDTO.getDogId());
		followRepository.deleteByDogAndUser(dog, user);
	}

	public int getFollowers(long dogId) {
		Dog dog = new Dog();
		dog.setDogId(dogId);
		return followRepository.countByDog(dog);
	}

	public int getFollowings(long userId) {
		User user = new User();
		user.setUserId(userId);
		return followRepository.countByUser(user);
	}

	public boolean isFollowing(long userId, long dogId) {
		User user = new User();
		user.setUserId(userId);
		Dog dog = new Dog();
		dog.setDogId(dogId);

		if (followRepository.countByUserAndDog(user, dog) > 0)
			return true;
		else
			return false;
	}

}
