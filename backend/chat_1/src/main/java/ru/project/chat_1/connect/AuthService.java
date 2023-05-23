package ru.project.chat_1.connect;

import org.springframework.stereotype.Component;

import java.net.URI;
import java.net.URISyntaxException;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;

@Component
public class AuthService {
    static HttpClient client = HttpClient.newHttpClient();

    static HttpRequest.Builder reqPattern = HttpRequest.newBuilder().GET();

    public boolean checkUser(String userId, String token) throws Exception {
        HttpRequest req = reqPattern
                .uri(new URI("http://localhost:8081/api/users/" + userId))
                .header("Authorization", "Bearer " + token)
                .build();
        HttpResponse res = client.send(req, null);

        return res.statusCode()!=401;
    }
    /*
    Категория товаров - id, name;
    Менеджер - name, категория товаров
    Клиент - ссылка на юзера
    Юзер - начальная стадия, username, password, ФИО
    Chat - там будет id (храниться категория)

     */
}
