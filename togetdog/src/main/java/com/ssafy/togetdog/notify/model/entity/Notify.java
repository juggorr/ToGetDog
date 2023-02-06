package com.ssafy.togetdog.notify.model.entity;

import java.time.LocalDate;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.validation.constraints.Size;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Builder
@Setter
@Getter
@Entity
public class Notify {
	
	@Id
	@Column(columnDefinition = "INT UNSIGNED", name = "notify_id")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long notifyId;
	
	@Column(name = "receiver_user_id")
	private long receiverUserId;
	
	@Column(name = "notify_type", length = 1)
	@Size(min = 1, max = 1)
	private String notifyType;
	
	@Column(name = "notify_date")
	private LocalDate notifyDate;
	
	@Column(name = "type_id")
	private long typeId;
	
	@Column(name = "check")
	private boolean check;
	
}
