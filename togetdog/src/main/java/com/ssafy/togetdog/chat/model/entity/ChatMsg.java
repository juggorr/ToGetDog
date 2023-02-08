package com.ssafy.togetdog.chat.model.entity;

import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import com.ssafy.togetdog.chat.model.dto.ChatDTO;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name = "chatting")
@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class ChatMsg {

	@Id
	@Column(name = "chatting_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;
	
	@Column(name = "chatting_idx")
	private long idx;
	
	@Column(name = "chatting_user_id")
	private long userId;
	
	@Column(name = "chatting_room_id")
	private long roomId;
	
	@Column(name = "chatting_content" , length = 100)
	private String content;
	
	@Column(name = "chatting_date")
	private LocalDateTime date;
	
	public ChatDTO toDTO() {
		return ChatDTO.builder()
				.id(this.id)
				.idx(this.idx)
				.userId(this.userId)
				.roomId(this.roomId)
				.content(this.content)
				.date(this.date)
				.build();
	}
	public ChatDTO toChatList() {
		return ChatDTO.builder()
				.idx(this.idx)
				.userId(this.userId)
				.content(this.content)
				.date(this.date)
				.build();
	}
}
