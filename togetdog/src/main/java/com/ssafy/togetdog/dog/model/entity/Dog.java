package com.ssafy.togetdog.dog.model.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.validation.constraints.Size;

import com.ssafy.togetdog.user.model.entity.User;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name = "DOG")
@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class Dog {
	
	@Id
    @Column(columnDefinition = "INT UNSIGNED", name = "dog_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long dogId;
    
	@ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="userId")
    private User user;

    @Column(name = "dog_name", length = 10)
    private String dogName;
    
    @Column(name = "dog_gender", length = 1)
    @Size(min = 1, max = 1)
    private String dogGender;
    
    @Column(name = "dog_type", length = 50)
    private String dogType;
    
    @Column(name = "dog_birth", length = 6)
    private String dogBirth;
    
    @Column(name = "dog_weight", length = 4)
    private String dogWeight;
    
    @Column(name = "dog_neutered")
    private boolean dogNeutered;
    
    @Column(name = "dog_character1", length = 1)
    @Size(min = 1, max = 1)
    private String dogCharacter1;
    
    @Column(name = "dog_character2", length = 1)
    @Size(min = 1, max = 1)
    private String dogCharacter2;
    
    @Column(name = "dog_image", length = 100)
    private String dogImage;
    
    @Column(name = "description", length = 40)
    private String description;
}
