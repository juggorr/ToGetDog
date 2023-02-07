package com.ssafy.togetdog.notify.model.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ssafy.togetdog.notify.model.entity.Notify;
import com.ssafy.togetdog.user.model.entity.User;

public interface NotifyRepository extends JpaRepository<Notify, Long> {
	Optional<List<Notify>> findAllByReceiverAndNotifyTypeInOrderByNotifyDateDesc(User user, List<String> notifyTypes);
	Optional<List<Notify>> findAllByReceiverAndNotifyTypeAndCheck(User user, String notifyType, boolean check);
	Long countByReceiverAndNotifyTypeAndCheck(User user, String notifyType, boolean check);
}
