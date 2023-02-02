package com.ssafy.togetdog.dummy.domain;

import lombok.Data;

@Data
public class storeDTO {

	private long facilityId;
	private String facilityName;
	private String facilityAddress;
	private String type;
	private double longitude;
	private double latitude;
	private double distance;
	private String phone;
	private boolean[] closedDays;
	private String[] openingHours;
}
