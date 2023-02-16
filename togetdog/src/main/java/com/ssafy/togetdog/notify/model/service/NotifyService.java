package com.ssafy.togetdog.notify.model.service;

import java.util.List;

import com.ssafy.togetdog.appointment.model.entity.Appointment;
import com.ssafy.togetdog.notify.model.dto.NotifyRespDTO;
import com.ssafy.togetdog.notify.model.entity.Notify;
import com.ssafy.togetdog.user.model.entity.User;

public interface NotifyService {
	// insert follow
	void insertFollowNotify(User receiver, User sender, long dogId);
	// insert like
	void insertLikeNotify(User receiver, User sender, long dogId, long boardId);
	// insert appointment cancel notice
	void insertCancelNotify(Appointment appointment, long userId);
	// check notice
	void updateNotify(User user);
	// select notice
	NotifyRespDTO getNotiList(User user, int pageNo);
	// 해당 유저의 알림 리스트를 전부 조회합니다 (연관성 삭제를 위해)
	List<Notify> findNotifyListByUser(User user);
	void deleteNotify(Notify notify);
}
