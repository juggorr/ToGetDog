package com.ssafy.togetdog.dog.model.service;

import java.io.File;
import java.io.IOException;
import java.net.InetAddress;
import java.text.SimpleDateFormat;
import java.time.LocalDateTime;
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
import com.ssafy.togetdog.dog.model.dto.DogUpdateParamDTO;
import com.ssafy.togetdog.dog.model.entity.Dog;
import com.ssafy.togetdog.dog.model.repository.DogRepository;
import com.ssafy.togetdog.global.exception.InvalidInputException;
import com.ssafy.togetdog.global.exception.UnAuthorizedException;
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
			throws IllegalStateException, IOException, InvalidInputException {
		if (dogDTO == null || image.isEmpty()) {
			throw new InvalidInputException();
		}
		if (user == null) {
			throw new UnAuthorizedException();
		}
		
		String hostname = InetAddress.getLocalHost().getHostName();
		System.out.println("호스트 서버 이름~~~~~~~~~~~" + hostname);
		
		checkRegistrationValidation(dogDTO);
		String originalFileName = image.getOriginalFilename();

		String today = new SimpleDateFormat("yyMMdd").format(new Date());
		String saveFolder = dogImageFilePath + File.separator + today;

		File folder = new File(saveFolder);
		if (!folder.exists())
			folder.mkdirs();

		if (!originalFileName.isEmpty()) {
			String saveFileName = UUID.randomUUID().toString()
					+ originalFileName.substring(originalFileName.lastIndexOf('.'));
			logger.debug("registDog save path : {}", saveFolder + saveFileName);
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
	
	/* 강아지 정보 삭제하기 */
	@Override
	public void deleteDog(long userId, String dogid) {
		long dogId = Long.parseLong(dogid);
		Dog dog = findDogByDogId(dogId);
		if (dog == null) {
			throw new InvalidInputException();
		}
		if (dog.getUser().getUserId() != userId) {
			throw new UnAuthorizedException();
		}
		File file = new File(dog.getDogImage());
		file.delete();
		dogRepository.delete(dog);
	}
	
	/* 강아지 정보 수정하기 */
	@Override
	public void updateDog(User user, DogUpdateParamDTO dogDTO, MultipartFile image)
			throws IllegalStateException, IOException {
		if (dogDTO == null) {
			throw new InvalidInputException();
		}
		if (user == null) {
			throw new UnAuthorizedException();
		}
		checkRegistrationValidation(dogDTO);
		Dog dog = findDogByDogId(dogDTO.getDogId());
		// file 수정은 안해도 되는 경우
		if (image.isEmpty()) {
			dog.setDogName(dogDTO.getDogName());
			dog.setDogGender(dogDTO.getDogGender());
			dog.setDogType(dogDTO.getDogType());
			dog.setDogBirth(dogDTO.getDogBirth());
			dog.setDogWeight(dogDTO.getDogWeight());
			dog.setDogNeutered(dogDTO.isDogNeutered());
			dog.setDogCharacter1(dogDTO.getDogCharacter1());
			dog.setDogCharacter2(dogDTO.getDogCharacter2());
			dog.setDescription(dogDTO.getDescription());
			
			dogRepository.save(dog);
		} else {
			// 기존 file 삭제
			File file = new File(dog.getDogImage());
			file.delete();
			
			String originalFileName = image.getOriginalFilename();
			String today = new SimpleDateFormat("yyMMdd").format(new Date());
			String saveFolder = dogImageFilePath + File.separator + today;
			File folder = new File(saveFolder);
			if (!folder.exists()) folder.mkdirs();
			if (!originalFileName.isEmpty()) {
				String saveFileName = UUID.randomUUID().toString()
						+ originalFileName.substring(originalFileName.lastIndexOf('.'));
				logger.debug("updateDog save path : {}", saveFolder + saveFileName);
				image.transferTo(new File(folder, saveFileName));
				
				dog.setDogName(dogDTO.getDogName());
				dog.setDogGender(dogDTO.getDogGender());
				dog.setDogType(dogDTO.getDogType());
				dog.setDogBirth(dogDTO.getDogBirth());
				dog.setDogWeight(dogDTO.getDogWeight());
				dog.setDogNeutered(dogDTO.isDogNeutered());
				dog.setDogCharacter1(dogDTO.getDogCharacter1());
				dog.setDogCharacter2(dogDTO.getDogCharacter2());
				dog.setDescription(dogDTO.getDescription());
				dog.setDogImage(saveFolder + saveFileName);
				dogRepository.save(dog);
			} else {
				throw new InvalidInputException();
			}
		}
	}
	
	///////////////////////////////

	/***
	 * Validation for Dog Registration
	 * @param DogRegistParamDTO
	 */
	public void checkRegistrationValidation(DogRegistParamDTO dogDTO) {
		String dogNameRegexp = "^[가-힇]{1,5}$";

		if (!Pattern.matches(dogNameRegexp, dogDTO.getDogName())) {
			throw new InvalidInputException();
		}
		String dogGender = dogDTO.getDogGender();
		if (!dogGender.equals("male") && !dogGender.equals("female")) {
			throw new InvalidInputException();
		}
		if (dogDTO.getDogBirth().length() > 6 || dogDTO.getDogWeight().length() > 4)  {
			throw new InvalidInputException();
		}
		try {
			int birthYear = Integer.parseInt(dogDTO.getDogBirth().substring(0, 4));
			int birthMonth = Integer.parseInt(dogDTO.getDogBirth().substring(4, 6));
			LocalDateTime now = LocalDateTime.now();
			if (birthYear < 1990 || birthMonth < 1 || birthMonth > 12 || birthYear > now.getYear()
					|| (birthYear == now.getYear() && birthMonth > now.getMonthValue())) {
				throw new InvalidInputException();
			}
			Double.parseDouble(dogDTO.getDogWeight());
		} catch (NumberFormatException e) {
			throw new InvalidInputException();
		}
		if (!dogDTO.getDogCharacter1().equals("obedient") && !dogDTO.getDogCharacter1().equals("disobedient")) {
			throw new InvalidInputException();
		}
		if (!dogDTO.getDogCharacter2().equals("active") && !dogDTO.getDogCharacter2().equals("inacvice")) {
			throw new InvalidInputException();
		}
		if (dogDTO.getDescription().length() > 40) {
			throw new InvalidInputException();
		}
	}

}
