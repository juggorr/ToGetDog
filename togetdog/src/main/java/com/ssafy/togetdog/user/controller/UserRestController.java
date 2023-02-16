package com.ssafy.togetdog.user.controller;

import java.util.HashMap;
import java.util.Map;

import javax.mail.MessagingException;

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

import com.ssafy.togetdog.dog.model.service.DogService;
import com.ssafy.togetdog.user.model.dto.EmailAuthParamDTO;
import com.ssafy.togetdog.user.model.dto.UserIncludesDogsRespDTO;
import com.ssafy.togetdog.user.model.dto.UserLoginParamDTO;
import com.ssafy.togetdog.user.model.dto.UserLoginRespDTO;
import com.ssafy.togetdog.user.model.dto.UserPasswordParamDTO;
import com.ssafy.togetdog.user.model.dto.UserRegistParamDTO;
import com.ssafy.togetdog.user.model.dto.UserSocialRegistParamDTO;
import com.ssafy.togetdog.user.model.dto.UserUpdateParamDTO;
import com.ssafy.togetdog.user.model.entity.User;
import com.ssafy.togetdog.user.model.service.JwtService;
import com.ssafy.togetdog.user.model.service.MailSendService;
import com.ssafy.togetdog.user.model.service.UserService;
import com.ssafy.togetdog.user.model.vo.ProviderType;

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
	private static final String RESULT = "result";
	private final Logger logger = LoggerFactory.getLogger(UserRestController.class);
	
	private final UserService userService;
	private final JwtService jwtService;
	private final MailSendService mailService;
	private final DogService dogService;
	
	/***
	 * Email sending for Registration
	 * @param UserRegistParamDTO
	 * @return status 200, 409
	 * @throws MessagingException 
	 */
	@ApiOperation(value = "회원가입을 위한 이메일 전송", notes = "회원가입 정보를 기입받고 이메일을 전송합니다.")
	@PostMapping
	public ResponseEntity<Map<String, String>> TmpRegistration(
			@RequestBody @ApiParam(required = true) UserRegistParamDTO userDTO
			) throws MessagingException {
		
		logger.info("Tmp Regist Info : {}", userDTO);
		Map<String, String> resultMap = new HashMap<String, String>();
		
		String authKey = mailService.registMailSender(userDTO.getEmail());
		userService.tmpRegistration(userDTO, authKey);
		resultMap.put(RESULT, SUCCESS);
		return new ResponseEntity<Map<String, String>>(resultMap, HttpStatus.OK);
	}
	
	/***
	 * User Registration
	 * @param UserRegistParamDTO
	 * @return status 200, 400, 409
	 */
	@ApiOperation(value = "회원가입 이메일 인증", notes = "이메일 인증 후 회원가입을 진행합니다.")
	@PostMapping("/auth")
	public ResponseEntity<Map<String, String>> registration(
			@RequestBody @ApiParam(required = true) EmailAuthParamDTO authDTO
			) {
		
		logger.info("Regist Info : {}", authDTO);
		Map<String, String> resultMap = new HashMap<String, String>();
		
		userService.registEmailAuth(authDTO);
		resultMap.put(RESULT, SUCCESS);
		return new ResponseEntity<Map<String, String>>(resultMap, HttpStatus.OK);
	}
	
	/***
	 * Social User Registration
	 * @param UserSocialRegistParamDTO
	 * @return status 200, 400, 409
	 */
	@ApiOperation(value = "소셜 회원가입", notes = "소셜 회원의 회원가입을 진행합니다.")
	@PostMapping("/social")
	public ResponseEntity<Map<String, String>> socialRegistration(
			@RequestBody @ApiParam(required = true) UserSocialRegistParamDTO userDTO
			) {
		
		logger.info("Social Regist Info : {}", userDTO);
		Map<String, String> resultMap = new HashMap<String, String>();
		
		userService.socialRegist(userDTO);
		resultMap.put(RESULT, SUCCESS);
		return new ResponseEntity<Map<String, String>>(resultMap, HttpStatus.OK);
	}
	
	/***
	 * User Login
	 * @param email
	 * @param password
	 * @return status 200, 401
	 */
	@ApiOperation(value = "로그인", notes = "일반 로그인을 진행합니다.")
	@PostMapping("/login")
	public ResponseEntity<Map<String, Object>> generalLogin(
			@RequestBody @ApiParam(required = true) UserLoginParamDTO loginDTO
			) {
		
		logger.info("login input parameter : {}", loginDTO);
		Map<String, Object> resultMap = new HashMap<String, Object>();

		User user = userService.loginService(loginDTO);
		long userId = user.getUserId();
		String accessToken = jwtService.createAccessToken(userId);
		resultMap.put(RESULT, SUCCESS);
		resultMap.put("user", UserLoginRespDTO.of(user));
		resultMap.put("access-token", accessToken);
		return new ResponseEntity<Map<String, Object>>(resultMap, HttpStatus.OK);
	}
	
	/***
	 * User email Duplicate Check
	 * @param email
	 * @return status 200, 409
	 */
	@ApiOperation(value = "이메일 중복 확인", notes = "이메일이 중복되는 지 여부를 확인해줍니다.")
	@GetMapping("/email")
	public ResponseEntity<Map<String, String>> emailDuplicateCheck(
			@RequestParam(value = "email") @ApiParam(required = true) String email
			) {
		
		logger.info("email duplicate check input parameter : {}", email);
		Map<String, String> resultMap = new HashMap<String, String>();
		
		userService.emailDuplicateCheck(email);
		return new ResponseEntity<Map<String, String>>(resultMap, HttpStatus.OK);
	}
	
	/***
	 * User nickname Duplicate Check
	 * @param nickname
	 * @return status 200, 409
	 */
	@ApiOperation(value = "닉네임 중복 확인", notes = "닉네임이 중복되는 지 여부를 확인해줍니다.")
	@GetMapping("/nickname")
	public ResponseEntity<Map<String, String>> nicknameDuplicateCheck(
			@RequestParam(value = "nickname") @ApiParam(required = true) String nickname
			) {
		
		logger.info("nickname duplicate check input parameter : {}", nickname);
		Map<String, String> resultMap = new HashMap<String, String>();
		
		userService.nickNameDuplicateCheck(nickname);
		return new ResponseEntity<Map<String, String>>(resultMap, HttpStatus.OK);
	}
	
	/***
	 * User information lookup
	 * @param token
	 * @param userid
	 * @return status 200, 400, 401
	 */
	@ApiOperation(value = "회원 정보 조회", 	notes = "해당 유저의 정보를 조회합니다.")
	@GetMapping("/{userid}")
	public ResponseEntity<Map<String, Object>> getUserInfo(
			@RequestHeader(value = "Authorization") @ApiParam(required = true) String token,
			@PathVariable(value = "userid") @ApiParam(required = true) String userid
			) throws NumberFormatException {
		logger.info("getUserInfo input parameter : {}", userid);
		Map<String, Object> resultMap = new HashMap<String, Object>();
		
		jwtService.validateToken(token);
		resultMap.put(RESULT, SUCCESS);
		resultMap.put("user", userService.getUserInfo(userid));
		return new ResponseEntity<Map<String, Object>>(resultMap, HttpStatus.OK);
	}
	
	/***
	 * User information Update
	 * @param token
	 * @param updateInfo
	 * @return status 200, 401
	 */
	@ApiOperation(value = "회원 정보 수정", notes = "해당 유저의 정보를 수정합니다.")
	@PutMapping
	public ResponseEntity<Map<String, Object>> updateUser(
			@RequestHeader(value = "Authorization") @ApiParam(required = true) String token,
			@RequestBody @ApiParam(required = true) UserUpdateParamDTO userDTO
			) {
		
		logger.info("updateUser input parameter : {}", userDTO);
		Map<String, Object> resultMap = new HashMap<String, Object>();
		
		jwtService.validateToken(token);
		long userId = jwtService.getUserId(token);
		userService.updateUserInfo(userId, userDTO);
		resultMap.put(RESULT, SUCCESS);
		return new ResponseEntity<Map<String, Object>>(resultMap, HttpStatus.OK);
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
	public ResponseEntity<Map<String, String>> updatePassword(
			@RequestHeader(value = "Authorization") @ApiParam(required = true) String token,
			@RequestBody @ApiParam(required = true) UserPasswordParamDTO passwordDTO
			) {
		
		logger.info("updatePassword input parameter : {}", passwordDTO);
		Map<String, String> resultMap = new HashMap<String, String>();
		
		jwtService.validateToken(token);
		long userId = jwtService.getUserId(token);
		userService.updatePassword(userId, passwordDTO.getPassword(), passwordDTO.getNewPassword());
		resultMap.put(RESULT, SUCCESS);
		return new ResponseEntity<Map<String, String>>(resultMap, HttpStatus.OK);
	}
	
	/***
	 * User withdrawal
	 * @param token
	 * @return status 200, 401
	 */
	@ApiOperation(value = "회원 탈퇴", notes = "회원 탈퇴를 진행합니다.")
	@DeleteMapping
	public ResponseEntity<Map<String, String>> deleteUser(
			@RequestHeader(value = "Authorization") @ApiParam(required = true) String token
			) {
		
		logger.info("findPassword in");
		Map<String, String> resultMap = new HashMap<String, String>();
		
		jwtService.validateToken(token);
		long userId = jwtService.getUserId(token);
		userService.withdrawal(userId);
		resultMap.put(RESULT, SUCCESS);
		SecurityContextHolder.clearContext();
		return new ResponseEntity<Map<String, String>>(resultMap, HttpStatus.OK);
	}
	
	/***
	 * Password lookup
	 * @param token
	 * @return 200, 401
	 */
	@ApiOperation(value = "비밀번호 찾기", notes = "해당 유저의 비밀번호를 재설정하여 이메일로 송부합니다.")
	@GetMapping("/password")
	public ResponseEntity<Map<String, Object>> findPassword(
			@RequestParam @ApiParam(required = true) String email
			) {
		
		logger.info("findPassword in");
		Map<String, Object> resultMap = new HashMap<String, Object>();
		
		User user = userService.findUserByEmail(email);
		
		if (user == null) {
			resultMap.put("result", "FAIL");
			resultMap.put("msg", "가입된 이메일이 아닙니다.");
			return new ResponseEntity<Map<String, Object>>(resultMap, HttpStatus.BAD_REQUEST);
		} else if (!user.getSocial().equals(ProviderType.O)) {
			resultMap.put("result", "FAIL");
			resultMap.put("msg", "소셜 회원입니다.");
			return new ResponseEntity<Map<String, Object>>(resultMap, HttpStatus.CONFLICT);
		}
		logger.info(email + "로 새로운 이메일을 송부합니다.");
		mailService.sendTmpPassword(user.getUserId(), user.getEmail());
		resultMap.put(RESULT, SUCCESS);
		return new ResponseEntity<Map<String, Object>>(resultMap, HttpStatus.OK);
	}
	

	/***
	 * User information includes dogs lookup
	 * @param token
	 * @param userId
	 * @return
	 */
	@ApiOperation(value = "강아지 정보 포함 회원", notes = "강아지 정보를 포함한 회원 정보를 조회합니다.")
	@GetMapping("/includesDog/{userid}")
	public ResponseEntity<Map<String, Object>> findPassword(
			@RequestHeader(value = "Authorization") @ApiParam(required = true) String token,
			@PathVariable("userid") String userId
			) {
		
		logger.info("findPassword in");
		Map<String, Object> resultMap = new HashMap<String, Object>();
		
		jwtService.validateToken(token);
		long userid = Long.parseLong(userId);
		User user = userService.findUserByUserId(userid);
		resultMap.put(RESULT, SUCCESS);
		resultMap.put("user", UserIncludesDogsRespDTO.of(user, dogService.findDogsByUserId(userid)));
		return new ResponseEntity<Map<String, Object>>(resultMap, HttpStatus.OK);
	}
}
