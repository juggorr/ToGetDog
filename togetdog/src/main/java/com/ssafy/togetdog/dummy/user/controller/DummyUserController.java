package com.ssafy.togetdog.dummy.user.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.togetdog.dummy.dog.domain.DogDTO;
import com.ssafy.togetdog.dummy.user.domain.LoginUser;
import com.ssafy.togetdog.dummy.user.domain.UserDTO;
import com.ssafy.togetdog.dummy.user.domain.UserIncludesDogsDTO;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;

@RestController
@RequestMapping("/dummy/user")
@Api("유저 관련 더미 API : 무슨 값을 넣든 같은 dummy 결과가 나옵니다.....")
public class DummyUserController {
	
	private static final String SUCCESS = "success";
	private static final String FAIL = "fail";
	
	@ApiOperation(value = "로그인", notes = "일반 로그인을 진행합니다.")
	@PostMapping("/login")
	public ResponseEntity<?> generalLogin(@RequestParam String email, @RequestParam String password) {
		System.out.println("들어온 값:" + email + ", " + password);
		LoginUser loginUser = new LoginUser(1245L, "크림맘", "서울시 동작구 흑석동");
		Map<String, Object> resultMap = new HashMap<String, Object>();
		resultMap.put("result", SUCCESS);
		resultMap.put("user", loginUser);
		return new ResponseEntity<Map<String, Object>>(resultMap, HttpStatus.OK);
	}
	
	@ApiOperation(value = "소셜 로그인", notes = "소셜 로그인(네이버, 카카오, 구글)을 진행합니다.")
	@PostMapping("/sociallogin")
	public ResponseEntity<?> socialLogin(@RequestParam String code, @RequestParam String type) {
		System.out.println("들어온 값:" + code + ", " + type);
		LoginUser loginUser = new LoginUser(1245L, "크림맘", "서울시 동작구 흑석동");
		Map<String, Object> resultMap = new HashMap<String, Object>();
		resultMap.put("result", SUCCESS);
		resultMap.put("user", loginUser);
		return new ResponseEntity<Map<String, Object>>(resultMap, HttpStatus.OK);
	}
	
	@ApiOperation(value = "회원가입", notes = "회원가입을 진행합니다.")
	@PostMapping()
	public ResponseEntity<?> registration(@RequestParam Map<String, Object> loginInfo) {
		String email = (String) loginInfo.get("email");
		String password = (String) loginInfo.get("password");
		String nickname = (String) loginInfo.get("nickname");
		String gender = (String) loginInfo.get("gender");
		int age = (int) loginInfo.get("age");
		String address = (String) loginInfo.get("address");
		String regionCode = (String) loginInfo.get("regionCode");
		
		System.out.println("들어온 값:" + email + ", " + password + ", " + nickname);
		System.out.println("들어온 값:" + gender + ", " + age + ", " + address + ", " + regionCode);
		
		Map<String, String> resultMap = new HashMap<String, String>();
		resultMap.put("result", SUCCESS);
		resultMap.put("msg", "회원가입 되었습니다..");
		return new ResponseEntity<Map<String, String>>(resultMap, HttpStatus.OK);
	}
	
	@ApiOperation(value = "이메일 중복 확인", notes = "이메일이 중복되는 지 여부를 확인해줍니다. ssafy@naver.com을 넣으면 중복되었다고 나오도록 되어있습니다.")
	@GetMapping("/email")
	public ResponseEntity<?> emailCheck(@RequestParam String email) {
		Map<String, String> resultMap = new HashMap<String, String>();
		if (email.equals("ssafy@naver.com")) {
			resultMap.put("result", FAIL);
			resultMap.put("msg", "중복된 이메일 값입니다.");
			return new ResponseEntity<Map<String, String>>(resultMap, HttpStatus.CONFLICT);
		} else {
			resultMap.put("result", SUCCESS);
			resultMap.put("msg", "사용 가능한 이메일입니다.");
			return new ResponseEntity<Map<String, String>>(resultMap, HttpStatus.OK);
		}
	}
	
	@ApiOperation(value = "닉네임 중복 확인", notes = "닉네임이 중복되는 지 여부를 확인해줍니다. ssafy를 넣으면 중복되었다고 나오도록 되어있습니다.")
	@GetMapping("/nickname")
	public ResponseEntity<?> nicknameCheck(@RequestParam String nickname) {
		Map<String, String> resultMap = new HashMap<String, String>();
		if (nickname.equals("ssafy")) {
			resultMap.put("result", FAIL);
			resultMap.put("msg", "중복된 닉네임 값입니다.");
			return new ResponseEntity<Map<String, String>>(resultMap, HttpStatus.CONFLICT);
		} else {
			resultMap.put("result", SUCCESS);
			resultMap.put("msg", "사용 가능한 닉네임입니다.");
			return new ResponseEntity<Map<String, String>>(resultMap, HttpStatus.OK);
		}
	}
	
	@ApiOperation(value = "회원 정보 조회", notes = "해당 유저의 정보를 조회합니다.")
	@GetMapping("/{userid}")
	public ResponseEntity<?> findUser(@PathVariable String userid) {
		// dummy 이므로 userId에 상관없는 값을 return 합니다.
		int searchUserId = Integer.parseInt(userid);
		UserDTO result = new UserDTO();
		result.setUserId(searchUserId);
		result.setNickName("크림엄마");
		result.setUserAge(23);
		result.setUserGender("female");
		result.setAddress("서울시 동작구 흑석동");
		result.setRegionCode(11439);
		result.setSocial("naver");
		result.setRating(3.42);
		return new ResponseEntity<UserDTO>(result, HttpStatus.OK);
	}
	
	@ApiOperation(value = "회원 정보 수정", notes = "해당 유저의 정보를 수정합니다.")
	@PutMapping
	public ResponseEntity<?> updateUser(@RequestParam Map<String, Object> updateInfo) {
		String nickname = (String) updateInfo.get("nickname");
		String gender = (String) updateInfo.get("gender");
		int age = (int) updateInfo.get("age");
		String address = (String) updateInfo.get("address");
		String region_code = (String) updateInfo.get("region_code");
		
		System.out.println("들어온 값:" + nickname + ", " + gender + ", " + age + ", " + address + ", " + region_code);
		
		Map<String, String> resultMap = new HashMap<String, String>();
		resultMap.put("result", SUCCESS);
		resultMap.put("msg", "유저 정보가 수정되었습니다.");
		return new ResponseEntity<Map<String, String>>(resultMap, HttpStatus.OK);
	}
	
	@ApiOperation(value = "비밀번호 수정", notes = "해당 유저의 비밀번호를 수정합니다.")
	@PutMapping("/password")
	public ResponseEntity<?> updatePassword(@RequestParam String password, @RequestParam String newPassword) {
		Map<String, String> resultMap = new HashMap<String, String>();
		resultMap.put("result", SUCCESS);
		resultMap.put("msg", "비밀번호가 수정되었습니다.");
		return new ResponseEntity<Map<String, String>>(resultMap, HttpStatus.OK);
	}
	
	@ApiOperation(value = "회원 탈퇴", notes = "회원 탈퇴를 진행합니다.")
	@DeleteMapping()
	public ResponseEntity<?> deleteUser() {
		Map<String, String> resultMap = new HashMap<String, String>();
		resultMap.put("result", SUCCESS);
		resultMap.put("msg", "회원 탈퇴되었습니다.");
		return new ResponseEntity<Map<String, String>>(resultMap, HttpStatus.OK);
	}
	
	@ApiOperation(value = "비밀번호 찾기", notes = "해당 유저의 비밀번호를 재설정하여 이메일로 송부합니다.")
	@GetMapping("/password")
	public ResponseEntity<?> findPassword(@RequestParam String email) {
		Map<String, String> resultMap = new HashMap<String, String>();
		resultMap.put("result", SUCCESS);
		resultMap.put("msg", "이메일을 송부했습니다.");
		return new ResponseEntity<Map<String, String>>(resultMap, HttpStatus.OK);
	}
	
	@ApiOperation(value = "로그아웃", notes = "로그아웃을 진행합니다.")
	@GetMapping("/logout")
	public ResponseEntity<?> logout() {
		Map<String, String> resultMap = new HashMap<String, String>();
		resultMap.put("result", SUCCESS);
		resultMap.put("msg", "로그아웃 처리 했습니다.");
		return new ResponseEntity<Map<String, String>>(resultMap, HttpStatus.OK);
	}
	
	@ApiOperation(value = "강아지 정보를 포함한 유저 정보 조회", notes = "해당 유저가 등록한 강아지 정보를 포함한 유저의 정보를 반환합니다.")
	@GetMapping("/includesDog/{userid}")
	public ResponseEntity<?> logout(@PathVariable long userid) {
		UserIncludesDogsDTO result = new UserIncludesDogsDTO();
		
		DogDTO dog = new DogDTO();
		dog.setDogId(114L);
		dog.setUserId(userid);
		dog.setDogName("뽀삐");
		dog.setDogGender("female");
		dog.setDogType("말티즈");
		dog.setDogAge(72);
		dog.setDogWeight(3.4);
		dog.setDogNeutered(true);
		dog.setDogCharacter1("independent");
		dog.setDogCharacter2("active");
		dog.setDescription("활동적이고 순해요");
		dog.setDogProfile("asdfasdf.jpg");
		
		result.setUserId(userid);
		result.setNickName("뽀삐엄마");
		result.setUserAge(28);
		result.setAddress("서울시 동작구 흑석동");
		result.setRegionCode("11455");
		result.setSocial("naver");
		result.setRating(3.41);
		
		// 강아지 정보 추가
		result.getDog().add(dog);
		
		return new ResponseEntity<UserIncludesDogsDTO>(result, HttpStatus.OK);
	}

}
