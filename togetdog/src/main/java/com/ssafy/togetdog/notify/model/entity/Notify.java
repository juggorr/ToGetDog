package com.ssafy.togetdog.notify.model.entity;

import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.validation.constraints.Size;

import com.ssafy.togetdog.user.model.entity.User;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Builder
@Entity
@Table(name = "NOTIFY")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Notify {

	@Id
	@Column(columnDefinition = "INT UNSIGNED", name = "notify_id")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long notifyId;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "receiverUserId")
	private User receiver;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "senderUserId")
	private User sender;
	
	@Column(name = "notify_type", length = 1)
	@Size(min = 1, max = 1)
	private String notifyType;

	@Column(name = "notify_date")
	private LocalDateTime notifyDate;
	
	@Column(name = "board_id")
	private Long boardId;
	
	@Column(name = "dog_id")
	private long dogId;
	
	@Column(name = "check")
	private boolean check;
}
