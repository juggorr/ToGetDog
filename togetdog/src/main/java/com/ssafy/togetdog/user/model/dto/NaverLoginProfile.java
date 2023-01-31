package com.ssafy.togetdog.user.model.dto;

import lombok.Data;

@Data
public class NaverLoginProfile {
    private String id;
    private String nickname;
    private String name;
    private String email;
    private String gender;
    private String age;
    private String birthday;
    private String birthyear;

}