package com.ssafy.togetdog.appointment.model.service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
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
import com.ssafy.togetdog.dog.model.dto.DogInfoForUserDTO;
import com.ssafy.togetdog.dog.model.dto.DogInfoRespDTO;
import com.ssafy.togetdog.dog.model.entity.Dog;
import com.ssafy.togetdog.dog.model.repository.DogRepository;
import com.ssafy.togetdog.user.model.entity.User;
import com.ssafy.togetdog.user.model.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class AppointmentService {
	private final Logger logger = LoggerFactory.getLogger(AppointmentService.class);
	
	private final AppointmentRepository appointmentRepository;
	private final SentAppointmentRepository sentAppointmentRepository;
	private final ReceivedAppointmentRepository receivedAppointmentRepository;
	private final UserRepository userRepository;
	private final DogRepository dogRepository;

	public List<AppointmentListDTO> findAllByUserId(long userId) {
		User user = new User();
		user.setUserId(userId);
		
		
		List<Appointment> reqlist = appointmentRepository.findAllBySentUserOrReceivedUser(user, user);
		
		List<AppointmentListDTO> requestList = reqlist.stream()
				.map(a-> AppointmentListDTO.of(a)).collect(Collectors.toList());
		logger.info("============== : {}", requestList);
		
		// 약속 리스트
		for (int i = 0; i < requestList.size(); i++) {
			List<DogInfoRespDTO> sentDogs = new ArrayList<>(); 
			List<DogInfoRespDTO> recvDogs = new ArrayList<>(); 
			List<SentAppointment> sentApps = sentAppointmentRepository.findAllByAppointment(reqlist.get(i));
			logger.info("=====sentApps========= : {}", sentApps.size());
			for (SentAppointment sent : sentApps) {
				sentDogs.add(DogInfoRespDTO.of(sent.getDog(), Double.parseDouble(sent.getDog().getDogWeight())));
				logger.info("============== : {}", sentDogs);
			}
			logger.info("!============== : {}", sentDogs);
			requestList.get(i).setUserOneDogs(sentDogs);
			
			List<ReceivedAppointment> recvApps = receivedAppointmentRepository.findAllByAppointment(reqlist.get(i));
			logger.info("=====recvApps========= : {}", recvApps.size());
			for (ReceivedAppointment recv : recvApps) {
				recvDogs.add(DogInfoRespDTO.of(recv.getDog(), Double.parseDouble(recv.getDog().getDogWeight())));
				logger.info("============== : {}", recvDogs);
			}
			logger.info("!============== : {}", recvDogs);
			requestList.get(i).setUserTwoDogs(recvDogs);
		}
		logger.info("return appointment sentList : {}", requestList.size());
		logger.info("return appointment sentList : {}", requestList);
		
		/*
		 * //recv, sent 분리된 리스트 
		 * User user = new User(); user.setUserId(userId);
		 * List<Appointment> sentlist = appointmentRepository.findAllBySentUser(user);
		 * List<Appointment> recvlist =
		 * appointmentRepository.findAllByReceivedUser(user);
		 * 
		 * 
		 * List<AppointmentListDTO> sentList = sentlist.stream()
		 * .map(a->AppointmentListDTO.of(a)).collect(Collectors.toList());
		 * List<AppointmentListDTO> recvList = recvlist.stream()
		 * .map(a->AppointmentListDTO.of(a)).collect(Collectors.toList());
		 * logger.info("============== : {}", sentList);
		 * logger.info("-------------- : {}", recvList);
		 * 
		 * // 내가 보낸 약속 for (int i = 0; i < sentList.size(); i++) { List<SentAppointment>
		 * sentApps = sentAppointmentRepository.findAllByAppointment(sentlist.get(i));
		 * List<DogInfoRespDTO> sentDogs = new ArrayList<>(); for (SentAppointment sent
		 * : sentApps) { sentDogs.add(DogInfoRespDTO.of(sent.getDog())); }
		 * sentList.get(i).setSentDogs(sentDogs); List<SentAppointment> recvApps =
		 * sentAppointmentRepository.findAllByAppointment(sentlist.get(i));
		 * List<DogInfoRespDTO> recvDogs = new ArrayList<>(); for (SentAppointment recv
		 * : recvApps) { recvDogs.add(DogInfoRespDTO.of(recv.getDog())); }
		 * sentList.get(i).setReceivedDogs(recvDogs); }
		 * logger.info("return appointment sentList : {}", sentList.size());
		 * logger.info("return appointment sentList : {}", sentList);
		 * 
		 * // 내가 받은 약속 for (int i = 0; i < recvlist.size(); i++) {
		 * List<ReceivedAppointment> sentApps =
		 * receivedAppointmentRepository.findAllByAppointment(recvlist.get(i));
		 * List<DogInfoRespDTO> sentDogs = new ArrayList<>(); for (ReceivedAppointment
		 * sent : sentApps) { sentDogs.add(DogInfoRespDTO.of(sent.getDog())); }
		 * recvList.get(i).setSentDogs(sentDogs); List<ReceivedAppointment> recvApps =
		 * receivedAppointmentRepository.findAllByAppointment(recvlist.get(i));
		 * List<DogInfoRespDTO> recvDogs = new ArrayList<>(); for (ReceivedAppointment
		 * recv : recvApps) { recvDogs.add(DogInfoRespDTO.of(recv.getDog())); }
		 * recvList.get(i).setReceivedDogs(recvDogs); }
		 * logger.info("return appointment recvList : {}", recvList.size());
		 * logger.info("return appointment recvList : {}", recvList);
		 */		
		return requestList;
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
			long aSum = bSum;
			if(rating == 0) { // 산책 약속 "noshow"했을 경우
				aSum -= 5;
			} else {
				aSum += rating;
			}
			long bCnt = appointment.getReceivedUser().getRatingCount();
			long aCnt = bCnt + 1;
			appointment.getReceivedUser().setRatingSum(aSum);
			appointment.getReceivedUser().setRatingCount(aCnt);
			appointment.setSenderRated(true);
			appointmentRepository.save(appointment);
		} else {
			if(appointment.isReceiverRated()) return;
			long bSum = appointment.getSentUser().getRatingSum();
			long aSum = bSum;
			if(rating == 0) { // 산책 약속 "noshow"했을 경우
				aSum -= 5;
			} else {
				aSum += rating;
			}
			long bCnt = appointment.getSentUser().getRatingCount();
			long aCnt = bCnt + 1;
			appointment.getSentUser().setRatingSum(aSum);
			appointment.getSentUser().setRatingCount(aCnt);
			appointment.setReceiverRated(true);
			appointmentRepository.save(appointment);
		}
	}

	public List<DogInfoRespDTO> recommendFriendsForDog(long userId, long dogId) {
		User user = userRepository.findById(userId).orElse(null);
		String regionCode = user.getRegionCode();
		
		Dog dog = dogRepository.findByDogId(dogId);
		DogInfoRespDTO myDog = DogInfoRespDTO.of(dog, Double.parseDouble(dog.getDogWeight()));
		logger.info("myDog ============== : {}", myDog);
		boolean neutured = myDog.isDogNeutered();
		int age = myDog.getDogAge() % 12;
		LocalDateTime now = LocalDateTime.now();
		String tenYearBefore = String.valueOf(now.minusYears(10)).substring(0, 4);
		String fiveYearBefore = String.valueOf(now.minusYears(5)).substring(0, 4);
		String oneYearBefore = String.valueOf(now.minusYears(1)).substring(0, 4);
		String thisYear = String.valueOf(now).substring(0, 4);
		logger.info("age ============== : {}", age);
		double weight = myDog.getDogWeight();
		String startWeight = "-1";
		String endWeight = "-1";
		String gender = myDog.getDogGender().substring(0, 1);
		
		/*
		 * 중성화 했으면 중성화 한 강아지 대상으로
		 * 중성화 안했으면 같은 성별끼리만 ,
		 *  
		 * 소형    중형       대형
		 *  <6kg <10kg
		 * 소형은 중형까지, 중형은 다되는걸로 하고 대형은 중형까지
		 * 
		 * 나이는
		 * 1살 미만, 1살 ~ 5살, 5살 ~ 10살, 10살 이상
		 */
		if(weight < 6.0) {
			startWeight = "0";
			endWeight = "5.9";
		} else if (weight >= 10.0) {
			startWeight = "10";
			endWeight = "80";
		} else {
			startWeight = "0";
			endWeight = "80";
		}
		List<Object[]> recList = new ArrayList<Object[]>();
		List<DogInfoRespDTO> reclist = new ArrayList<DogInfoRespDTO>();
		
		if(neutured) { // 중성화 한 강아지 true = 1, false = 0
//			if(age < 1) { // 1살 미만
//				recList = appointmentRepository.getNeuturedList(userId, regionCode, oneYearBefore, thisYear, startWeight, endWeight);
//				recList = appointmentRepository.getNeuturedList(userId, regionCode);
//			} else if(age < 5) { // 1~5살
//				recList = appointmentRepository.getNeuturedList(userId, regionCode, fiveYearBefore, oneYearBefore, startWeight, endWeight);
//			} else if(age < 10) { // 5~10살
//				recList = appointmentRepository.getNeuturedList(userId, regionCode, tenYearBefore, fiveYearBefore, startWeight, endWeight);
//			} else { // 10살 이상
//				recList = appointmentRepository.getNeuturedList(userId, regionCode, "190001", tenYearBefore, startWeight, endWeight);
//			}
//		} else { // 중성화 안한 강아지, 쿼리 문 뒤에 dogGender 붙여야함
//			if(age < 1) { // 1살 미만
//				recList = appointmentRepository.getGenderList(userId, regionCode, oneYearBefore, thisYear, startWeight, endWeight, gender);
//			} else if(age < 5) { // 1~5살
//				recList = appointmentRepository.getGenderList(userId, regionCode, fiveYearBefore, oneYearBefore, startWeight, endWeight, gender);
//			} else if(age < 10) { // 5~10살
//				recList = appointmentRepository.getGenderList(userId, regionCode, tenYearBefore, fiveYearBefore, startWeight, endWeight, gender);
//			} else { // 10살 이상
//				recList = appointmentRepository.getGenderList(userId, regionCode, "190001", tenYearBefore, startWeight, endWeight, gender);
//			}
		}
		logger.info("recommendedList ============== : {}", recList);
//		reclist = recList.stream().map(d-> DogInfoRespDTO.of(d, Double.parseDouble(d.getDogWeight())))
//			.collect(Collectors.toList());
//		return reclist;
		return null;
	}
	
	public Appointment findAppointmentById(long roomId) {
		return appointmentRepository.findById(roomId).orElse(null);
	}
	
	// 테스트 method에요. controller에 만만한게 산책친구 찾기라서 거기서 테스트 해봤습니다.
	public void test() {
		// userid, region code 4 / 41135
		List<Object[]> tmpResult = appointmentRepository.getNeuturedList(4, "41135");
		List<DogInfoRespDTO> result = tmpResult.stream().map(r -> test2(r)).collect(Collectors.toList());
		for (DogInfoRespDTO dogInfoRespDTO : result) {
			logger.info("조회 dto ======= : {} ", dogInfoRespDTO);
		}
	}
	
	// 쿼리 조회 결과를 dto로 변환해주는 method입니다.
	public DogInfoRespDTO test2(Object[] result) {
		//birth 기준으로 개월 수 변환
		LocalDateTime now = LocalDateTime.now();
		int nowMonth = (now.getYear() * 12) + now.getMonthValue();
		int dogMonth = (Integer.parseInt(((String)result[5]).substring(0, 4)) * 12)
				+ Integer.parseInt(((String)result[5]).substring(4, 6));
		return DogInfoRespDTO.builder()
				.dogId(Long.parseLong(String.valueOf(result[0])))
				.userId(Long.parseLong(String.valueOf(result[1])))
				.dogName(String.valueOf(result[2]))
				.dogGender(String.valueOf(result[3]))
				.dogType(String.valueOf(result[4]))
				.dogAge(nowMonth - dogMonth)
				.dogWeight(Double.parseDouble(String.valueOf(result[6])))
				.dogNeutered(((Boolean) result[7]).booleanValue())
				.dogCharacter1(String.valueOf(result[8]))
				.dogCharacter2(String.valueOf(result[9]))
				.description(String.valueOf(result[10]))
				.dogProfile(String.valueOf(result[11]))
				.build();
	}
}
