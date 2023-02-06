package com.ssafy.togetdog.notify.model.service;

import com.ssafy.togetdog.user.model.entity.User;

public interface NotifyService {
	// like, follow
	void insertNotify(User user, String notiType, long typeId);
	// cancel
	void insertNotify(User user, String notiType);
}
