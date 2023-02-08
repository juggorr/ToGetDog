package com.ssafy.togetdog.notify.model.service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import javax.transaction.Transactional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.ssafy.togetdog.dog.model.service.DogService;
import com.ssafy.togetdog.notify.model.dto.NoticeDTO;
import com.ssafy.togetdog.notify.model.dto.NotifyRespDTO;
import com.ssafy.togetdog.notify.model.entity.Notify;
import com.ssafy.togetdog.notify.model.repository.NotifyRepository;
import com.ssafy.togetdog.user.model.entity.User;

import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class NotifyServiceImpl implements NotifyService {
	
	private final NotifyRepository notifyRepository;
	private final DogService dogService;
	
	/* 팔로우insert */
	@Override
	public void insertNotify(User receiver, User sender, String notiType, long dogId) {
		Notify newNoti = Notify.builder()
				.receiver(receiver)
				.sender(sender)
				.notifyType(notiType)
				.dogId(dogId)
				.check(false)
				.build();
		notifyRepository.save(newNoti);
	}
	
	/* 좋아요 insert */
	@Override
	public void insertNotify(User receiver, User sender, String notiType, long dogId, long boardId) {
		Notify newNoti = Notify.builder()
				.receiver(receiver)
				.sender(sender)
				.notifyType(notiType)
				.boardId(boardId)
				.dogId(dogId)
				.check(false)
				.build();
		notifyRepository.save(newNoti);
	}
	
	/* 산책 취소 insert */
	@Override
	public void insertNotify(User user, String notiType) {		
		Notify newNoti = Notify.builder()
				.receiver(user)
				.notifyType(notiType)
				.check(false)
				.build();
		notifyRepository.save(newNoti);
	}
	
	/* 산책 취소 알림 확인 처리*/
	@Override
	public void updateNotify(User user) {
		notifyRepository.deleteAppointmentCancelNotifyByUserId(user.getUserId());
	}
 
	/* 알림을 받은 사람 기준으로 알림 리스트 조회*/
	@Override
	public List<Notify> findNotifyListByUser(User user) {
		return notifyRepository.findAllByReceiver(user).orElse(null);
	}
	
	@Override
	public void deleteNotify(Notify notify) {
		notifyRepository.delete(notify);
		                                                
	}
	
	@Override
	public NotifyRespDTO getNotiList(User user, int pageNo) throws NumberFormatException {
		// 해당 유저의 좋아요, 팔로우 알림만 알림이 생성된 순서의 내림차순으로 조회합니다.
        List<String> notifyTypes = new ArrayList<String>();
        notifyTypes.add("l");
        notifyTypes.add("f");
        Pageable pageable = PageRequest.of(pageNo, 20);
        Page<Notify> notifications = notifyRepository.findAllByReceiverAndNotifyTypeInOrderByNotifyDateDesc(user, notifyTypes, pageable);
		
		// appointmentRepository에 Long countByReceivedUserId 해서 가져옵니다.
		long meetingCnt = 0;
		
		// 해당 유저의 약속 취소 알림 중 확인안한 알림만 가져옵니다.
		long cancelCnt = notifyRepository.countByReceiverAndNotifyTypeAndCheck(user, "c", false);
		boolean meetingCancel = false;
		if (cancelCnt > 0) {
			meetingCancel = true;
		}
		List<NoticeDTO> noticeList = notifications.stream().map(n -> NoticeDTO.of(n, dogService.findDogByDogId(n.getDogId()).getDogName()))
				.collect(Collectors.toList());
		return NotifyRespDTO.builder()
			.meetingCnt(meetingCnt)
			.meetingCancel(meetingCancel)
			.noticeList(noticeList)
			.build();
	}

}
