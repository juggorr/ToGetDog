package com.ssafy.togetdog.chat.model;

import lombok.Data;

@Data
public class SessionInfo {
	private String SessionId;
	private String userId;
	private Long rooms;

}
