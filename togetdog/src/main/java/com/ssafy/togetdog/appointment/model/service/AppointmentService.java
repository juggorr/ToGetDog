package com.ssafy.togetdog.appointment.model.service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ssafy.togetdog.appointment.model.dto.AppointmentInfoRegistDTO;
import com.ssafy.togetdog.appointment.model.dto.AppointmentInfoRespDTO;
import com.ssafy.togetdog.appointment.model.entity.Appointment;
import com.ssafy.togetdog.appointment.model.entity.ReceivedAppointment;
import com.ssafy.togetdog.appointment.model.entity.SentAppointment;
import com.ssafy.togetdog.appointment.model.repository.AppointmentRepository;
import com.ssafy.togetdog.appointment.model.repository.ReceivedAppointmentRepository;
import com.ssafy.togetdog.appointment.model.repository.SentAppointmentRepository;
import com.ssafy.togetdog.board.model.service.BoardService;
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

	public List<AppointmentInfoRespDTO> findAllByUserId(int userId) {
		User user = new User();
		user.setUserId(userId);
		List<Appointment> sentlist = appointmentRepository.findAllBySentUser(user);
		List<Appointment> recvlist = appointmentRepository.findAllByReceivedUser(user);
		logger.info("return appointment sentList : {}", sentlist.toString());
		logger.info("return appointment recvList : {}", recvlist.toString());

		
		
		List<AppointmentInfoRespDTO> sentList = sentlist.stream()
				.map(a->AppointmentInfoRespDTO.of(a)).collect(Collectors.toList());
		List<AppointmentInfoRespDTO> recvList = recvlist.stream()
				.map(a->AppointmentInfoRespDTO.of(a)).collect(Collectors.toList());
		for (int i = 0; i < sentList.size(); i++) {
			List<SentAppointment> sentApps = sentAppointmentRepository.findAllByAppointment(sentlist.get(i));
			List<Dog> sentDogs = new ArrayList<>(); 
			for (SentAppointment sent : sentApps) {
				sentDogs.add(sent.getDog());
			}
			sentList.get(i).setSentDogs(sentDogs);
		}
		logger.info("return appointment sentList : {}", sentList.toString());
		for (int i = 0; i < recvList.size(); i++) {
			List<ReceivedAppointment> recvApps = receivedAppointmentRepository.findAllByAppointment(recvlist.get(i));
			List<Dog> recvDogs = new ArrayList<>(); 
			for (ReceivedAppointment recv : recvApps) {
				recvDogs.add(recv.getDog());
			}
			recvList.get(i).setSentDogs(recvDogs);
		}
		logger.info("return appointment recvList : {}", recvList.toString());
		return null;
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

}
