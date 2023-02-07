package com.ssafy.togetdog.notify.model.dto;

import com.ssafy.togetdog.notify.model.entity.Notify;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Builder
@Getter
@Setter
@ToString
public class NoticeDTO {
	private String type;
	private String nickName; // 상대방 닉네임
	private String dogName; // 내 강아지 이름
	private long id; //좋아요일때 해당게시물 boardId, 팔로우일때 상대방 userId
	
	public static NoticeDTO of(Notify notify, String dogName) {
		Long id = notify.getBoardId();
		String type = notify.getNotifyType();
		if (type.equals("f")) {
			type = "팔로우";
			id = notify.getSender().getUserId();
		} else if (type.equals("l")) {
			type = "좋아요";
		} else {
			type = "산책 취소";
		}
		return NoticeDTO.builder()
				.type(type)
				.nickName(notify.getSender().getNickName())
				.dogName(dogName)
				.id(id)
				.build();
	}
}
