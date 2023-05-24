package ru.project.chat_1.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

@Document("user")
public class Client {
    @Id
    public String id;
    @DBRef
    public User user;
}
