package com.ssafy.togetdog.user.model.service;

import java.time.LocalDate;
import java.util.regex.Pattern;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ssafy.togetdog.global.exception.DuplicatedInputException;
import com.ssafy.togetdog.global.exception.InvalidInputException;
import com.ssafy.togetdog.global.util.ErrorCode;
import com.ssafy.togetdog.user.model.dto.UserRegistParamDTO;
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
	private final WaitUserRepository WaitUserRepository;
	
	@Override
	@Transactional
	public boolean tmpRegistration(UserRegistParamDTO userDTO, String authKey) {
		try {
			checkRegistrationValidation(userDTO);
			userDTO.setPassword(passwordEncoder.encode(userDTO.getPassword()));
			WaitUser user = userDTO.toUser(authKey);
			WaitUserRepository.save(user);
			return true;
		} catch (InvalidInputException | DuplicatedInputException e) {
			logger.error(e.getMessage());
			return false;
		} catch (Exception e) {
			logger.error("Unexpected error! : " + e.getMessage());
			return false;
		}
	}
	
	@Override
	@Transactional
	public boolean registration(WaitUser user) {
		try {
			userRepository.save(user.toUser());
			WaitUserRepository.delete(user);
			return true;
		} catch (InvalidInputException | DuplicatedInputException e) {
			logger.error(e.getMessage());
			return false;
		} catch (Exception e) {
			logger.error("Unexpected error! : " + e.getMessage());
			return false;
		}
	}
	
	@Override
	@Transactional
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
	@Transactional
	public void saveRefreshToken(long userId, String refreshToken) {
		userRepository.updateToken(userId, refreshToken);
	}
	
	@Override
	@Transactional
	public void deleteRefreshToken(long userId) {
		userRepository.deleteToken(userId);
	}
	
	@Override
	@Transactional
	public User findUserByEmail(String email) {
		return userRepository.findByEmail(email).orElse(null);
	}


	@Override
	@Transactional
	public User findUserByNickName(String nickName) {
		return userRepository.findByNickName(nickName).orElse(null);
	}

	@Override
	@Transactional
	public User findUserByUserId(long userId) {
		return userRepository.findById(userId).orElse(null);
	}
	
	@Override
	@Transactional
	public int updateUserInfo(long userId, UserUpdateParamDTO userDTO) {
		checkUpdateValidation(userDTO);
		return userRepository.updateUser(userId, userDTO.getNickName(), 
				userDTO.getGender(), userDTO.getBirth(), userDTO.getAddress(), userDTO.getRegionCode());
	}

	@Override
	@Transactional
	public int updatePassword(long userId, String password, String newPassword) {
		User user = userRepository.findById(userId).orElse(null);
		if (user == null ) {
			return -2;
		}
		if (passwordEncoder.matches(password, user.getPassword())) {
			return userRepository.updatePassword(userId, passwordEncoder.encode(newPassword));
		}
		return -1;
	}
	
	@Override
	@Transactional
	public int updateTmpPassword(long userId, String tmpPassword) {
		User user = userRepository.findById(userId).orElse(null);
		if (user == null ) {
			return -2;
		}
		return userRepository.updatePassword(userId, passwordEncoder.encode(tmpPassword));
	}
	
	@Override
	@Transactional
	public void deleteUser(long userId) {
		userRepository.deleteById(userId);
	}
	
	@Override
	@Transactional
	public WaitUser findWaitUserByEmail(String email) {
		return WaitUserRepository.findByEmail(email).orElse(null);
	}
	
	@Override
	@Transactional
	public WaitUser findWaitUserByNickName(String nickname) {
		return WaitUserRepository.findByNickName(nickname).orElse(null);
	}
	
	///////////////////////////////
	
	/***
	 * Validation for User Registration
	 * @param userRegistParamDTO
	 */
	public void checkRegistrationValidation(UserRegistParamDTO userDTO) {
		String emailRegexp = "^[a-zA-Z0-9+-\\_.]+@[a-zA-Z0-9-]+\\.[a-zA-Z0-9-.]+$";
		String passwordRegexp = "^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,16}$";
		String nicknameRegexp = "^[a-zA-Z가-힇0-9]{2,16}$";
		String genderRegexp = "^female$|^male$|^none$";
		String regionCodeRegexp = "(^[0-9]{5}$)";
		
		// email regexp check
		if (!Pattern.matches(emailRegexp, userDTO.getEmail())) {
			throw new InvalidInputException(ErrorCode.INVALID_PARAMETER);
		}
		// password regexp check
		if (!Pattern.matches(passwordRegexp, userDTO.getPassword())) {
			throw new InvalidInputException(ErrorCode.INVALID_PARAMETER);
		}
		// nickname regexp check
		if (!Pattern.matches(nicknameRegexp, userDTO.getNickname())) {
			throw new InvalidInputException(ErrorCode.INVALID_PARAMETER);
		}
		// gender regexp check
		if (!Pattern.matches(genderRegexp, userDTO.getGender())) {
			throw new InvalidInputException(ErrorCode.INVALID_PARAMETER);
		}
		// regionCode regexp check
		if (!Pattern.matches(regionCodeRegexp, userDTO.getRegionCode())) {
			throw new InvalidInputException(ErrorCode.INVALID_PARAMETER);
		}
		// birth check
		try {
			int birth = Integer.parseInt(userDTO.getBirth());
			LocalDate now = LocalDate.now();
			if (birth > now.getYear() || birth < 1900) {
				throw new InvalidInputException(ErrorCode.INVALID_PARAMETER);
			}
		} catch (NumberFormatException e) {
			throw new InvalidInputException(ErrorCode.INVALID_PARAMETER);
		}
	}
	
	/***
	 * Validation for User UpdateInfo
	 * @param UserUpdateParamDTO
	 */
	public void checkUpdateValidation(UserUpdateParamDTO userDTO) {
		String nicknameRegexp = "^[a-zA-Z가-힇0-9]{2,16}$";
		String genderRegexp = "^female$|^male$|^none$";
		String regionCodeRegexp = "(^[0-9]{5}$)";
		
		// nickname regexp check
		if (!Pattern.matches(nicknameRegexp, userDTO.getNickName())) {
			throw new InvalidInputException(ErrorCode.INVALID_PARAMETER);
		}
		// gender regexp check
		if (!Pattern.matches(genderRegexp, userDTO.getGender())) {
			throw new InvalidInputException(ErrorCode.INVALID_PARAMETER);
		}
		// regionCode regexp check
		if (!Pattern.matches(regionCodeRegexp, userDTO.getRegionCode())) {
			throw new InvalidInputException(ErrorCode.INVALID_PARAMETER);
		}
		// birth check
		try {
			int birth = Integer.parseInt(userDTO.getBirth());
			LocalDate now = LocalDate.now();
			if (birth > now.getYear() || birth < 1900) {
				throw new InvalidInputException(ErrorCode.INVALID_PARAMETER);
			}
		} catch (NumberFormatException e) {
			throw new InvalidInputException(ErrorCode.INVALID_PARAMETER);
		}
	}

}
