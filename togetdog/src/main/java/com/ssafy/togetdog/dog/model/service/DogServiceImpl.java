package com.ssafy.togetdog.dog.model.service;

import java.io.File;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.util.Date;
import java.util.UUID;
import java.util.regex.Pattern;

import javax.transaction.Transactional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.ssafy.togetdog.dog.model.dto.DogInfoRespDTO;
import com.ssafy.togetdog.dog.model.dto.DogRegistParamDTO;
import com.ssafy.togetdog.dog.model.entity.Dog;
import com.ssafy.togetdog.dog.model.repository.DogRepository;
import com.ssafy.togetdog.global.exception.InvalidInputException;
import com.ssafy.togetdog.global.exception.UnAuthorizedException;
import com.ssafy.togetdog.user.model.dto.UserRegistParamDTO;
import com.ssafy.togetdog.user.model.dto.UserUpdateParamDTO;
import com.ssafy.togetdog.user.model.entity.User;

import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class DogServiceImpl implements DogService {

	private final DogRepository dogRepository;
	private final Logger logger = LoggerFactory.getLogger(DogServiceImpl.class);

	@Value("${file.path.upload-images-dogs}")
	private String dogImageFilePath;

	/* 강아지 정보 조회하기 */
	@Override
	public DogInfoRespDTO getDogInfo(String dogid) throws NumberFormatException {
		long dogId = Long.parseLong(dogid);
		Dog dog = findDogByDogId(dogId);
		if (dog == null) {
			throw new InvalidInputException();
		} else {
			double dogWeight = Double.parseDouble(dog.getDogWeight());
			return DogInfoRespDTO.of(dog, dogWeight);
		}
	}

	@Override
	public Dog findDogByDogId(long dogId) {
		return dogRepository.findById(dogId).orElse(null);
	}

	/* 강아지 정보 등록하기 */
	@Override
	public void registDog(User user, DogRegistParamDTO dogDTO, MultipartFile image)
			throws IllegalStateException, IOException {
		if (dogDTO == null || image.isEmpty()) {
			throw new InvalidInputException();
		}
		if (user == null) {
			throw new UnAuthorizedException();
		}
		String originalFileName = image.getOriginalFilename();

		String today = new SimpleDateFormat("yyMMdd").format(new Date());
		String saveFolder = dogImageFilePath + File.separator + today;
		logger.debug("저장 폴더 : {}", saveFolder);

		File folder = new File(saveFolder);
		if (!folder.exists())
			folder.mkdirs();

		if (!originalFileName.isEmpty()) {
			String saveFileName = UUID.randomUUID().toString()
					+ originalFileName.substring(originalFileName.lastIndexOf('.'));
			logger.debug("원본 파일 이름 : {}, 실제 저장 파일 이름 : {}", image.getOriginalFilename(), saveFileName);

			// 실제 저장
			image.transferTo(new File(folder, saveFileName));

			Dog dog = Dog.builder()
					.user(user)
					.dogName(dogDTO.getDogName())
					.dogGender(dogDTO.getDogGender())
					.dogType(dogDTO.getDogType())
					.dogBirth(dogDTO.getDogBirth())
					.dogWeight(dogDTO.getDogWeight())
					.dogNeutered(dogDTO.isDogNeutered())
					.dogCharacter1(dogDTO.getDogCharacter1())
					.dogCharacter2(dogDTO.getDogCharacter2())
					.description(dogDTO.getDescription())
					.dogImage(saveFolder + saveFileName).build();

			// DB 저장
			dogRepository.save(dog);
		} else {
			throw new InvalidInputException();
		}

	}
///////////////////////////////

	/***
	 * Validation for User Registration
	 * 
	 * @param userRegistParamDTO
	 */
	public void checkRegistrationValidation(DogRegistParamDTO dogDTO) {
		String dogNameRegexp = "^[가-힇]{1,5}$";
		String dogTypeRegexp = "^[가-힇]{1, 25}$";

		if (!Pattern.matches(dogNameRegexp, dogDTO.getDogName())) {
			throw new InvalidInputException();
		}
		if (!Pattern.matches(dogTypeRegexp, dogDTO.getDogType())) {
			throw new InvalidInputException();
		}
		String dogGender = dogDTO.getDogGender();
		if (!dogGender.equals("male") && !dogGender.equals("female")) {
			throw new InvalidInputException();
		}
		String dogBirth = dogDTO.getDogBirth();
		try {
			
		} catch (NumberFormatException e) {
			throw new InvalidInputException();
		}
		if (dogGender.length() > 6)  {
			
		}
	}

}
