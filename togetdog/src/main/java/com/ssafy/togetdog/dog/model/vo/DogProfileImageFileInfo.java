package com.ssafy.togetdog.dog.model.vo;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class DogProfileImageFileInfo {
	private String saveFolder;
	private String originalFile;
	private String saveFile;
}
