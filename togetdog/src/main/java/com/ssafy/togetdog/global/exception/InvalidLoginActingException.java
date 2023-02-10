package com.ssafy.togetdog.global.exception;

public class InvalidLoginActingException extends RuntimeException {

	private static final long serialVersionUID = -12421;
	
	public InvalidLoginActingException(String msg) {
		super(msg);
	}
}
