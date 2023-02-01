package com.ssafy.togetdog.global.util;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public enum ErrorCode {

    // 400 BAD_REQUEST
    INVALID_PARAMETER(400, "파라미터 값을 확인해주세요."),
	
	// 401 UNAUTHORIZED
    UNAUTHORIZED_ACCESS(401,""),
	
	// 409 CONFLICT
	DUPLICATED_EMAIL(409, "중복된 이메일 값 입니다."),
	DUPLICATED_NICKNAME(409, "중복된 닉네임 입니다."),
	
	// 500 INTERNAL_SERVER_ERROR
	UNEXPECTED_SERVER_ERROR(500, "");
    
    private final int status;
    private final String message;
}
