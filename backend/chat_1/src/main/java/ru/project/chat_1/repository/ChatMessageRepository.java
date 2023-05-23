package ru.project.chat_1.repository;

import org.apache.logging.log4j.message.Message;
import org.springframework.data.mongodb.repository.Aggregation;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;
import ru.project.chat_1.model.ChatMessage;
import ru.project.chat_1.model.MessageStatus;

import java.util.List;

@Repository
public interface ChatMessageRepository
        extends MongoRepository<ChatMessage, String> {

    /*
    long countBySenderIdAndRecipientIdAndStatus(
            String senderId, String recipientId, MessageStatus status);

     */

    List<ChatMessage> findByChatId(String chatId);


    /*
    @Aggregation(pipeline = {
            "{$lookup: {from: 'Chat', localField: 'chatId', foreignField: 'id', as: 'chat'}}",
            "{$match: {'chat.clientId': @user, 'chat.managerId': @user}}",
            "{$project: {id: '$id', sender: '$sender', chatId: '$chatId', content: '$content', date: '$date'}}"
    })*/

}