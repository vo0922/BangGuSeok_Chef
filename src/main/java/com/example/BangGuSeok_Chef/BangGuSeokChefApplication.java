package com.example.BangGuSeok_Chef;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@EnableJpaAuditing
@SpringBootApplication
public class BangGuSeokChefApplication {

	public static void main(String[] args) {
		SpringApplication.run(BangGuSeokChefApplication.class, args);
	}

}
