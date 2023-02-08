package com.ssafy.togetdog.dog.model.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ssafy.togetdog.dog.model.entity.Dog;
import com.ssafy.togetdog.user.model.entity.User;

public interface DogRepository extends JpaRepository<Dog, Long> {
	Optional<List<Dog>> findAllByUser(User user);
	Optional<List<Dog>> findByDogNameContains(String dogName);

	Dog findByDogId(long dogId);
}

