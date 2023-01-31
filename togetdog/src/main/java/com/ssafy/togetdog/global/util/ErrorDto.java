package com.ssafy.togetdog.global.util;

import org.springframework.http.HttpStatus;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class ErrorDto {
	private HttpStatus status;
	private String message;
}
