package ru.project.chat_1.repository;


import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import ru.project.chat_1.model.Chat;

import java.util.List;

@Repository
public interface ChatRepository extends MongoRepository<Chat, String> {
    //Optional<Chat> findBySenderIdAndRecipientId(String senderId, String recipientId);

    @Query("{'$or': [{'clientId' : ?#{#user}}, {'managerId': ?#{#user}}]}")
    List<Chat> findAllForUser(@Param("user") String user);

}
