package com.ssafy.togetdog.dummy.domain;

import java.util.List;

import lombok.Data;

@Data
public class NotifyDTO {
	private int meetingCnt;
	private boolean meetingCancel;
	private List<NoticeDTO> notice;
}
