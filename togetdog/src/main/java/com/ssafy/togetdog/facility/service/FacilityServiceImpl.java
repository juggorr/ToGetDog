package com.ssafy.togetdog.facility.service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import javax.annotation.PostConstruct;
import javax.transaction.Transactional;

import org.springframework.stereotype.Service;

import com.ssafy.togetdog.facility.model.dto.FacilityDTO;
import com.ssafy.togetdog.facility.repository.FacilityRepository;

import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class FacilityServiceImpl implements FacilityService{

	private final FacilityRepository fr;

	private static List<FacilityDTO> list;
	
	@PostConstruct
	private void callList() {
		this.list = fr.findAll().stream()
				.map(f ->FacilityDTO.of(f))
				.collect(Collectors.toList());
	}

	@Transactional
	public List<FacilityDTO> findList(double lo, double la) {
		List<FacilityDTO> result = new ArrayList<>();
		double dist;
		for (FacilityDTO dto : list) {
			dist = distance(la , lo  , dto.getLatitude() , dto.getLongitude());
	        if(dist <= 3) {
	        	dist = Math.round(dist * 100) / 100.0;
	        	dto.setDistance(dist);
	        	result.add(dto);
	        }
		}
		return result;
	}
	public double distance(double lat1, double lon1, double lat2, double lon2) {

        double theta = lon1 - lon2;
        double dist = Math.sin(deg2rad(lat1)) * Math.sin(deg2rad(lat2)) + Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.cos(deg2rad(theta));

        dist = Math.acos(dist);
        dist = rad2deg(dist);
        dist = dist * 60 * 1.1515;
        dist = dist * 1.609344;
        return (dist);
    }
	
    public double deg2rad(double deg) {
        return (deg * Math.PI / 180.0);
    }

    // This function converts radians to decimal degrees
    public double rad2deg(double rad) {
        return (rad * 180 / Math.PI);
    }
}
