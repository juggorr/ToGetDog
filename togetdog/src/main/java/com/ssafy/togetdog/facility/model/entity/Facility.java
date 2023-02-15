package com.ssafy.togetdog.facility.model.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Builder
@Entity
@Table(name = "facility")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Facility {
	@Id
	@Column(name = "facility_id")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long facilityId;
	
	@Column(name = "facility_name")
	private String facilityName;
	
	@Column(name = "facility_address")
	private String facilityAddress;

	@Column(name = "type")
	private String type;
	
	@Column(name = "longitude")
	private double longitude;
	
	@Column(name = "latitude")
	private double latitude;

	@Column(name = "phone")
	private String phone;
	
	@Column(name = "closed_days")
	private String closedDays;
	
	@Column(name = "opening_hours")
	private String openingHours;
	
}
