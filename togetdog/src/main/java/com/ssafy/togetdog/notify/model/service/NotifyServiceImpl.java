package com.ssafy.togetdog.notify.model.service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import javax.transaction.Transactional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.ssafy.togetdog.appointment.model.entity.Appointment;
import com.ssafy.togetdog.appointment.model.repository.AppointmentRepository;
import com.ssafy.togetdog.dog.model.repository.DogRepository;
import com.ssafy.togetdog.global.exception.InvalidInputException;
import com.ssafy.togetdog.notify.model.dto.NoticeDTO;
import com.ssafy.togetdog.notify.model.dto.NotifyRespDTO;
import com.ssafy.togetdog.notify.model.entity.Notify;
import com.ssafy.togetdog.notify.model.repository.NotifyRepository;
import com.ssafy.togetdog.user.model.entity.User;
import com.ssafy.togetdog.user.model.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class NotifyServiceImpl implements NotifyService {
	
	private final NotifyRepository notifyRepository;
	private final AppointmentRepository appointmentRepository;
	private final DogRepository dogRepository;
	private final UserRepository userRepository;
	
	/* 팔로우insert */
	@Override
	public void insertFollowNotify(User receiver, User sender, long dogId) {
		Notify newNoti = Notify.builder()
				.receiver(receiver)
				.sender(sender)
				.notifyType("f")
				.dogId(dogId)
				.notifyDate(LocalDateTime.now())
				.check(false)
				.build();
		notifyRepository.save(newNoti);
	}
	
	/* 좋아요 insert */
	@Override
	public void insertLikeNotify(User receiver, User sender, long dogId, long boardId) {
		Notify newNoti = Notify.builder()
				.receiver(receiver)
				.sender(sender)
				.notifyType("l")
				.boardId(boardId)
				.dogId(dogId)
				.notifyDate(LocalDateTime.now())
				.check(false)
				.build();
		notifyRepository.save(newNoti);
	}
	
	/* 산책 취소 insert */
	@Override
	public void insertCancelNotify(Appointment appointment, long userId) {
		User sender = userRepository.findById(userId).orElse(null);
		if (sender == null) {
			throw new InvalidInputException("찾을 수 없는 사용자 정보입니다.");
		}
		
		User receiver = appointment.getReceivedUser();
		if (receiver.getUserId() == sender.getUserId()) {
			receiver = appointment.getSentUser();
		}
		Notify newNoti = Notify.builder()
				.receiver(receiver)
				.sender(sender)
				.notifyType("c")
				.notifyDate(LocalDateTime.now())
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
	public NotifyRespDTO getNotiList(User user, int pageNo) throws NumberFormatException {
		// 해당 유저의 좋아요, 팔로우 알림만 알림이 생성된 순서의 내림차순으로 조회합니다.
        List<String> notifyTypes = new ArrayList<String>();
        notifyTypes.add("l");
        notifyTypes.add("f");
        Pageable pageable = PageRequest.of(pageNo, 20);
        Page<Notify> notifications = notifyRepository.findAllByReceiverAndNotifyTypeInOrderByNotifyDateDesc(user, notifyTypes, pageable);
		
		// appointmentRepository에 Long countByReceivedUserId 해서 가져옵니다.
		long meetingCnt = appointmentRepository.countByReceivedUserAndStatus(user, "wait");
		
		// 해당 유저의 약속 취소 알림 중 확인안한 알림만 가져옵니다.
		long cancelCnt = notifyRepository.countByReceiverAndNotifyTypeAndCheck(user, "c", false);
		boolean meetingCancel = false;
		if (cancelCnt > 0) {
			meetingCancel = true;
		}
		List<NoticeDTO> noticeList = notifications.stream().map(n -> NoticeDTO.of(n, dogRepository.findById(n.getDogId()).orElse(null).getDogName()))
				.collect(Collectors.toList());
		return NotifyRespDTO.builder()
			.meetingCnt(meetingCnt)
			.meetingCancel(meetingCancel)
			.noticeList(noticeList)
			.build();
	}
	
	@Override
	public List<Notify> findNotifyListByUser(User user) {
		return notifyRepository.findAllByReceiver(user).orElse(null);
	}
	
	@Override
	public void deleteNotify(Notify notify) {
		notifyRepository.delete(notify);
		                                                
	}
}
