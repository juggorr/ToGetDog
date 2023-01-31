package com.ssafy.togetdog.user.model.entity;

import java.util.ArrayList;
import java.util.Collection;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.ssafy.togetdog.user.model.domain.RoleType;
import com.ssafy.togetdog.user.model.dto.UserInfoRespDTO;
import com.ssafy.togetdog.user.model.dto.UserLoginParamDTO;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name = "USER")
@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class User implements UserDetails {
	
	private static final long serialVersionUID = -80720230131L;

	@Id
    @Column(columnDefinition = "INT UNSIGNED", name = "user_id")
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
    
    // g구글, k카카오, n네이버, o일반가입
    @Column(name = "social", length = 1)
    @Size(min = 1, max = 1)
    private String social;
    
    @Column(name = "rating_sum")
    private long ratingSum;
    
    @Column(name = "rating_count")
    private long ratingCount;
    
    @Column(name = "ROLE_TYPE", length = 20)
    @Enumerated(EnumType.STRING)
    private RoleType roleType;

    @Column(name = "token")
    private String token;
    
    public UserLoginParamDTO toUserLoginResponseDTO() {
    	return UserLoginParamDTO.builder()
    			.userId(this.userId)
    			.nickName(this.nickName)
    			.address(this.address)
    			.build();
    }
    
    public UserInfoRespDTO toUserInfoResponseDTO() {
    	String gender = this.gender;
    	if (gender.equals("f")) gender = "female";
    	else if (gender.equals("m")) gender = "male";
    	else gender = "none";
    	
    	String social = this.social;
    	if (social.equals("n")) social = "naver";
    	else if (social.equals("k")) social = "kakao";
    	else if (social.equals("g")) social = "google";
    	else social = "origin";
    	
    	double rating = 0;
    	if (this.ratingCount != 0) {
    		rating = this.ratingSum / this.ratingCount;
    	}
    	
		return UserInfoRespDTO.builder()
				.email(this.email)
    			.nickName(this.nickName)
    			.birth(this.userBirth)
    			.userGender(gender)
    			.address(this.address)
    			.regionCode(this.regionCode)
    			.social(social)
    			.rating(rating)
    			.build();
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
    	  Collection<GrantedAuthority> collect = new ArrayList<>();
          collect.add(new GrantedAuthority() {
			private static final long serialVersionUID = -23521L;
			@Override
              public String getAuthority() {
                  return roleType.getDisplayName();
              }
          });
          return null;
    }

    @Override
    public String getUsername() {
        return this.email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
