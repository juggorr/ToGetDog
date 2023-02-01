package com.ssafy.togetdog.user.model.vo;
import java.util.Map;

import com.ssafy.togetdog.user.model.entity.User;

import lombok.Builder;
import lombok.Getter;

@Getter
public class OAuthAttributes {
	private Map<String, Object> attributes;
	private String nameAttributeKey;
    private String name;
    private String email;
    private ProviderType social;
    
    @Builder
    public OAuthAttributes(Map<String, Object> attributes, String nameAttributeKey, String name, String email, ProviderType social) {
        this.attributes = attributes;
        this.nameAttributeKey = nameAttributeKey;
        this.name = name;
        this.email = email;
        this.social = social;
    }
    
    public static OAuthAttributes of(String socialName, String userNameAttributeName, Map<String, Object> attributes){        
        if("kakao".equals(socialName)){
            return ofKakao(userNameAttributeName, attributes);
        }else if("naver".equals(socialName)) {
        	return ofNaver(userNameAttributeName, attributes);
        }
        return null;
    }
    
    private static OAuthAttributes ofNaver(String userNameAttributeName, Map<String, Object> attributes) {
        Map<String, Object> response = (Map<String, Object>)attributes.get("response");
        return OAuthAttributes.builder()
                .name((String) response.get("nickname"))
                .email((String) response.get("email"))
                .social(ProviderType.N)
                .attributes(response)
                .nameAttributeKey(userNameAttributeName)
                .build();
    }
    
    private static OAuthAttributes ofKakao(String userNameAttributeName, Map<String, Object> attributes) {
        @SuppressWarnings("unchecked")
		Map<String, Object> kakaoAccount = (Map<String, Object>)attributes.get("kakao_account");
        @SuppressWarnings("unchecked")
		Map<String, Object> kakaoProfile = (Map<String, Object>)kakaoAccount.get("profile");
        
        System.out.println(kakaoProfile);
        
        return OAuthAttributes.builder()
                .name((String) kakaoProfile.get("nickname"))
                .email((String) kakaoAccount.get("email"))
                .nameAttributeKey(userNameAttributeName)
                .attributes(attributes)
                .build();
    }
    
    public User toEntity(){
        return User.builder()
                .nickName(name)
                .email(email)
                .roleType(RoleType.USER)
                .build();
    }
}