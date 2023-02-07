package com.ssafy.togetdog.notify.model.dto;

import java.util.List;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Builder
@Getter
@Setter
@ToString
public class NotifyRespDTO {
	private long meetingCnt;
	private boolean meetingCancel;
	private List<NoticeDTO> noticeList;
}
