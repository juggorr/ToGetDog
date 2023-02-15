package com.ssafy.togetdog.user.model.service;

import java.time.LocalDate;
import java.util.List;
import java.util.regex.Pattern;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ssafy.togetdog.appointment.model.entity.Appointment;
import com.ssafy.togetdog.appointment.model.repository.AppointmentRepository;
import com.ssafy.togetdog.board.model.repository.BoardRepository;
import com.ssafy.togetdog.dog.model.repository.DogRepository;
import com.ssafy.togetdog.global.exception.DuplicatedInputException;
import com.ssafy.togetdog.global.exception.InvalidInputException;
import com.ssafy.togetdog.global.exception.InvalidLoginActingException;
import com.ssafy.togetdog.global.exception.unAuthWaitUserException;
import com.ssafy.togetdog.notify.model.repository.NotifyRepository;
import com.ssafy.togetdog.user.model.dto.EmailAuthParamDTO;
import com.ssafy.togetdog.user.model.dto.UserInfoRespDTO;
import com.ssafy.togetdog.user.model.dto.UserLoginParamDTO;
import com.ssafy.togetdog.user.model.dto.UserRegistParamDTO;
import com.ssafy.togetdog.user.model.dto.UserSocialRegistParamDTO;
import com.ssafy.togetdog.user.model.dto.UserUpdateParamDTO;
import com.ssafy.togetdog.user.model.entity.User;
import com.ssafy.togetdog.user.model.entity.WaitUser;
import com.ssafy.togetdog.user.model.repository.UserRepository;
import com.ssafy.togetdog.user.model.repository.WaitUserRepository;

import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

	public static final Logger logger = LoggerFactory.getLogger(UserServiceImpl.class);

	private final PasswordEncoder passwordEncoder;
	private final UserRepository userRepository;
	private final WaitUserRepository waitUserRepository;
	private final DogRepository dogRepository;
	private final BoardRepository boardRepository;
	private final NotifyRepository notifyRepository;
	private final AppointmentRepository appointmentRepository;

	/* 회원 가입을 위한 이메일 전송 */
	@Override
	public void tmpRegistration(UserRegistParamDTO userDTO, String authKey)
			throws InvalidInputException, DuplicatedInputException {
		checkRegistrationValidation(userDTO);
		WaitUser user = waitUserRepository.findByEmail(userDTO.getEmail()).orElse(null);
		if (user != null) {
			throw new DuplicatedInputException("이미 등록되어 있는 이메일입니다.");
		}
		userDTO.setPassword(passwordEncoder.encode(userDTO.getPassword()));
		WaitUser newUser = userDTO.of(authKey);
		waitUserRepository.save(newUser);
	}
	
	/*회원 가입처리*/
	@Override
	public void registration(WaitUser user) {
		try {
			userRepository.save(user.toUser());
			waitUserRepository.delete(user);
		} catch (Exception e) {
			logger.error("Unexpected error! : " + e.getMessage());
		}
	}
	
	/* 소셜회원 가입처리*/
	@Override
	public void socialRegist(UserSocialRegistParamDTO userDTO) {
		checkSocialRegistrationValidation(userDTO);
		userRepository.save(UserSocialRegistParamDTO.of(userDTO));
	}
	
	/*회원가입 인증 메일 처리*/
	@Override
	public void registEmailAuth(EmailAuthParamDTO authDTO) {
		WaitUser tmpUser = findWaitUserByEmail(authDTO.getEmail());
		if (tmpUser != null && tmpUser.getAuthKey().equals(authDTO.getAuthKey())) {
			registration(tmpUser);
		} else {
			throw new InvalidInputException("이메일이나 인증키가 유효하지 않습니다.");
		}
	}
	
	/*로그인 처리*/
	@Override
	public User loginService(UserLoginParamDTO loginDTO) {
		//이메일 인증 대기 대상 판별하기
		WaitUser waitUser = findWaitUserByEmail(loginDTO.getEmail()); 
		if (waitUser != null) {
			throw new unAuthWaitUserException("가입 대기중인 유저입니다.");
		}
		User user = findUserByEmailAndPassword(loginDTO.getEmail(), loginDTO.getPassword());
		if (user == null) {
			throw new InvalidLoginActingException("이메일과 비밀번호가 일치하지 않습니다.");
		} else {
			return user;
		}
	}
	
	/*이메일 중복 체크*/
	@Override
	public void emailDuplicateCheck(String email) {
		WaitUser waitUser = findWaitUserByEmail(email);
		User user = findUserByEmail(email);
		if (user != null || waitUser != null) {
			throw new DuplicatedInputException("중복된 이메일 입니다.");
		}
	}
	
	/*닉네임 중복 체크*/
	@Override
	public void nickNameDuplicateCheck(String nickname) {
		WaitUser waitUser = findWaitUserByNickName(nickname);
		User user = findUserByNickName(nickname);
		if (user != null || waitUser != null) {
			throw new DuplicatedInputException("중복된 닉네임입니다.");
		}
	}
	
	/*회원 정보 조회*/
	@Override
	public UserInfoRespDTO getUserInfo(String userid) throws NumberFormatException {
		long userId = Long.parseLong(userid);
		User user = findUserByUserId(userId);
		if (user != null) {
			return UserInfoRespDTO.of(user);
		} else {
			throw new InvalidInputException("입력된 값으로 회원 정보를 찾을 수 없습니다.");
		}
	}
	
	/*회원 정보 수정*/
	@Override
	public void updateUserInfo(long userId, UserUpdateParamDTO userDTO) {
		checkUpdateValidation(userDTO);
		userDTO = UserUpdateParamDTO.of(userDTO);
		User user = findUserByUserId(userId);
		if (user != null) {
			user.setNickName(userDTO.getNickName());
			user.setGender(userDTO.getGender());
			user.setUserBirth(userDTO.getBirth());
			user.setAddress(userDTO.getAddress());
			user.setRegionCode(userDTO.getRegionCode());
			userRepository.save(user);
		}
	}
	
	/* 회원 탈퇴 */
	@Override
	public void withdrawal(long userId) {
		User user = findUserByUserId(userId);
		if (user != null) {			
			// 사용자가 남긴 게시물 및 댓글 삭제
			boardRepository.deleteAllByUser(user);
			// 사용자가 가지고 있는 강아지 삭제
			dogRepository.deleteAllByUser(user);
			// 사용자가 받았던 알람 리스트 삭제
			notifyRepository.deleteAllByReceiver(user);
			// 사용자에게 예정된 약속이 있을 때 취소 시키기
			updateAppointmentByUser(user);
			
			user.setEmail("deletedUser" + userId);
			user.setNickName("deletedUser" + userId);
			user.setPassword("deletedUser" + userId);
			user.setUserBirth(null);
			user.setGender(null);
			user.setAddress(null);
			user.setRegionCode(null);
			user.setSocial(null);
			userRepository.save(user);
		} else {
			throw new InvalidInputException("회원 정보를 찾을 수 없습니다.");
		}
	}
	
	public void updateAppointmentByUser(User user) {
		// 확정된 약속은 취소처리
		List<Appointment> confirmedList = appointmentRepository.findStatusList("confirmed", user.getUserId(), user.getUserId());
		for (Appointment appointment : confirmedList) {
			appointment.setStatus("cancelled");
			appointmentRepository.save(appointment);
		}
		// 대기중이던 약속은 삭제 처리
		List <Appointment> waitList = appointmentRepository.findStatusList("wait", user.getUserId(), user.getUserId());
		for (Appointment appointment : waitList) {
			appointmentRepository.delete(appointment);
		}
	}
	
	////////////////
	// 범용 method //
	///////////////

	@Override
	public User findUserByEmailAndPassword(String email, String password) {
		User user = userRepository.findByEmail(email).orElse(null);
		if (user != null) {
			if (passwordEncoder.matches(password, user.getPassword())) {
				return user;
			}
		}
		return null;
	}
	
	@Override
	public User findUserByEmail(String email) {
		return userRepository.findByEmail(email).orElse(null);
	}

	@Override
	public User findUserByNickName(String nickName) {
		return userRepository.findByNickName(nickName).orElse(null);
	}
	
	@Override
	public User findUserByUserId(long userId) {
		return userRepository.findById(userId).orElse(null);
	}

	@Override
	public void updatePassword(long userId, String password, String newPassword) {
		User user = userRepository.findById(userId).orElse(null);
		if (user != null) {
			if (passwordEncoder.matches(password, user.getPassword())) {
				user.setPassword(passwordEncoder.encode(newPassword));
				userRepository.save(user);
			} else {
				throw new InvalidInputException("기존 비밀번호가 입력한 비밀번호와 일치하지 않습니다.");
			}
		}
	}

	@Override
	public void updateTmpPassword(long userId, String tmpPassword) {
		User user = userRepository.findById(userId).orElse(null);
		if (user != null) {
			user.setPassword(passwordEncoder.encode(tmpPassword));
			userRepository.save(user);
		}
	}
	
	@Override
	public void deleteUser(long userId) {
		userRepository.deleteById(userId);
	}
	
	@Override
	public WaitUser findWaitUserByEmail(String email) {
		return waitUserRepository.findByEmail(email).orElse(null);
	}

	@Override
	public WaitUser findWaitUserByNickName(String nickname) {
		return waitUserRepository.findByNickName(nickname).orElse(null);
	}
	
	/////////////////
	// 유효성 method //
	////////////////

	/***
	 * Validation for User Registration
	 * 
	 * @param userRegistParamDTO
	 */
	public void checkRegistrationValidation(UserRegistParamDTO userDTO) {
		String emailRegexp = "^[a-zA-Z0-9+-\\_.]+@[a-zA-Z0-9-]+\\.[a-zA-Z0-9-.]+$";
		String passwordRegexp = "^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,16}$";
		String nicknameRegexp = "^[a-zA-Z가-힇0-9]{2,16}$";
		String genderRegexp = "^female$|^male$|^none$";
		String regionCodeRegexp = "(^[0-9]{5}$)";
		
		// null check
		if (userDTO.getEmail() == null) {
			throw new InvalidInputException("이메일이 null입니다.");
		}
		if (userDTO.getNickname() == null) {
			throw new InvalidInputException("닉네임이 null입니다.");
		}
		if (userDTO.getGender() == null) {
			throw new InvalidInputException("성별이 null입니다.");
		}
		if (userDTO.getAddress() == null) {
			throw new InvalidInputException("주소 값이 null입니다.");
		}
		if (userDTO.getRegionCode() == null) {
			throw new InvalidInputException("지역코드 값이 null입니다.");
		}
		if (userDTO.getBirth() == null) {
			throw new InvalidInputException("생년월일 값이 null입니다.");
		}
		
		// email regexp check
		if (!Pattern.matches(emailRegexp, userDTO.getEmail())) {
			throw new InvalidInputException("이메일 입력값이 올바르지 않습니다.");
		}
		// password regexp check
		if (!Pattern.matches(passwordRegexp, userDTO.getPassword())) {
			throw new InvalidInputException("비밀번호 입력값이 올바르지 않습니다.");
		}
		// nickname regexp check
		if (!Pattern.matches(nicknameRegexp, userDTO.getNickname())) {
			throw new InvalidInputException("닉네임 입력값이 올바르지 않습니다.");
		}
		// gender regexp check
		if (!Pattern.matches(genderRegexp, userDTO.getGender())) {
			throw new InvalidInputException("성별 입력값이 올바르지 않습니다.");
		}
		// regionCode regexp check
		if (!Pattern.matches(regionCodeRegexp, userDTO.getRegionCode())) {
			throw new InvalidInputException("지역번호 값이 올바르지 않습니다.");
		}
		// birth check
		try {
			int birth = Integer.parseInt(userDTO.getBirth());
			LocalDate now = LocalDate.now();
			if (birth > now.getYear() || birth < 1900) {
				throw new InvalidInputException("생년월일 값이 올바르지 않습니다.");
			}
		} catch (NumberFormatException e) {
			throw new InvalidInputException("생년월일 값이 숫자가 아닙니다.");
		}
	}
	
	/***
	 * Validation for User SocialRegistration
	 * 
	 * @param userRegistParamDTO
	 */
	public void checkSocialRegistrationValidation(UserSocialRegistParamDTO userDTO) {
		String emailRegexp = "^[a-zA-Z0-9+-\\_.]+@[a-zA-Z0-9-]+\\.[a-zA-Z0-9-.]+$";
		String nicknameRegexp = "^[a-zA-Z가-힇0-9]{2,16}$";
		String genderRegexp = "^female$|^male$|^none$";
		String regionCodeRegexp = "(^[0-9]{5}$)";
		
		User user = userRepository.findByEmail(userDTO.getEmail()).orElse(null);
		if (user != null) {
			throw new DuplicatedInputException("이미 가입된 이메일입니다.");
		}
		
		// null check
		if (userDTO.getEmail() == null) {
			throw new InvalidInputException("이메일이 null입니다.");
		}
		if (userDTO.getNickname() == null) {
			throw new InvalidInputException("닉네임이 null입니다.");
		}
		if (userDTO.getGender() == null) {
			throw new InvalidInputException("성별이 null입니다.");
		}
		if (userDTO.getAddress() == null) {
			throw new InvalidInputException("주소 값이 null입니다.");
		}
		if (userDTO.getRegionCode() == null) {
			throw new InvalidInputException("지역코드 값이 null입니다.");
		}
		if (userDTO.getBirth() == null) {
			throw new InvalidInputException("생년월일 값이 null입니다.");
		}
		
		// email regexp check
		if (!Pattern.matches(emailRegexp, userDTO.getEmail())) {
			throw new InvalidInputException("이메일 입력값이 올바르지 않습니다.");
		}
		// nickname regexp check
		if (!Pattern.matches(nicknameRegexp, userDTO.getNickname())) {
			throw new InvalidInputException("닉네임 입력값이 올바르지 않습니다.");
		}
		// gender regexp check
		if (!Pattern.matches(genderRegexp, userDTO.getGender())) {
			throw new InvalidInputException("성별 입력값이 올바르지 않습니다.");
		}
		// regionCode regexp check
		if (!Pattern.matches(regionCodeRegexp, userDTO.getRegionCode())) {
			throw new InvalidInputException("지역번호 값이 올바르지 않습니다.");
		}
		// birth check
		try {
			int birth = Integer.parseInt(userDTO.getBirth());
			LocalDate now = LocalDate.now();
			if (birth > now.getYear() || birth < 1900) {
				throw new InvalidInputException("생년월일 값이 올바르지 않습니다.");
			}
		} catch (NumberFormatException e) {
			throw new InvalidInputException("생년월일 값이 숫자가 아닙니다.");
		}
	}

	/***
	 * Validation for User UpdateInfo
	 * 
	 * @param UserUpdateParamDTO
	 */
	public void checkUpdateValidation(UserUpdateParamDTO userDTO) {
		String nicknameRegexp = "^[a-zA-Z가-힇0-9]{2,16}$";
		String genderRegexp = "^female$|^male$|^none$";
		String regionCodeRegexp = "(^[0-9]{5}$)";
		
		// null check
		if (userDTO.getNickName() == null) {
			throw new InvalidInputException("닉네임이 null입니다.");
		}
		if (userDTO.getGender() == null) {
			throw new InvalidInputException("성별이 null입니다.");
		}
		if (userDTO.getAddress() == null) {
			throw new InvalidInputException("주소 값이 null입니다.");
		}
		if (userDTO.getRegionCode() == null) {
			throw new InvalidInputException("지역코드 값이 null입니다.");
		}
		if (userDTO.getBirth() == null) {
			throw new InvalidInputException("생년월일 값이 null입니다.");
		}
		
		// nickname regexp check
		if (!Pattern.matches(nicknameRegexp, userDTO.getNickName())) {
			throw new InvalidInputException("닉네임 입력값이 올바르지 않습니다.");
		}
		// gender regexp check
		if (!Pattern.matches(genderRegexp, userDTO.getGender())) {
			throw new InvalidInputException("성별 입력값이 올바르지 않습니다.");
		}
		// regionCode regexp check
		if (!Pattern.matches(regionCodeRegexp, userDTO.getRegionCode())) {
			throw new InvalidInputException("지역번호 값이 올바르지 않습니다.");
		}
		// birth check
		try {
			int birth = Integer.parseInt(userDTO.getBirth());
			LocalDate now = LocalDate.now();
			if (birth > now.getYear() || birth < 1900) {
				throw new InvalidInputException("생년월일 값이 올바르지 않습니다.");
			}
		} catch (NumberFormatException e) {
			throw new InvalidInputException("생년월일 값이 숫자가 아닙니다.");
		}
	}

}
