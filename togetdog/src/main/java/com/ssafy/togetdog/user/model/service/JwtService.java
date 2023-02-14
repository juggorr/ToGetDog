package com.ssafy.togetdog.user.model.service;

import java.util.Map;

public interface JwtService {
	<T> String createAccessToken(long userId);
	<T> String createAccessToken(long userId, String role);
	<T> String create(long userId, String subject, int expir);
	<T> String create(long userId, String subject, int expir, String role);
	void validateToken(String jwtToken);
	long getUserId(String jwtToken);
	Map<String, Object> get(String key);
}
