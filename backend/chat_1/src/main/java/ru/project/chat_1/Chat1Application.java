package ru.project.chat_1;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;

@SpringBootApplication
@EnableMongoRepositories
public class Chat1Application {

	public static void main(String[] args) {
		SpringApplication.run(Chat1Application.class, args);
	}

}
