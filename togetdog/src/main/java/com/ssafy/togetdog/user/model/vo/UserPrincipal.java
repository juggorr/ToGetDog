package com.ssafy.togetdog.user.model.vo;


import java.util.Collection;
import java.util.Collections;
import java.util.HashMap;
import java.util.Map;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.oauth2.core.oidc.OidcIdToken;
import org.springframework.security.oauth2.core.oidc.OidcUserInfo;
import org.springframework.security.oauth2.core.oidc.user.OidcUser;
import org.springframework.security.oauth2.core.user.OAuth2User;

import com.ssafy.togetdog.user.model.entity.User;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@Builder
@Getter
@Setter
@AllArgsConstructor
@RequiredArgsConstructor
public class UserPrincipal implements OAuth2User, UserDetails, OidcUser {

	private static final long serialVersionUID = -4838329238955305240L;
	private final String email;
    private final String password;
    private final Collection<GrantedAuthority> authorities;
    private Map<String, Object> attributes;

    @Override
    public Map<String, Object> getAttributes() {
        return attributes;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return authorities;
    }

    @Override
    public String getName() {
        return email;
    }

    @Override
    public String getUsername() {
        return email;
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

    @Override
    public Map<String, Object> getClaims() {
        return null;
    }

    @Override
    public OidcUserInfo getUserInfo() {
        return null;
    }

    @Override
    public OidcIdToken getIdToken() {
        return null;
    }
    
    public static UserPrincipal disable() {
    	Map<String, Object> attributes = new HashMap<String, Object>();
    	attributes.put("login", false);
    	return UserPrincipal.builder()
    			.email("disable")
    			.attributes(attributes)
    			.build();
    }

    public static UserPrincipal create(User user) {
    	Map<String, Object> attributes = new HashMap<String, Object>();
    	attributes.put("login", false);
    	attributes.put("nickname", user.getNickName());
    	attributes.put("social", user.getSocial());
    	return UserPrincipal.builder()
    			.email(user.getEmail())
    			.attributes(attributes)
    			.password(user.getPassword())
    			.authorities(Collections.singletonList(new SimpleGrantedAuthority(RoleType.USER.getCode())))
    			.build();
    }
    
    public static UserPrincipal login(User user) {
    	Map<String, Object> attributes = new HashMap<String, Object>();
    	attributes.put("login", true);
    	return UserPrincipal.builder()
    			.email(user.getEmail())
    			.attributes(attributes)
    			.build();
    }

    public static UserPrincipal create(User user, Map<String, Object> attributes) {
        UserPrincipal userPrincipal = create(user);
        userPrincipal.setAttributes(attributes);
        return userPrincipal;
    }
}
