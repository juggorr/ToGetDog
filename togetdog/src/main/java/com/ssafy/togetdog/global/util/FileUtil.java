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
public class FileUtil {

	private final Logger logger = LoggerFactory.getLogger(DogServiceImpl.class);
	
	/***
	 * File upload logic
	 * @param image : 실제 업로드할 MultipartFile 객체
	 * @param path : application.properties에 등록된 path를 @Value로 받아와서 넣어주시면 됩니다.
	 * @return String : db에 저장될 이름을 return합니다. 받아서 db에 저장해주시면 됩니다.
	 * @throws IllegalStateException
	 * @throws IOException
	 */
	public String fileUpload(MultipartFile image, String path) throws IllegalStateException, IOException {
		// InetAddress : 부팅시 한번만 static으로 사용하지 않으면 성능이슈가 있다고 합니다.
		// String hostname = InetAddress.getLocalHost().getHostName();
		
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
	
	/***
	 * File delete logic
	 * @param dbSaveImage : DB에 저장되어있는 image 경로
	 * @param path : application.properties에 등록된 path를 @Value로 받아와서 넣어주시면 됩니다.
	 * @return
	 */
	public void fileDelete(String dbSaveImage, String path) {
		File file = new File(path + File.separator + dbSaveImage);
		file.delete();
	}
}
