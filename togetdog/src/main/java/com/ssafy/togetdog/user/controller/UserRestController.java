package com.ssafy.togetdog.user.controller;

import java.util.HashMap;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.togetdog.global.exception.UnAuthorizedException;
import com.ssafy.togetdog.user.model.dto.EmailAuthParamDTO;
import com.ssafy.togetdog.user.model.dto.UserInfoRespDTO;
import com.ssafy.togetdog.user.model.dto.UserLoginParamDTO;
import com.ssafy.togetdog.user.model.dto.UserRegistParamDTO;
import com.ssafy.togetdog.user.model.dto.UserUpdateParamDTO;
import com.ssafy.togetdog.user.model.entity.User;
import com.ssafy.togetdog.user.model.entity.WaitUser;
import com.ssafy.togetdog.user.model.service.JwtService;
import com.ssafy.togetdog.user.model.service.MailSendService;
import com.ssafy.togetdog.user.model.service.UserService;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/user")
@Api("USER API")
public class UserRestController {
	
	private static final String SUCCESS = "success";
	private static final String FAIL = "fail";
	private final Logger logger = LoggerFactory.getLogger(UserRestController.class);
	
	private final UserService userService;
	private final JwtService jwtService;
	private final MailSendService mailService;
	
	/***
	 * Email sending for Registration
	 * @param UserRegistParamDTO
	 * @return status 200, 409
	 */
	@ApiOperation(value = "회원가입을 위한 이메일 전송", notes = "회원가입 정보를 기입받고 이메일을 전송합니다.")
	@PostMapping
	public ResponseEntity<?> TmpRegistration(
			@RequestBody @ApiParam(required = true) UserRegistParamDTO userDTO
			) {
		
		logger.info("Tmp Regist Info : {}", userDTO);
		Map<String, String> resultMap = new HashMap<String, String>();
		HttpStatus status = null;
		
		// mail sending
		String authKey = mailService.registMailSender(userDTO.getEmail());
		if (userService.tmpRegistration(userDTO, authKey)) {
			resultMap.put("result", SUCCESS);
			status = HttpStatus.OK;
		} else {
			resultMap.put("result", FAIL);
			status = HttpStatus.CONFLICT;
		}
		return new ResponseEntity<Map<String, String>>(resultMap, status);
	}
	
	/***
	 * User Registration
	 * @param UserRegistParamDTO
	 * @return status 200, 400, 409
	 */
	@ApiOperation(value = "회원가입 이메일 인증", notes = "이메일 인증 후 회원가입을 진행합니다.")
	@PostMapping("/auth")
	public ResponseEntity<?> registration(
			@RequestBody @ApiParam(required = true) EmailAuthParamDTO authDTO
			) {
		
		logger.info("Regist Info : {}", authDTO);
		Map<String, String> resultMap = new HashMap<String, String>();
		HttpStatus status = null;
		
		WaitUser tmpUser = userService.findWaitUserByEmail(authDTO.getEmail());
		if (tmpUser != null && tmpUser.getAuthKey().equals(authDTO.getAuthKey())) {
			if (userService.registration(tmpUser)) {
				resultMap.put("result", SUCCESS);
				status = HttpStatus.OK;
			} else {
				resultMap.put("result", FAIL);
				status = HttpStatus.CONFLICT;
			}
		} else {
			resultMap.put("result", FAIL);
			status = HttpStatus.BAD_REQUEST;
		}
		return new ResponseEntity<Map<String, String>>(resultMap, status);
	}
	
	/***
	 * User Login
	 * @param email
	 * @param password
	 * @return status 200, 401, 500
	 */
	@ApiOperation(value = "로그인", notes = "일반 로그인을 진행합니다.")
	@PostMapping("/login")
	public ResponseEntity<?> generalLogin(
			@RequestBody @ApiParam(required = true) UserLoginParamDTO loginDTO
			) {
		
		logger.info("login input parameter : {}", loginDTO);
		Map<String, Object> resultMap = new HashMap<String, Object>();
		HttpStatus status = null;
		
		
		// +) : 이메일 인증 대기 대상 판별하기
		WaitUser waitUser = userService.findWaitUserByEmail(loginDTO.getEmail()); 
		if (waitUser != null) {
			resultMap.put("msg", "가입대기중");
			resultMap.put("result", FAIL);
			status = HttpStatus.CONFLICT;
		}
		
		try {
			User user = userService.findUserByEmailAndPassword(loginDTO.getEmail(), loginDTO.getPassword());
			if (user != null) {
				// create JWT Token and save
				long userId = user.getUserId();
				String accessToken = jwtService.createAccessToken(userId);
				String refreshToken = jwtService.createRefreshToken(userId);

				// If a refresh token has already been issued, it is not issued.
				if (user.getToken() != null && !user.getToken().equals("")) {
					userService.saveRefreshToken(userId, refreshToken);
				}
				resultMap.put("result", SUCCESS);
				resultMap.put("user", UserLoginParamDTO.of(user));
				resultMap.put("access-token", accessToken);
				status = HttpStatus.OK;
			} else {
				resultMap.put("result", FAIL);
				status = HttpStatus.UNAUTHORIZED;
			}
		} catch (Exception e) {
			logger.error("login failed : {}", e);
			status =  HttpStatus.INTERNAL_SERVER_ERROR;
		}
		return new ResponseEntity<Map<String, Object>>(resultMap, status);
	}

	/***
	 * Logout
	 * @param token
	 * @return
	 */
	@ApiOperation(value = "로그아웃", notes = "로그아웃을 진행합니다. 회원 정보를 담은 Token을 제거합니다.")
	@GetMapping("/logout")
	public ResponseEntity<?> logout(
			@RequestHeader(value = "Authorization") @ApiParam(required = true) String token
			) {
		
		logger.info("Logout in");
		Map<String, Object> resultMap = new HashMap<String, Object>();
		HttpStatus status = null;
		
		try {
			if(jwtService.validateToken(token)) {
				long userId = jwtService.getUserId(token);
				userService.deleteRefreshToken(userId);
				resultMap.put("message", SUCCESS);
				status = HttpStatus.OK;
			} else {
				resultMap.put("result", FAIL);
				status = HttpStatus.UNAUTHORIZED;
			}
		} catch (Exception e) {
			resultMap.put("result", FAIL);
			status = HttpStatus.INTERNAL_SERVER_ERROR;
			logger.debug("Unexpected error : {}" + e.getMessage());
		}
		return new ResponseEntity<Map<String, Object>>(resultMap, status);
	}
	
	/***
	 * User email Duplicate Check
	 * @param email
	 * @return status 200, 409
	 */
	@ApiOperation(value = "이메일 중복 확인", notes = "이메일이 중복되는 지 여부를 확인해줍니다.")
	@GetMapping("/email")
	public ResponseEntity<?> emailDuplicateCheck(
			@RequestParam(value = "email") @ApiParam(required = true) String email
			) {
		
		logger.info("email duplicate check input parameter : {}", email);
		Map<String, Object> resultMap = new HashMap<String, Object>();
		HttpStatus status = null;
		
		WaitUser waitUser = userService.findWaitUserByEmail(email);
		User user = userService.findUserByEmail(email);
		if (user != null || waitUser != null) {
			resultMap.put("result", FAIL);
			status = HttpStatus.CONFLICT;
		} else {
			resultMap.put("result", SUCCESS);
			status = HttpStatus.OK;
		}
		return new ResponseEntity<Map<String, Object>>(resultMap, status);
	}
	
	/***
	 * User nickname Duplicate Check
	 * @param nickname
	 * @return status 200, 409
	 */
	@ApiOperation(value = "닉네임 중복 확인", notes = "닉네임이 중복되는 지 여부를 확인해줍니다.")
	@GetMapping("/nickname")
	public ResponseEntity<?> nicknameDuplicateCheck(
			@RequestParam(value = "nickname") @ApiParam(required = true) String nickname
			) {
		
		logger.info("nickname duplicate check input parameter : {}", nickname);
		Map<String, Object> resultMap = new HashMap<String, Object>();
		HttpStatus status = null;
		
		WaitUser waitUser = userService.findWaitUserByNickName(nickname);
		User user = userService.findUserByNickName(nickname);
		if (user != null || waitUser != null) {
			resultMap.put("result", FAIL);
			status = HttpStatus.CONFLICT;
		} else {
			resultMap.put("result", SUCCESS);
			status = HttpStatus.OK;
		}
		return new ResponseEntity<Map<String, Object>>(resultMap, status);
	}
	
	/***
	 * User information lookup
	 * @param token
	 * @param userid
	 * @return status 200, 400, 401, 500
	 */
	@ApiOperation(value = "회원 정보 조회", 	notes = "해당 유저의 정보를 조회합니다.")
	@GetMapping("/{userid}")
	public ResponseEntity<?> getUserInfo(
			@RequestHeader(value = "Authorization") @ApiParam(required = true) String token,
			@PathVariable(value = "userid") @ApiParam(required = true) String userid
			) {
		logger.info("getUserInfo input parameter : {}", userid);
		Map<String, Object> resultMap = new HashMap<String, Object>();
		HttpStatus status = null;
		
		try {
			if (jwtService.validateToken(token)) {
				long userId = Long.parseLong(userid);
				User user = userService.findUserByUserId(userId);
				if (user != null) {
					resultMap.put("result", SUCCESS);
					resultMap.put("user", UserInfoRespDTO.of(user));
					status = HttpStatus.OK;
				} else {
					resultMap.put("result", FAIL);
					status = HttpStatus.BAD_REQUEST;
				}
			} else {
				resultMap.put("result", FAIL);
				status = HttpStatus.UNAUTHORIZED;
			}
		} catch (NumberFormatException e) {
			resultMap.put("result", FAIL);
			status = HttpStatus.BAD_REQUEST;
		} catch (UnAuthorizedException e) {
			resultMap.put("result", FAIL);
			status = HttpStatus.UNAUTHORIZED;
		} catch (Exception e) {
			resultMap.put("result", FAIL);
			status = HttpStatus.INTERNAL_SERVER_ERROR;
			logger.debug("Unexpected error : {}" + e.getMessage());
		}
		return new ResponseEntity<Map<String, Object>>(resultMap, status);
	}
	
	/***
	 * User information Update
	 * @param token
	 * @param updateInfo
	 * @return status 200, 401, 500
	 */
	@ApiOperation(value = "회원 정보 수정", notes = "해당 유저의 정보를 수정합니다.")
	@PutMapping
	public ResponseEntity<?> updateUser(
			@RequestHeader(value = "Authorization") @ApiParam(required = true) String token,
			@RequestBody @ApiParam(required = true) UserUpdateParamDTO userDTO
			) {
		
		logger.info("updateUser input parameter : {}", userDTO);
		Map<String, Object> resultMap = new HashMap<String, Object>();
		HttpStatus status = null;
		
		try {
			if (jwtService.validateToken(token)) {
				long userId = jwtService.getUserId(token);
				userService.updateUserInfo(userId, userDTO);
				resultMap.put("result", SUCCESS);
				status = HttpStatus.OK;
			} else {
				resultMap.put("result", FAIL);
				status = HttpStatus.UNAUTHORIZED;
			}
		} catch (Exception e) {
			resultMap.put("result", FAIL);
			status = HttpStatus.INTERNAL_SERVER_ERROR;
			logger.debug("Unexpected error : {}" + e.getMessage());
		}
		return new ResponseEntity<Map<String, Object>>(resultMap, status);
	}
	
	/***
	 * User password Update
	 * @param token
	 * @param password
	 * @param newPassword
	 * @return status 200, 400, 401
	 */
	@ApiOperation(value = "비밀번호 수정", notes = "해당 유저의 비밀번호를 수정합니다.")
	@PutMapping("/password")
	public ResponseEntity<?> updatePassword(
			@RequestHeader(value = "Authorization") @ApiParam(required = true) String token,
			@RequestParam(value = "password") @ApiParam(required = true) String password, 
			@RequestParam(value = "newPassword") @ApiParam(required = true) String newPassword
			) {
		
		logger.info("updatePassword input parameter : {} {}", password, newPassword);
		Map<String, Object> resultMap = new HashMap<String, Object>();
		HttpStatus status = null;
		
		if (jwtService.validateToken(token)) {
			long userId = jwtService.getUserId(token);
			userService.updatePassword(userId, password, newPassword);
			resultMap.put("result", SUCCESS);
			status = HttpStatus.OK;
		} else {
			resultMap.put("result", FAIL);
			status = HttpStatus.UNAUTHORIZED;
		}
		return new ResponseEntity<Map<String, Object>>(resultMap, status);
	}
	
	/***
	 * User withdrawal
	 * @param token
	 * @return status 200, 401, 500
	 */
	@ApiOperation(value = "회원 탈퇴", notes = "회원 탈퇴를 진행합니다.")
	@DeleteMapping
	public ResponseEntity<?> deleteUser(
			@RequestHeader(value = "Authorization") @ApiParam(required = true) String token
			) {
		
		logger.info("findPassword in");
		Map<String, Object> resultMap = new HashMap<String, Object>();
		HttpStatus status = null;
		
		try {
			if (jwtService.validateToken(token)) {
				long userId = jwtService.getUserId(token);
				userService.deleteUser(userId);
				resultMap.put("result", SUCCESS);
				status = HttpStatus.OK;
				SecurityContextHolder.clearContext();
			} else {
				resultMap.put("result", FAIL);
				status = HttpStatus.UNAUTHORIZED;
			}
		} catch (Exception e) {
			resultMap.put("result", FAIL);
			status = HttpStatus.INTERNAL_SERVER_ERROR;
			logger.debug("Unexpected error : {}" + e.getMessage());
		}
		return new ResponseEntity<Map<String, Object>>(resultMap, status);
	}
	
	/***
	 * Password lookup
	 * @param token
	 * @return
	 */
	@ApiOperation(value = "비밀번호 찾기", notes = "해당 유저의 비밀번호를 재설정하여 이메일로 송부합니다.")
	@GetMapping("/password")
	public ResponseEntity<?> findPassword(
			@RequestHeader(value = "Authorization") @ApiParam(required = true) String token
			) {
		
		logger.info("findPassword in");
		Map<String, Object> resultMap = new HashMap<String, Object>();
		HttpStatus status = null;
		
		if (jwtService.validateToken(token)) {
			long userId = jwtService.getUserId(token);
			User user = userService.findUserByUserId(userId);
			mailService.sendTmpPassword(userId, user.getEmail());
			resultMap.put("result", SUCCESS);
			status = HttpStatus.OK;
		} else {
			resultMap.put("result", FAIL);
			status = HttpStatus.UNAUTHORIZED;
		}
		return new ResponseEntity<Map<String, Object>>(resultMap, status);
	}
	
	/***
	 * @@@@@@@@@@@@@@@@@@@@@@@@@@
	 * User information includes one's dog information
	 * @param token
	 * @param userid
	 * @return
	 */
	@ApiOperation(value = "강아지 정보를 포함한 유저 정보 조회", notes = "해당 유저가 등록한 강아지 정보를 포함한 유저의 정보를 반환합니다.")
	@GetMapping("/includesDog/{userid}")
	public ResponseEntity<?> getUserIncludesDogs (
			@RequestHeader(value = "Authorization") @ApiParam(required = true) String token,
			@PathVariable long userid
			) {
		
		logger.info("getUserIncludesDogs input parameter : {}", userid);
		Map<String, Object> resultMap = new HashMap<String, Object>();
		HttpStatus status = null;
		
		if (jwtService.validateToken(token)) {
			//long userId = jwtService.getUserId(token);
			//User user = userService.findUserByUserId(userId);
			// dog info searching logic
		} else {
			resultMap.put("result", FAIL);
			status = HttpStatus.UNAUTHORIZED;
		}
		return new ResponseEntity<Map<String, Object>>(resultMap, status);
	}

}
