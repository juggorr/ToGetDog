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

import com.ssafy.togetdog.appointment.model.entity.Appointment;
import com.ssafy.togetdog.appointment.model.entity.SentAppointment;
import com.ssafy.togetdog.appointment.model.repository.AppointmentRepository;
import com.ssafy.togetdog.appointment.model.repository.SentAppointmentRepository;
import com.ssafy.togetdog.board.model.repository.BoardRepository;
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
import com.ssafy.togetdog.notify.model.repository.NotifyRepository;
import com.ssafy.togetdog.notify.model.service.NotifyService;
import com.ssafy.togetdog.user.model.entity.User;
import com.ssafy.togetdog.user.model.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class DogServiceImpl implements DogService {

	private final UserRepository userRepository;
	private final DogRepository dogRepository;
	private final AppointmentRepository appointmentRepository;
	private final SentAppointmentRepository sentAppointmentRepository;
	private final NotifyRepository notifyRepository;
	private final BoardRepository boardRepository;

	private final NotifyService notifyService;

	private final FileUtil fileUtil;

	@Value("${file.path.upload-images-dogs}")
	private String dogImageFilePath;

	/* 강아지 정보 조회하기 */
	@Override
	public DogInfoRespDTO getDogInfo(String dogid) throws NumberFormatException {
		long dogId = Long.parseLong(dogid);
		Dog dog = findDogByDogId(dogId);
		if (dog == null) {
			throw new InvalidInputException("강아지 정보를 찾을 수 없습니다.");
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
			throws IllegalStateException, IOException, InvalidInputException, ExcessNumberOfDogsException {
		if (dogDTO == null || image.isEmpty()) {
			throw new InvalidInputException("필요한 값이 들어오지 않았습니다.");
		}
		if (user == null) {
			throw new UnAuthorizedException("등록 권한이 없는 사용자의 접근입니다.");
		}
		checkInsertPossible(user);
		checkRegistrationValidation(dogDTO);
		String savePath = fileUtil.fileUpload(image, dogImageFilePath);
		dogRepository.save(dogDTO.of(dogDTO, user, savePath));
	}

	/* 강아지 정보 삭제하기 */
	@Override
	public void deleteDog(long userId, String dogid) {
		Dog dog = findDogByDogId(Long.parseLong(dogid));
		User user = userRepository.findById(userId).orElse(null);
		if (dog == null || user == null) {
			throw new InvalidInputException("강아지 또는 회원 정보를 찾을 수 없습니다.");
		}
		if (dog.getUser().getUserId() != userId) {
			throw new UnAuthorizedException("삭제 권한이 없는 사용자의 접근입니다.");
		}
		cancelAppointments(user, dog);
		deleteNotifications(dog);
		deleteBoardByDog(dog);
		fileUtil.fileDelete(dog.getDogImage(), dogImageFilePath);
		nullifyDogInformation(dog);
		dogRepository.save(dog);
	}

	// 산책 약속을 잡아놓은 상태일때, 취소 알림을 전송하고 삭제
	// 강아지를 삭제하고자 하는 유저가 보낸 산책요청들을 전부 조회
	private void cancelAppointments(User user, Dog dog) {
		List<Appointment> appointments = appointmentRepository.findAllBySentUser(user);
		for (Appointment appointment : appointments) {
			List<SentAppointment> sentInfos = sentAppointmentRepository.findAllByAppointment(appointment);
			for (SentAppointment sentInfo : sentInfos) {
				if (sentInfo.getDog().getDogId() == dog.getDogId()) {
					notifyService.insertCancelNotify(appointment);
					appointment.setStatus("cancelled");
					appointmentRepository.save(appointment);
				}
			}
		}
	}

	private void deleteNotifications(Dog dog) {
		notifyRepository.deleteAllByDogId(dog.getDogId());
	}
	
	private void deleteBoardByDog(Dog dog) {
		boardRepository.deleteAllByDog(dog);
	}

	private void nullifyDogInformation(Dog dog) {
		dog.setUser(null);
		dog.setDogName("deleted");
		dog.setDogImage(null);
		dog.setDescription(null);
	}

	/* 강아지 정보 수정하기 */
	@Override
	public void updateDog(User user, DogUpdateParamDTO dogDTO, MultipartFile image)
			throws IllegalStateException, IOException, InvalidInputException {
		if (dogDTO == null) {
			throw new InvalidInputException("The parameter value is empty.");
		}
		if (user == null) {
			throw new UnAuthorizedException("Access from a user that cannot be found.");
		}
		checkRegistrationValidation(dogDTO);
		Dog dog = findDogByDogId(dogDTO.getDogId());
		
		dog.setDogName(dogDTO.getDogName());
	    dog.setDogGender(getDogGender(dogDTO.getDogGender()));
	    dog.setDogType(dogDTO.getDogType());
	    dog.setDogBirth(dogDTO.getDogBirth());
	    dog.setDogWeight(dogDTO.getDogWeight());
	    dog.setDogNeutered(dogDTO.isDogNeutered());
	    dog.setDogCharacter1(dogDTO.getDogCharacter1().charAt(0) + "");
	    dog.setDogCharacter2(dogDTO.getDogCharacter2().charAt(0) + "");
	    dog.setDescription(dogDTO.getDescription());

	    if (image != null && !image.isEmpty()) {
	        fileUtil.fileDelete(dog.getDogImage(), dogImageFilePath);
	        String savePath = fileUtil.fileUpload(image, dogImageFilePath);
	        dog.setDogImage(savePath);
	    }
	    dogRepository.save(dog);
	}
	
	private String getDogGender(String gender) {
	    return gender.equals("female") ? "f" : "m";
	}

	@Override
	public void checkInsertPossible(User user) {
		List<Dog> dogs = findDogsByUser(user);
		if (dogs.size() >= 3) {
			throw new ExcessNumberOfDogsException("해당 유저에게" + dogs.size() + "마리가 이미 등록되어 있어서 더 이상 등록이 불가합니다.");
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
		List<DogInfoForUserDTO> dogList = dogs.stream().map(d -> DogInfoForUserDTO.of(d)).collect(Collectors.toList());
		return dogList;
	}

	///////////////////////////////
	/***
	 * Validation for Dog Registration
	 * 
	 * @param DogRegistParamDTO
	 */
	public void checkRegistrationValidation(DogRegistParamDTO dogDTO) {
		String dogNameRegexp = "^[가-힇]{1,5}$";
		if (!Pattern.matches(dogNameRegexp, dogDTO.getDogName())) {
			throw new InvalidInputException("올바르지 않은 강아지 이름입니다.");
		}
		String dogGender = dogDTO.getDogGender();
		if (!dogGender.equals("male") && !dogGender.equals("female")) {
			throw new InvalidInputException("올바르지 않은 강아지 성별 값입니다.");
		}
		if (dogDTO.getDogBirth().length() != 6 || dogDTO.getDogWeight().length() > 4) {
			throw new InvalidInputException("올바르지 않은 강아지 생년월일입니다.");
		}
		try {
			int birthYear = Integer.parseInt(dogDTO.getDogBirth().substring(0, 4));
			int birthMonth = Integer.parseInt(dogDTO.getDogBirth().substring(4, 6));
			LocalDateTime now = LocalDateTime.now();
			if (birthYear < 1990 || birthMonth < 1 || birthMonth > 12 || birthYear > now.getYear()
					|| (birthYear == now.getYear() && birthMonth > now.getMonthValue())) {
				throw new InvalidInputException("올바르지 않은 강아지 생년월일입니다.");
			}
			Double.parseDouble(dogDTO.getDogWeight());
		} catch (NumberFormatException e) {
			throw new InvalidInputException("깅아지 생년월일 값이 숫자가 아닙니다.");
		}
		if (!dogDTO.getDogCharacter1().equals("obedient") && !dogDTO.getDogCharacter1().equals("disobedient")) {
			throw new InvalidInputException("강아지 성격1이 올바르지 않습니다.");
		}
		if (!dogDTO.getDogCharacter2().equals("active") && !dogDTO.getDogCharacter2().equals("inactive")) {
			throw new InvalidInputException("강아지 성격2가 올바르지 않습니다.");
		}
		if (dogDTO.getDescription().length() > 40) {
			throw new InvalidInputException("강아지 특성정보 길이가 너무 깁니다.");
		}
	}

}
