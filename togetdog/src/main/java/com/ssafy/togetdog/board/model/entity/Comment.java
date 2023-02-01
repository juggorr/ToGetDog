package com.ssafy.togetdog.board.model.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.ssafy.togetdog.board.model.entity.Board;
import com.ssafy.togetdog.user.model.entity.User;
import com.sun.istack.NotNull;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name = "COMMENT")
@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class Comment {
	
    @Id
    @Column(name = "comment_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long commentId;
    
    @ManyToOne
    @JoinColumn(name="board_id")
    private Board board;
    
    @ManyToOne
    @JoinColumn(name="user_id")
//    @Column(name = "user_id")
    private User user;
    
    @Column(name = "comment_content")
    @NotNull
    private String commentContent;

    
}
