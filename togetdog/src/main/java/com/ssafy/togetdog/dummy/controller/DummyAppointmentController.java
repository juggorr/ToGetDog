package com.ssafy.togetdog.dummy.controller;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.togetdog.dummy.domain.AppointMentInfo;
import com.ssafy.togetdog.dummy.domain.DogDTO;
import com.ssafy.togetdog.dummy.domain.DogForMeetingDTO;
import com.ssafy.togetdog.dummy.domain.MeetingDTO;
import com.ssafy.togetdog.dummy.domain.RatingAppointmentDTO;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;

@RestController
@RequestMapping("/dummy/meeting")
@Api("산책 약속 관련 더미 API : 무슨 값을 넣든 같은 dummy 결과가 나옵니다.")
public class DummyAppointmentController {

	private static final String SUCCESS = "success";
	// private static final String FAIL = "fail";

	@ApiOperation(value = "산책 약속 리스트 조회", notes = "현재 잡힌 모든 산책 약속 리스트를 반환합니다. 현재는 Authorization 대신에 직접 userId를 입력받도록 되어있습니다.")
	@GetMapping
	public ResponseEntity<?> getMeetingList(@RequestParam String userId) {

		List<MeetingDTO> meetingList = new ArrayList<MeetingDTO>();
		MeetingDTO meeting = new MeetingDTO();
		meeting.setPartnerName("커피중독자");
		meeting.setRating(4.7);
		meeting.setAppointmentId(12345);
		meeting.setPlace("은행 나무 공원");
		meeting.setDate(new Date());

		List<DogForMeetingDTO> myDogs = new ArrayList<DogForMeetingDTO>();
		myDogs.add(new DogForMeetingDTO("choco.png", "choco"));
		myDogs.add(new DogForMeetingDTO("choco.png", "choco"));
		myDogs.add(new DogForMeetingDTO("choco.png", "choco"));
		meeting.setMyDogs(myDogs);

		List<DogForMeetingDTO> partnerDogs = new ArrayList<DogForMeetingDTO>();
		partnerDogs.add(new DogForMeetingDTO("choco.png", "choco", "independence", "active", true));
		partnerDogs.add(new DogForMeetingDTO("choco.png", "choco", "independence", "active", true));
		partnerDogs.add(new DogForMeetingDTO("choco.png", "choco", "independence", "active", true));
		meeting.setPartnerDogs(partnerDogs);

		meeting.setStatus("done");
		meeting.setRated(true);

		meetingList.add(meeting);

		Map<String, Object> resultMap = new HashMap<String, Object>();
		resultMap.put("result", SUCCESS);
		resultMap.put("meetingList", meetingList);
		return new ResponseEntity<Map<String, Object>>(resultMap, HttpStatus.OK);
	}

	@ApiOperation(value = "산책 약속 요청", notes = "새로운 산책 약속을 요청합니다.")
	@PostMapping
	public ResponseEntity<?> postingNewAppointment(@RequestBody AppointMentInfo appointmentInfo) {

		// 구현시 유의 하며 변경 요망
		long userId = Long.parseLong((String) appointmentInfo.getUserId());
		List<DogDTO> myDogs = appointmentInfo.getMyDogs();
		List<DogDTO> partnerDogs = appointmentInfo.getPartnerDogs();
		String date = appointmentInfo.getDate();
		String place =appointmentInfo.getPlace();

		// print check section /////////////////////////////////////////////////
		System.out.println("param 전달 값 확인:");
		System.out.println("요청 대상 id : " + userId);
		System.out.println("my dog list: ");
		for (DogDTO dog : myDogs) {
			System.out.println(dog);
		}
		System.out.println("partner's dog list");
		for (DogDTO dog : partnerDogs) {
			System.out.println(dog);
		}
		System.out.println("요청 시간 : " + date);
		System.out.println("요청 장소 : " + place);
		////////////////////////////////////////////////////

		Map<String, Object> resultMap = new HashMap<String, Object>();
		resultMap.put("result", SUCCESS);
		resultMap.put("msg", "산책 요청이 성공적으로 이루어졌습니다.");
		return new ResponseEntity<Map<String, Object>>(resultMap, HttpStatus.OK);
	}

	@ApiOperation(value = "산책 약속 취소", notes = "신청 했던 약속을 취소 처리합니다.")
	@PutMapping("/cancel")
	public ResponseEntity<?> cancelAppointment(@RequestParam String appointmentId) {
		Map<String, Object> resultMap = new HashMap<String, Object>();
		resultMap.put("result", SUCCESS);
		resultMap.put("msg", "산책 요청이 취소되었습니다.");
		return new ResponseEntity<Map<String, Object>>(resultMap, HttpStatus.OK);
	}

	@ApiOperation(value = "산책 약속 수락", notes = "신청 받은 약속을 수락 처리합니다.")
	@PutMapping("/accept")
	public ResponseEntity<?> acceptAppointment(@RequestParam String appointmentId) {
		Map<String, Object> resultMap = new HashMap<String, Object>();
		resultMap.put("result", SUCCESS);
		resultMap.put("msg", "산책 요청이 수락되었습니다.");
		return new ResponseEntity<Map<String, Object>>(resultMap, HttpStatus.OK);
	}

	@ApiOperation(value = "산책 약속 거절", notes = "신청 받은 약속을 거절 처리합니다.")
	@DeleteMapping
	public ResponseEntity<?> denyAppointment(@RequestParam String appointmentId) {
		Map<String, Object> resultMap = new HashMap<String, Object>();
		resultMap.put("result", SUCCESS);
		resultMap.put("msg", "산책 요청이 거절되었습니다.");
		return new ResponseEntity<Map<String, Object>>(resultMap, HttpStatus.OK);
	}

	@ApiOperation(value = "산책 별점 매기기", notes = "완료한 산책 약속에 별점을 부여합니다.")
	@PostMapping("/rating")
	public ResponseEntity<?> ratingAppointment(
			@RequestBody RatingAppointmentDTO ratingAppointmentDTO) {
		Map<String, Object> resultMap = new HashMap<String, Object>();
		resultMap.put("result", SUCCESS);
		resultMap.put("msg", "별점이 반영되었습니다.");
		return new ResponseEntity<Map<String, Object>>(resultMap, HttpStatus.OK);
	}

	@ApiOperation(value = "산책 친구 추천받기", notes = "특정 강아지에게 맞는 산책 친구를 추천해줍니다.")
	@PostMapping("/recommend")
	public ResponseEntity<?> recommendDog(@RequestParam String dogId) {

		//////////////////////// HARD CODING//////////////////////
		List<DogDTO> dogList = new ArrayList<DogDTO>();
		DogDTO dog1 = new DogDTO();
		dog1.setDogId(23);
		dog1.setDogProfile("choco.png");
		dog1.setDogName("초코");
		dog1.setDogCharacter1("independent");
		dog1.setDogCharacter2("active");
		dog1.setDogGender("female");
		dog1.setDogType("푸들");
		dog1.setDogAge(2);
		dog1.setDogNeutered(true);
		dog1.setUserId(42);
		dog1.setNickName("요닝");
		dog1.setAddress("서울특별시 강남구 역삼동");
		dogList.add(dog1);

		DogDTO dog2 = new DogDTO();
		dog2.setDogId(23);
		dog2.setDogProfile("choco.png");
		dog2.setDogName("초코");
		dog2.setDogCharacter1("independent");
		dog2.setDogCharacter2("active");
		dog2.setDogGender("female");
		dog2.setDogType("푸들");
		dog2.setDogAge(2);
		dog2.setDogNeutered(true);
		dog2.setUserId(42);
		dog2.setNickName("요닝");
		dog2.setAddress("서울특별시 강남구 역삼동");
		dogList.add(dog2);

		DogDTO dog3 = new DogDTO();
		dog3.setDogId(23);
		dog3.setDogProfile("choco.png");
		dog3.setDogName("초코");
		dog3.setDogCharacter1("independent");
		dog3.setDogCharacter2("active");
		dog3.setDogGender("female");
		dog3.setDogType("푸들");
		dog3.setDogAge(2);
		dog3.setDogNeutered(true);
		dog3.setUserId(42);
		dog3.setNickName("요닝");
		dog3.setAddress("서울특별시 강남구 역삼동");
		dogList.add(dog3);
		////////////////////////HARD CODING//////////////////////

		Map<String, Object> resultMap = new HashMap<String, Object>();
		resultMap.put("result", SUCCESS);
		resultMap.put("dogs", dogList);
		return new ResponseEntity<Map<String, Object>>(resultMap, HttpStatus.OK);
	}

}
