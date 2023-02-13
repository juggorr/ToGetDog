package com.ssafy.togetdog.user.model.entity;

import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.ssafy.togetdog.user.model.vo.ProviderType;
import com.ssafy.togetdog.user.model.vo.RoleType;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name = "WAIT_USER")
@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class WaitUser {
	@Id
	@Column(name = "user_id")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long userId;

	@Column(name = "email", length = 50, unique = true)
	@NotNull
	private String email;

	@Column(name = "nickname", length = 16, unique = true)
	private String nickName;

	@JsonIgnore
	@Column(name = "password", length = 64)
	@NotNull
	private String password;

	@Column(name = "user_birth", length = 4)
	private String userBirth;

	@Column(name = "user_gender", length = 1)
	@Size(min = 1, max = 1)
	private String gender;

	@Column(name = "address", length = 100)
	private String address;

	@Column(name = "region_code", length = 5)
	@Size(min = 5, max = 5)
	private String regionCode;
	
	@Column(name = "auth_key", length = 6)
	private String authKey;
	
	@Column(name = "regist_date")
	private LocalDateTime registDate;
	
	public User toUser() {
		User user = User.builder()
				.email(this.email)
				.nickName(this.nickName)
				.password(this.password)
				.userBirth(this.userBirth)
				.gender(this.gender)
				.address(this.address)
				.regionCode(this.regionCode)
				.social(ProviderType.O)
				.roleType(RoleType.USER)
				.ratingSum(0)
				.ratingCount(0)
				.build();
		return user;
	}
	
}
