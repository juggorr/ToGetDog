package com.ssafy.togetdog.chat.model.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import com.ssafy.togetdog.chat.model.ChatInfoDTO;
import com.ssafy.togetdog.user.model.entity.User;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name = "chatuser")
@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class ChatInfo {
	@Id
	@Column(name = "chatuser_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;
	
	@Column(name = "chatuser_user_id")
	private long userId;
	
	@Column(name = "chatuser_room_id")
	private long roomId;
	
	@Column(name = "activation")
	private boolean activation;

	@Column(name = "start_chat_num")
	private long start;

	@Column(name = "last_chat_num")
	private long last;
	
	@OneToOne(targetEntity = ChatMsg.class)
	@JoinColumn(name = "lasttest_chat")
	private ChatMsg lastChat;
	
	@ManyToOne(targetEntity = User.class)
	@JoinColumn(name = "chatuser_other_id")
	private User other;

	public void updateCnt(long last) {
		this.last = last;
	}
	
	public void updateLast(ChatMsg cm) {
		this.lastChat = cm;
	}
	
	public ChatInfoDTO toChatInfoDTO() {
		return ChatInfoDTO.builder()
				.userId(this.other.getUserId())
				.userBirth(this.other.getUserBirth())
				.gender(this.other.getGender())
				.address(this.other.getAddress())
				.lastChatContent(this.lastChat.getContent())
				.date(this.lastChat.getDate())
				.build();
	}
	
	public ChatInfoDTO toChatInnerDTO() {
		return ChatInfoDTO.builder()
				.userId(this.other.getUserId())
				.nickName(this.other.getNickName())
				.userBirth(this.other.getUserBirth())
				.gender(this.other.getGender())
				.address(this.other.getAddress())
				.start(this.getStart())
				.build();
	}
}
