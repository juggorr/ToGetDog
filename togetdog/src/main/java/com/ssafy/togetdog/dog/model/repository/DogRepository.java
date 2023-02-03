package com.ssafy.togetdog.dog.model.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ssafy.togetdog.dog.model.entity.Dog;

public interface DogRepository extends JpaRepository<Dog, Long> {

}
