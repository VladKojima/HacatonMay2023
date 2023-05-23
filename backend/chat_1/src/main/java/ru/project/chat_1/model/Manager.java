package ru.project.chat_1.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

@Document("Manager")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class Manager {
    @Id
    public String id;
    @DBRef
    public Category category;
    @DBRef
    public User user;
}
