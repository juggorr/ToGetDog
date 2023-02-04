package com.ssafy.togetdog.follow.model.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ssafy.togetdog.dog.model.entity.Dog;
import com.ssafy.togetdog.follow.model.entity.Follow;
import com.ssafy.togetdog.user.model.entity.User;

public interface FollowRepository extends JpaRepository<Follow, Long> {

	List<Follow> findAllByDog(Dog dog);

	List<Follow> findAllByUser(User user);

	Optional<Follow> findByDogAndUser(Dog dog, User user);

	void deleteByDogAndUser(Dog dog, User user);

	int countByDog(Dog dog);

	int countByUser(User user);

}
