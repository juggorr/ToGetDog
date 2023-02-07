package com.ssafy.togetdog.notify.model.service;

import com.ssafy.togetdog.notify.model.dto.NotifyRespDTO;
import com.ssafy.togetdog.user.model.entity.User;

public interface NotifyService {
	// insert follow
	void insertNotify(User receiver, User sender, String notiType, long dogId);
	// insert like
	void insertNotify(User receiver, User sender, String notiType, long dogId, long boardId);
	// insert appointment cancel notice
	void insertNotify(User user, String notiType);
	// check notice
	void updateNotify(User user);
	// select notice
	NotifyRespDTO getNotiList(User user);
}
