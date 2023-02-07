package com.ssafy.togetdog.global.exception;

public class ExcessNumberOfDogsException extends RuntimeException {
	private static final long serialVersionUID = -1242345;
	
	public ExcessNumberOfDogsException(String msg) {
		super(msg);
	}
}
