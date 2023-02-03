package com.ssafy.togetdog.dog.model.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class DogInfoForUserDTO extends DogInfoRespDTO {
	private int dogFollwerCnt;
}
