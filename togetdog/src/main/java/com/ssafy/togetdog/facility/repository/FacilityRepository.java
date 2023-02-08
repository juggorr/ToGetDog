package com.ssafy.togetdog.facility.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ssafy.togetdog.facility.model.entity.Facility;

public interface FacilityRepository extends JpaRepository<Facility , Long>{

}
