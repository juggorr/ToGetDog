package com.ssafy.togetdog.user.model.entity;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.ssafy.togetdog.dog.model.entity.Dog;
import com.ssafy.togetdog.notify.model.entity.Notify;
import com.ssafy.togetdog.user.model.vo.ProviderType;
import com.ssafy.togetdog.user.model.vo.RoleType;

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
    @Column(name = "social")
    @Enumerated(EnumType.STRING)
    private ProviderType social;
    
    @Column(name = "rating_sum")
    private long ratingSum;
    
    @Column(name = "rating_count")
    private long ratingCount;
    
    @Column(name = "ROLE_TYPE", length = 20)
    @Enumerated(EnumType.STRING)
    private RoleType roleType;
    
    @OneToMany(
    		mappedBy = "user",
    		fetch = FetchType.LAZY,
    		cascade = CascadeType.ALL,
    		orphanRemoval = true)
    @Builder.Default
    private List<Dog> dogList = new ArrayList<Dog>();
    
    @OneToMany(
    		mappedBy = "receiver",
    		fetch = FetchType.LAZY,
    		cascade = CascadeType.ALL,
    		orphanRemoval = true)
    @Builder.Default
    private List<Notify> receiverNotifyList = new ArrayList<Notify>();

    
    /////////// OVERRIDE METHOD
    
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
