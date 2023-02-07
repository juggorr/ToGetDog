package com.ssafy.togetdog.appointment.model.service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ssafy.togetdog.appointment.model.dto.AppointmentInfoRegistDTO;
import com.ssafy.togetdog.appointment.model.dto.AppointmentInfoRespDTO;
import com.ssafy.togetdog.appointment.model.dto.AppointmentListDTO;
import com.ssafy.togetdog.appointment.model.entity.Appointment;
import com.ssafy.togetdog.appointment.model.entity.ReceivedAppointment;
import com.ssafy.togetdog.appointment.model.entity.SentAppointment;
import com.ssafy.togetdog.appointment.model.repository.AppointmentRepository;
import com.ssafy.togetdog.appointment.model.repository.ReceivedAppointmentRepository;
import com.ssafy.togetdog.appointment.model.repository.SentAppointmentRepository;
import com.ssafy.togetdog.board.model.service.BoardService;
import com.ssafy.togetdog.dog.model.dto.DogInfoRespDTO;
import com.ssafy.togetdog.dog.model.entity.Dog;
import com.ssafy.togetdog.user.model.entity.User;

import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class AppointmentService {
	private final Logger logger = LoggerFactory.getLogger(AppointmentService.class);
	
	private final AppointmentRepository appointmentRepository;
	private final SentAppointmentRepository sentAppointmentRepository;
	private final ReceivedAppointmentRepository receivedAppointmentRepository;

	public List<AppointmentListDTO> findAllByUserId(long userId) {
		User user = new User();
		user.setUserId(userId);
		List<Appointment> sentlist = appointmentRepository.findAllBySentUser(user);
		List<Appointment> recvlist = appointmentRepository.findAllByReceivedUser(user);

		
		List<AppointmentListDTO> sentList = sentlist.stream()
				.map(a->AppointmentListDTO.of(a)).collect(Collectors.toList());
		List<AppointmentListDTO> recvList = recvlist.stream()
				.map(a->AppointmentListDTO.of(a)).collect(Collectors.toList());
		logger.info("============== : {}", sentList);
		logger.info("-------------- : {}", recvList);
		
		// 내가 보낸 약속
		for (int i = 0; i < sentList.size(); i++) {
			List<SentAppointment> sentApps = sentAppointmentRepository.findAllByAppointment(sentlist.get(i));
			List<DogInfoRespDTO> sentDogs = new ArrayList<>(); 
			for (SentAppointment sent : sentApps) {
				sentDogs.add(DogInfoRespDTO.of(sent.getDog()));
			}
			sentList.get(i).setSentDogs(sentDogs);
			List<SentAppointment> recvApps = sentAppointmentRepository.findAllByAppointment(sentlist.get(i));
			List<DogInfoRespDTO> recvDogs = new ArrayList<>(); 
			for (SentAppointment recv : recvApps) {
				recvDogs.add(DogInfoRespDTO.of(recv.getDog()));
			}
			sentList.get(i).setReceivedDogs(recvDogs);
		}
		logger.info("return appointment sentList : {}", sentList.size());
		logger.info("return appointment sentList : {}", sentList);
		
		// 내가 받은 약속
		for (int i = 0; i < recvlist.size(); i++) {
			List<ReceivedAppointment> sentApps = receivedAppointmentRepository.findAllByAppointment(recvlist.get(i));
			List<DogInfoRespDTO> sentDogs = new ArrayList<>(); 
			for (ReceivedAppointment sent : sentApps) {
				sentDogs.add(DogInfoRespDTO.of(sent.getDog()));
			}
			recvList.get(i).setSentDogs(sentDogs);
			List<ReceivedAppointment> recvApps = receivedAppointmentRepository.findAllByAppointment(recvlist.get(i));
			List<DogInfoRespDTO> recvDogs = new ArrayList<>(); 
			for (ReceivedAppointment recv : recvApps) {
				recvDogs.add(DogInfoRespDTO.of(recv.getDog()));
			}
			recvList.get(i).setReceivedDogs(recvDogs);
		}
		logger.info("return appointment recvList : {}", recvList.size());
		logger.info("return appointment recvList : {}", recvList);
		
		return recvList;
	}

	public void addAppointment(long myId, long userId, List<Dog> myDogs, List<Dog> partnerDogs, LocalDateTime date,
			String place) {
		AppointmentInfoRegistDTO apInfoRegistDTO = new AppointmentInfoRegistDTO();
		apInfoRegistDTO.setSentUserId(myId);
		apInfoRegistDTO.setReceivedUserId(userId);
		apInfoRegistDTO.setDateTime(date);
		apInfoRegistDTO.setPlace(place);
		apInfoRegistDTO.setStatus("wait");
		Appointment appointment = apInfoRegistDTO.toAppointment();
		appointmentRepository.save(appointment);
		
		logger.info("return appointment roomId : {}", appointment.getRoomId());
		for (Dog dog : myDogs) {
			sentAppointmentRepository.save(apInfoRegistDTO
					.toSentAppointment(appointment.getRoomId(), dog.getDogId()));
		}
		
		for (Dog dog : partnerDogs) {
			receivedAppointmentRepository.save(apInfoRegistDTO
					.toReceivedAppointment(appointment.getRoomId(), dog.getDogId()));
		}
		
		
	}

	public void updateAppointment(long roomId, String status) {
		Appointment appointment = appointmentRepository.findById(roomId).orElse(null);
		appointment.setStatus(status);
		appointmentRepository.save(appointment);
		
	}

	public void deleteAppointment(long roomId) {
		Optional<Appointment> appointment = appointmentRepository.findById(roomId);
		//entity mapping이 안돼서 하위 속성 삭제 먼저함
		receivedAppointmentRepository.deleteByAppointment(appointment);
		sentAppointmentRepository.deleteByAppointment(appointment);
		appointmentRepository.deleteById(roomId);		
	}

	public void rateAppointment(long userId, long roomId, int rating) {
		Appointment appointment = appointmentRepository.findById(roomId).orElse(null);
		logger.info("rateAppointment ==== appointemnt : {}", appointment);
		if(appointment.getSentUser().getUserId() == userId) {
			if(appointment.isSenderRated()) return;
			long bSum = appointment.getReceivedUser().getRatingSum();
			long aSum = bSum + rating;
			long bCnt = appointment.getReceivedUser().getRatingCount();
			long aCnt = bCnt + 1;
			appointment.getReceivedUser().setRatingSum(aSum);
			appointment.getReceivedUser().setRatingCount(aCnt);
			appointment.setSenderRated(true);
			appointmentRepository.save(appointment);
		} else {
			if(appointment.isReceiverRated()) return;
			long bSum = appointment.getSentUser().getRatingSum();
			long aSum = bSum + rating;
			long bCnt = appointment.getSentUser().getRatingCount();
			long aCnt = bCnt + 1;
			appointment.getSentUser().setRatingSum(aSum);
			appointment.getSentUser().setRatingCount(aCnt);
			appointment.setReceiverRated(true);
			appointmentRepository.save(appointment);
		}
		
	}

}
