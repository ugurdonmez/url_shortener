package com.example.demo.model;

import lombok.*;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString
public class UrlResponseDTO {

    private String originalUrl;
    private String shortUrl;
    private LocalDateTime creationDate;

}
