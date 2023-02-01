package com.ssafy.togetdog.board.model.entity;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.OrderBy;
import javax.persistence.Table;

import com.sun.istack.NotNull;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name = "BOARD")
@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class Board {
	
    @Id
    @Column(name = "board_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long boardId;
    
//    @ManyToOne
//    @JoinColumn(name="user_id")
    @Column(name = "user_id")
    private long userId;
    
//    @ManyToOne
//    @JoinColumn(name="dog_id")
    @Column(name = "dog_id")
    private long dogId;
    
    @NotNull
    private String image;
    
    private String content;
    
    @OneToMany(mappedBy = "board", cascade = CascadeType.ALL, orphanRemoval = true)
    @OrderBy("comment_id asc")
    private List<Comment> comments = new ArrayList<Comment>();

    
}
