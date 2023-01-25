package com.ssafy.togetdog.dummy.notify.domain;

import lombok.Data;

@Data
public class NoticeDTO {
	private String type;
	private String nickName; // 알림 보낸 사람 
	private String dogName;
	private long id;
}
