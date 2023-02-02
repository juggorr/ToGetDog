package com.ssafy.togetdog.global.advice;

import java.util.HashMap;
import java.util.Map;

import javax.mail.MessagingException;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import com.ssafy.togetdog.global.exception.DuplicatedInputException;
import com.ssafy.togetdog.global.exception.InvalidInputException;
import com.ssafy.togetdog.global.exception.InvalidLoginActingException;
import com.ssafy.togetdog.global.exception.TokenValidFailedException;
import com.ssafy.togetdog.global.exception.UnAuthorizedException;

@RestControllerAdvice(basePackages = {"com.ssafy.togetdog.user.controller", "com.ssafy.togetdog.dog.controller"})
public class ExceptionRestControllerAdvice extends ResponseEntityExceptionHandler {
	
	private static final String FAIL = "fail";
	private final Logger logger = LoggerFactory.getLogger(ExceptionRestControllerAdvice.class);

	// 400
	@ExceptionHandler(InvalidInputException.class)
	public ResponseEntity<?> invalidInput400(InvalidInputException e) {
		logger.error("400 : Invalid input error : " + e.getMessage());
		Map<String, String> resultMap = new HashMap<String, String>();
		resultMap.put("result", FAIL);
		resultMap.put("msg", "올바르지 않은 INPUT 값이 들어왔습니다.");
		return new ResponseEntity<Map<String, String>>(resultMap, HttpStatus.BAD_REQUEST);
	}
	
	@ExceptionHandler(NumberFormatException.class)
	public ResponseEntity<?> numberFormat400(NumberFormatException e) {
		logger.error("400 : NumberFormatException : " + e.getMessage());
		Map<String, String> resultMap = new HashMap<String, String>();
		resultMap.put("result", FAIL);
		resultMap.put("msg", "숫자로 변환하지 못했습니다.");
		return new ResponseEntity<Map<String, String>>(resultMap, HttpStatus.BAD_REQUEST);
	}
	
	@ExceptionHandler(IllegalStateException .class)
	public ResponseEntity<?> illegalState400(IllegalStateException e) {
		logger.error("400 : IllegalStateException : " + e.getMessage());
		Map<String, String> resultMap = new HashMap<String, String>();
		resultMap.put("result", FAIL);
		resultMap.put("msg", "IllegalStateException이 발생했어요");
		return new ResponseEntity<Map<String, String>>(resultMap, HttpStatus.BAD_REQUEST);
	}
	
	// 401
	@ExceptionHandler(TokenValidFailedException.class)
	public ResponseEntity<?> tokenInvalid401(TokenValidFailedException e) {
		logger.error("401 : token invalid error : " + e.getMessage());
		Map<String, String> resultMap = new HashMap<String, String>();
		resultMap.put("result", FAIL);
		resultMap.put("msg", "올바르지 않은 토큰 값이라 회원 인증에 실패하였습니다.");
		return new ResponseEntity<Map<String, String>>(resultMap, HttpStatus.UNAUTHORIZED);
	}
	
	@ExceptionHandler(UnAuthorizedException.class)
	public ResponseEntity<?> unAuth401(UnAuthorizedException e) {
		logger.error("401 : UnAuthorizedException : " + e.getMessage());
		Map<String, String> resultMap = new HashMap<String, String>();
		resultMap.put("result", FAIL);
		resultMap.put("msg", "권한이 승인 될 수 없는 요청입니다.");
		return new ResponseEntity<Map<String, String>>(resultMap, HttpStatus.UNAUTHORIZED);
	}

	// 409
	@ExceptionHandler(DuplicatedInputException.class)
	public ResponseEntity<?> duplicate409(DuplicatedInputException e) {
		logger.error("409 : duplicated input error : " + e.getMessage());
		Map<String, String> resultMap = new HashMap<String, String>();
		resultMap.put("result", FAIL);
		resultMap.put("msg", "duplicate 오류가 발생했습니다.");
		return new ResponseEntity<Map<String, String>>(resultMap, HttpStatus.CONFLICT);
	}
	
	@ExceptionHandler(InvalidLoginActingException.class)
	public ResponseEntity<?> unAuthLogin409(InvalidLoginActingException e) {
		logger.error("409 : unAuth Login acting : " + e.getMessage());
		Map<String, String> resultMap = new HashMap<String, String>();
		resultMap.put("result", FAIL);
		resultMap.put("msg", "가입대기중");
		return new ResponseEntity<Map<String, String>>(resultMap, HttpStatus.CONFLICT);
	}

	// 500
	@ExceptionHandler(MessagingException.class)
	public ResponseEntity<?> messagingError500(MessagingException e) {
		logger.error("500 : Mail sending error : " + e.getMessage());
		Map<String, String> resultMap = new HashMap<String, String>();
		resultMap.put("result", FAIL);
		resultMap.put("msg", "예기치 못한 이유로 메일 전송에 실패했습니다.");
		return new ResponseEntity<Map<String, String>>(resultMap, HttpStatus.INTERNAL_SERVER_ERROR);
	}
	
}