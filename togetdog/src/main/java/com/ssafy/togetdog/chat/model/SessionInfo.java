package com.ssafy.togetdog.chat.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class SessionInfo {
	private String sessionId;
	private long userId;
	private long roomId;

}
