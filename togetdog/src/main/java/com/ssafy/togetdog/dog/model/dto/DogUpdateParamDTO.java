package com.ssafy.togetdog.dog.model.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString(callSuper = true)
public class DogUpdateParamDTO extends DogRegistParamDTO {
	private long dogId;
}
