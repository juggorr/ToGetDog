package com.ssafy.togetdog.global.exception;

import com.ssafy.togetdog.global.util.ErrorCode;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class InvalidInputException extends RuntimeException {
	private static final long serialVersionUID = 234234321L;
	private final ErrorCode errorCode;

}
