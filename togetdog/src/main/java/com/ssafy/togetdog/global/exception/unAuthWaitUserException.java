package com.ssafy.togetdog.global.exception;

public class unAuthWaitUserException extends RuntimeException {

	private static final long serialVersionUID = 11412414L;
	
	public unAuthWaitUserException(String msg) {
		super(msg);
	}

}
