package com.ssafy.togetdog.dummy.notify.domain;

import lombok.Data;

@Data
public class NoticeDTO {
	private String type;
	private String nickName;
	private String dogName;
	private long id;
}
