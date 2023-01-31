package com.ssafy.togetdog.user.model.dto;

import lombok.Data;

/**
 * 에러 메세지 관련
 */
@Data
public class ErrorResponse {

    private String errorMessage;

    public ErrorResponse(String errorMessage) {
        this.errorMessage = errorMessage;
    }
}