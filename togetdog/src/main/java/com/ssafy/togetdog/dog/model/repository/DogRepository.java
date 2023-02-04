package com.ssafy.togetdog.dog.model.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ssafy.togetdog.dog.model.entity.Dog;
import com.ssafy.togetdog.user.model.entity.User;

public interface DogRepository extends JpaRepository<Dog, Long> {

	List<Dog> findAllByUser(User user);

}
