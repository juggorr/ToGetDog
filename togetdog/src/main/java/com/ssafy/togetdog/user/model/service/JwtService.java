package com.ssafy.togetdog.user.model.service;

import java.util.Map;

public interface JwtService {
	<T> String createAccessToken(long userId);
	<T> String createRefreshToken(long userId);
	<T> String create(long userId, String subject, long expir);
	boolean validateToken(String jwtToken);
	Map<String, Object> get(String key);
	long getUserId(String jwtToken);
}
