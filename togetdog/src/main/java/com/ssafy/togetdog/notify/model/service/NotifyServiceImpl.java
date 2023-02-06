package com.ssafy.togetdog.notify.model.service;

import javax.transaction.Transactional;

import org.springframework.stereotype.Service;

import com.ssafy.togetdog.notify.model.entity.Notify;
import com.ssafy.togetdog.notify.model.repository.NotifyRepository;
import com.ssafy.togetdog.user.model.entity.User;

import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class NotifyServiceImpl implements NotifyService {
	
	private final NotifyRepository notifyRepository;

	@Override
	public void insertNotify(User user, String notiType, long typeId) {
		Notify newNoti = Notify.builder()
				.receiver(user)
				.notifyType(notiType)
				.typeId(typeId)
				.build();
		notifyRepository.save(newNoti);
	}
	
	@Override
	public void insertNotify(User user, String notiType) {		
		Notify newNoti = Notify.builder()
				.receiver(user)
				.notifyType(notiType)
				.build();
		notifyRepository.save(newNoti);
	}

}
