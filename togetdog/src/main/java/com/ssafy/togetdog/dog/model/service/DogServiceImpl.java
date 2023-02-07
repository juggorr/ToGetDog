package com.ssafy.togetdog.dog.model.service;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.List;
import java.util.regex.Pattern;
import java.util.stream.Collectors;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.ssafy.togetdog.dog.model.dto.DogInfoForUserDTO;
import com.ssafy.togetdog.dog.model.dto.DogInfoRespDTO;
import com.ssafy.togetdog.dog.model.dto.DogRegistParamDTO;
import com.ssafy.togetdog.dog.model.dto.DogUpdateParamDTO;
import com.ssafy.togetdog.dog.model.entity.Dog;
import com.ssafy.togetdog.dog.model.repository.DogRepository;
import com.ssafy.togetdog.global.exception.ExcessNumberOfDogsException;
import com.ssafy.togetdog.global.exception.InvalidInputException;
import com.ssafy.togetdog.global.exception.UnAuthorizedException;
import com.ssafy.togetdog.global.util.FileUtil;
import com.ssafy.togetdog.user.model.entity.User;

import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class DogServiceImpl implements DogService {

	private final DogRepository dogRepository;
	private final FileUtil fileUtil;

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
			throws IllegalStateException, IOException, ExcessNumberOfDogsException {
		if (dogDTO == null || image.isEmpty()) {
			throw new InvalidInputException();
		}
		if (user == null) {
			throw new UnAuthorizedException();
		}
		try {
			checkInsertPossible(user);
			checkRegistrationValidation(dogDTO);
			String savePath = fileUtil.fileUpload(image, dogImageFilePath);
			dogRepository.save(dogDTO.of(dogDTO, user, savePath));
		} catch(InvalidInputException e) {
			throw new InvalidInputException();
		} catch (ExcessNumberOfDogsException e) {
			throw new ExcessNumberOfDogsException();
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
		fileUtil.fileDelete(dog.getDogImage(), dogImageFilePath);
		dogRepository.delete(dog);
	}
	
	/* 강아지 정보 수정하기 */
	@Override
	public void updateDog(User user, DogUpdateParamDTO dogDTO, MultipartFile image)
			throws IllegalStateException, IOException, InvalidInputException {
		if (dogDTO == null) {
			throw new InvalidInputException();
		}
		if (user == null) {
			throw new UnAuthorizedException();
		}
		checkRegistrationValidation(dogDTO);
		Dog dog = findDogByDogId(dogDTO.getDogId());
		
		// file 변경이 없는 경우
		if (image.isEmpty()) {
			dogRepository.save(dogDTO.of(dogDTO, dog, user));
		} else {
			// file 변경이 있는 경우
			fileUtil.fileDelete(dog.getDogImage(), dogImageFilePath);
			String savePath = fileUtil.fileUpload(image, dogImageFilePath);
			dogRepository.save(dogDTO.of(dogDTO, dog, user, savePath));
		}
	}
	

	@Override
	public void checkInsertPossible(User user) {
		List<Dog> dogs = findDogsByUser(user);
		if (dogs.size() > 3) {
			throw new ExcessNumberOfDogsException();
		}
	}

	@Override
	public List<Dog> findDogsByUser(User user) {
		return dogRepository.findAllByUser(user).orElse(null);
	}
	
	@Override
	public List<DogInfoForUserDTO> findDogsByUserId(long userId) {
		User user = new User();
		user.setUserId(userId);
		List<Dog> dogs = findDogsByUser(user);
		List<DogInfoForUserDTO> dogList = dogs.stream().map(d ->DogInfoForUserDTO.of(d))
				 .collect(Collectors.toList());
		return dogList;
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
		if (dogDTO.getDogBirth().length() != 6 || dogDTO.getDogWeight().length() > 4)  {
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
		if (!dogDTO.getDogCharacter2().equals("active") && !dogDTO.getDogCharacter2().equals("inactive")) {
			throw new InvalidInputException();
		}
		if (dogDTO.getDescription().length() > 40) {
			throw new InvalidInputException();
		}
	}

}

