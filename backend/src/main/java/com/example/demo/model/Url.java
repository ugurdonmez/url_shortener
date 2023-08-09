package com.example.demo.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

import lombok.*;

import java.time.LocalDateTime;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString
public class Url {

    @Id
    @GeneratedValue
    @ToString.Exclude
    private long id;

    @Column(unique = true)
    private String originalUrl;
    @Column(unique = true)
    private String shortUrl;
    private LocalDateTime creationDate;
}
