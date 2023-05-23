package ru.project.chat_1.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@Builder
public class ChatNotification {
    private String id;
    private String senderId;
    private String senderName;

    public ChatNotification() {
    }
}
