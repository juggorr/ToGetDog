package com.ssafy.togetdog.facility.model.dto;

import com.ssafy.togetdog.facility.model.entity.Facility;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class FacilityDTO {
	private long facilityId;
	
	private String facilityName;
	
	private String facilityAddress;

	private String type;
	
	private double longitude;
	
	private double latitude;

	private double distance;
	
	private String phone;
	
	private String closedDays;
	
	private String openingHours;
	
	
	public static FacilityDTO of(Facility facility) {
		return FacilityDTO.builder()
				.facilityId(facility.getFacilityId())
				.facilityName(facility.getFacilityName())
				.facilityAddress(facility.getFacilityAddress())
				.type(facility.getType())
				.longitude(facility.getLongitude())
				.latitude(facility.getLatitude())
				.phone(facility.getPhone())
				.closedDays(facility.getClosedDays())
				.openingHours(facility.getOpeningHours())
				.build();
	}
}
