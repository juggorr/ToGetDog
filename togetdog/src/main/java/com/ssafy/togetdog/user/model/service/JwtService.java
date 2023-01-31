package com.ssafy.togetdog.user.model.service;

import java.util.Map;

public interface JwtService {
	<T> String createAccessToken(long userId);
	<T> String createRefreshToken(long userId);
	<T> String create(long userId, String subject, long expir);
	<T> String create(long userId, String subject, long expir, String role);
	boolean validateToken(String jwtToken);
	long getUserId(String jwtToken);
	Map<String, Object> get(String key);
}
