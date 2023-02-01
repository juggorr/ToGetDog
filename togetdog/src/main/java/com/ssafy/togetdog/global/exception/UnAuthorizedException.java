package com.ssafy.togetdog.global.exception;

public class UnAuthorizedException extends RuntimeException {
	private static final long serialVersionUID = 2238030302650813813L;

	public UnAuthorizedException() {
		super("UnAuthorizedException! please retrying to login.");
	}
}