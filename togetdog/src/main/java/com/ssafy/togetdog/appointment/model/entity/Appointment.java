package com.ssafy.togetdog.appointment.model.entity;

import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.ssafy.togetdog.user.model.entity.User;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name = "REQUEST")
@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class Appointment {
	
    @Id
    @Column(name = "room_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    @OneToMany(mappedBy = "appointment", cascade = CascadeType.ALL, orphanRemoval = true, fetch=FetchType.LAZY)
    private long roomId;
    
    @ManyToOne
    @JoinColumn(name="sent_user_id", referencedColumnName = "user_id")
    private User sentUser;
    
    @ManyToOne
    @JoinColumn(name="received_user_id", referencedColumnName = "user_id")
    private User receivedUser;
    
    @Column(length = 40)
    private String place;
    
    @Column(name="date_time")
    private LocalDateTime dateTime;
    
    @Column
    private String status;
    
    @Column(name = "is_sender_rate")
    private boolean isSenderRated;
    
    @Column(name = "is_receiver_rate")
    private boolean isReceiverRated; 
}    