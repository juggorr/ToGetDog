package com.ssafy.togetdog.user.model.vo;

import lombok.AllArgsConstructor;
import lombok.Getter;
import java.util.Arrays;

@Getter
@AllArgsConstructor
public enum RoleType {
	
	// ! 수정하지마세요
	// 스프링 시큐리티에서 권한 코드에 항상 맨 앞에 ROLE_ 이 있어야 합니다.
	
	USER("ROLE_USER", "일반 사용자 권한"),
    ADMIN("ROLE_ADMIN", "관리자 권한");

    private final String code;
    private final String displayName;

    public static RoleType of(String code) {
        return Arrays.stream(RoleType.values())
                .filter(r -> r.getCode().equals(code))
                .findAny()
                .orElse(USER);
    }
}
