package com.ssafy.togetdog.follow.model.dto;

import com.ssafy.togetdog.dog.model.entity.Dog;
import com.ssafy.togetdog.follow.model.entity.Follow;
import com.ssafy.togetdog.user.model.entity.User;

import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@NoArgsConstructor
@Data
public class FollowDTO {
	private long followId;
	private long userId;
	private long dogId;
	
	public Follow toEntity() {
		User user = User.builder()
    			.userId(userId).build();
    	
    	Dog dog = Dog.builder()
    			.dogId(dogId).build();
    	
    	
    	Follow follow = Follow.builder()
    			.followId(followId)
    			.user(user)
    			.dog(dog).build();
		return follow;
	}

	@Builder
	public FollowDTO(long followId, long userId, long dogId) {
		this.followId = followId;
		this.userId = userId;
		this.dogId = dogId;
	}

	public FollowDTO(Follow entity) {
		this.followId = entity.getFollowId();
		this.userId = entity.getUser().getUserId();
		this.dogId = entity.getDog().getDogId();
	}
	
	
}
