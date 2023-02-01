package com.ssafy.togetdog.user.model.dto;

import lombok.Data;

@Data
public class EmailAuthParamDTO {
	private String email;
	private String authKey;
}
