package com.ssafy.togetdog.global.util;

import java.io.File;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.UUID;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import com.ssafy.togetdog.dog.model.service.DogServiceImpl;
import com.ssafy.togetdog.global.exception.InvalidInputException;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class FileUploadUtil {

	private final Logger logger = LoggerFactory.getLogger(DogServiceImpl.class);
	
	public String fileUpload(MultipartFile image, String path) throws IllegalStateException, IOException {
		String originalFileName = image.getOriginalFilename();

		String today = new SimpleDateFormat("yyMMdd").format(new Date());
		String saveFolder = path + File.separator + today;
		
		File folder = new File(saveFolder);
		if (!folder.exists())
			folder.mkdirs();

		if (!originalFileName.isEmpty()) {
			String saveFileName = UUID.randomUUID().toString()
					+ originalFileName.substring(originalFileName.lastIndexOf('.'));
			logger.debug("registDog save path : {}", saveFolder + "/" + saveFileName);
			image.transferTo(new File(folder, saveFileName));
			return today + File.separator + saveFileName;
		} else {
			throw new InvalidInputException();
		}
	}
}
