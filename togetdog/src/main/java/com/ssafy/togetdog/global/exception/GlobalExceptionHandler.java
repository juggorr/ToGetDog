package com.ssafy.togetdog.global.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.ssafy.togetdog.global.util.ErrorDto;

@RestControllerAdvice
public class GlobalExceptionHandler {

//    @ExceptionHandler({ InvalidInputException.class })
//    protected ResponseEntity<?> handleCustomException(InvalidInputException e) {
//        return new ResponseEntity(new ErrorDto(BAD_REQUEST.getStatus(), BAD_REQUEST.getMessage()), HttpStatus.valueOf(e.getErrorCode().getStatus()));
//    }
//
//    @ExceptionHandler({ Exception.class })
//    protected ResponseEntity handleServerException(Exception ex) {
//        return new ResponseEntity(new ErrorDto(INTERNAL_SERVER_ERROR.getStatus(), INTERNAL_SERVER_ERROR.getMessage()), HttpStatus.INTERNAL_SERVER_ERROR);
//    }
}