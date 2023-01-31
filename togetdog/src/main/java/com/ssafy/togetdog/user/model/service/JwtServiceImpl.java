package com.ssafy.togetdog.user.model.service;

import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.util.Arrays;
import java.util.Collection;
import java.util.Date;
import java.util.Map;
import java.util.stream.Collectors;

import javax.annotation.PostConstruct;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.stereotype.Service;

import com.ssafy.togetdog.global.exception.TokenValidFailedException;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import io.jsonwebtoken.security.SignatureException;

@Service
public class JwtServiceImpl implements JwtService {

	public static final Logger logger = LoggerFactory.getLogger(JwtServiceImpl.class);
	private static final int ACCESS_TOKEN_EXPIRE_MINUTES = 60; // minute
	private static final int REFRESH_TOKEN_EXPIRE_MINUTES = 2; // week

	@Value("${jwt.secret}")
	private String secretSalt;

	private Key key;

	@PostConstruct
	protected void init() {
		key = Keys.hmacShaKeyFor(secretSalt.getBytes(StandardCharsets.UTF_8));
	}

	@Override
	public <T> String createAccessToken(long userId) {
		return create(userId, "togetDog", 1000 * 10 * ACCESS_TOKEN_EXPIRE_MINUTES);
	}

	@Override
	public <T> String createRefreshToken(long userId) {
		return create(userId, "togetDog", 1000 * 60 * 60 * 24 * 7 * REFRESH_TOKEN_EXPIRE_MINUTES);
	}

	@Override
	public <T> String create(long userId, String subject, long expir) {
		String jwt = Jwts.builder()
				.setHeaderParam("type", "JWT")
				.setHeaderParam("regDate", System.currentTimeMillis())
				.setExpiration(new Date(System.currentTimeMillis() + expir))
				.setSubject(subject)
				.claim("userId", userId)
				.signWith(key, SignatureAlgorithm.HS256)
				.compact();
		return jwt;
	}

	@Override
	public <T> String create(long userId, String subject, long expir, String role) {
		String jwt = Jwts.builder()
				.setHeaderParam("type", "JWT")
				.setHeaderParam("regDate", System.currentTimeMillis())
				.setExpiration(new Date(System.currentTimeMillis() + expir))
				.setSubject(subject).claim("userId", userId)
				.claim("role", role)
				.signWith(key, SignatureAlgorithm.HS256)
				.compact();
		return jwt;
	}

	// 유효기간이 다되어가면 refresh token검사해서 갱신해줘야 함!!
	@Override
	public boolean validateToken(String jwtToken) {
		Jws<Claims> claims = null;
		try {
			claims = Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(jwtToken);
			logger.debug("claims: {}", claims);
			return true;
		} catch (SignatureException | MalformedJwtException e) {
			logger.error("SignatureException : ", e.getMessage());
			return false;
		} catch (ExpiredJwtException e) {
			logger.error("Expired JWT token : ", e.getMessage());
			return false;
		} catch (Exception e) {
			logger.error("Unexpected error : ", e.getMessage());
			return false;
		}
	}

	@Override
	public Map<String, Object> get(String jwtToken) {
		Jws<Claims> claims = null;
		try {
			claims = Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(jwtToken);
		} catch (Exception e) {
			logger.error("jwt parseClaims error : ", e.getMessage());
			// throw new UnAuthorizedException();
		}
		Map<String, Object> value = claims.getBody();
		logger.info("value : {}", value);
		return value;
	}

	@Override
	public long getUserId(String jwtToken) {
		return Long.parseLong(String.valueOf(this.get(jwtToken).get("userId")));
	}

	public Authentication getAuthentication(String token) {
		if (validateToken(token)) {
			Map<String, Object> claims = get(token);
			Collection<? extends GrantedAuthority> authorities = Arrays
					.stream(new String[] { claims.get("role").toString() }).map(SimpleGrantedAuthority::new)
					.collect(Collectors.toList());

			logger.debug("claims subject := [{}]", claims.get("subject"));
			User principal = new User((String) claims.get("subject"), "", authorities);

			return new UsernamePasswordAuthenticationToken(principal, token, authorities);
		} else {
			throw new TokenValidFailedException();
		}
	}

}
