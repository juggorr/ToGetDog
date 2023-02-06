package com.ssafy.togetdog.notify.model.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ssafy.togetdog.notify.model.entity.Notify;

public interface NotifyRepository extends JpaRepository<Notify, Long> {

}
