package com.ssafy.togetdog.notify.model.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.ssafy.togetdog.notify.model.entity.Notify;
import com.ssafy.togetdog.user.model.entity.User;

public interface NotifyRepository extends JpaRepository<Notify, Long> {
	// 좋아요, 팔로우 알림 리스트를 반환합니다.
	Page<Notify> findAllByReceiverAndNotifyTypeInOrderByNotifyDateDesc(User user, List<String> notifyTypes, Pageable pageable);
	// 약속 취소 알람 갯수 반환
	Long countByReceiverAndNotifyTypeAndCheck(User user, String notifyType, boolean check);
	
	Optional<List<Notify>> findAllByReceiver(User user);
	
	// 약속 취소 알람 리스트 반환 -> 전부 삭제처리 하기 위해서
	Optional<List<Notify>> findAllByReceiverAndNotifyTypeAndCheck(User user, String notifyType, boolean check);
	
	@Modifying
	@Query(value = "delete from notify n where n.receiver_user_id=:userId and n.notify_type='c'", nativeQuery = true)
	void deleteAppointmentCancelNotifyByUserId(@Param("userId") long userId);
}
