package com.ssafy.togetdog.user.model.service;

import com.ssafy.togetdog.user.model.dto.UserRegistParamDTO;
import com.ssafy.togetdog.user.model.dto.UserUpdateParamDTO;
import com.ssafy.togetdog.user.model.entity.User;
import com.ssafy.togetdog.user.model.entity.WaitUser;

public interface UserService {
	boolean tmpRegistration(UserRegistParamDTO userDTO, String authKey);
	boolean registration(WaitUser user);
	void saveRefreshToken(long userId, String refreshToken);
	void deleteRefreshToken(long userId);
	void deleteUser(long userId);
	User findUserByUserId(long userId);
	User findUserByEmailAndPassword(String email, String password);
	User findUserByEmail(String email);
	User findUserByNickName(String nickName);
	WaitUser findWaitUserByEmail(String email);
	WaitUser findWaitUserByNickName(String nickname);
	int updateUserInfo(long userId, UserUpdateParamDTO userDTO);
	int updatePassword(long userId, String password, String newPassword);
	int updateTmpPassword(long userId, String tmpPassword);
}
