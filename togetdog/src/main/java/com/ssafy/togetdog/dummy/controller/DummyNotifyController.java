package com.ssafy.togetdog.dummy.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.togetdog.dummy.domain.NoticeDTO;
import com.ssafy.togetdog.dummy.domain.NotifyDTO;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;

@RestController
@RequestMapping("/dummy/notify")
@Api("알림 관련 더미 API : 무슨 값을 넣든 같은 dummy 결과가 나옵니다.")
public class DummyNotifyController {
	
	private static final String SUCCESS = "success";
	// private static final String FAIL = "fail";

	@ApiOperation(value = "알림 리스트 조회", notes = "알림 탭에 들어왔을 때 가져올 정보 전체를 반환합니다.")
	@GetMapping
	public ResponseEntity<?> getNotifyList(
			) {
		NotifyDTO notifyInfo = new NotifyDTO();
		notifyInfo.setMeetingCnt(244);
		notifyInfo.setMeetingCancel(true);
		
		List<NoticeDTO> noticeList = new ArrayList<NoticeDTO>();
		NoticeDTO noticeInfo = new NoticeDTO();
		noticeInfo.setType("좋아요");
		noticeInfo.setNickName("크림엄마");
		noticeInfo.setDogName("뽀삐");
		noticeInfo.setId(1435);
		noticeList.add(noticeInfo);
		notifyInfo.setNotice(noticeList);
		
		Map<String, Object> resultMap = new HashMap<String, Object>();
		resultMap.put("result", SUCCESS);
		resultMap.put("notifyInfo", notifyInfo);
		return new ResponseEntity<Map<String, Object>>(resultMap, HttpStatus.OK);
	}
	
	@ApiOperation(value = "약속 취소 알림 확인", notes = "약속 취소 알림을 눌렀을 때 확인 여부를 업데이트합니다.")
	@PutMapping("/cancel")
	public ResponseEntity<?> confirmCancelNotify(
			) {
		Map<String, Object> resultMap = new HashMap<String, Object>();
		resultMap.put("result", SUCCESS);
		resultMap.put("msg", "약속 취소 알림을 확인처리했습니다.");
		return new ResponseEntity<Map<String, Object>>(resultMap, HttpStatus.OK);
	}

}
