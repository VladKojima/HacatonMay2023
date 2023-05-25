package ru.project.chat_1.connect;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.net.HttpURLConnection;
import java.net.URL;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;

@Component
public class AuthService {
    static HttpClient client = HttpClient.newHttpClient();

    static HttpRequest.Builder reqPattern = HttpRequest.newBuilder().GET();

    @Value("{userConfig.auth}")
    String auth;

    public boolean checkUser(String userId, String token) throws Exception {

        HttpURLConnection con = (HttpURLConnection) new URL("http://"+auth+"/api/users/" + userId).openConnection();

        con.setRequestMethod("GET");
        con.setRequestProperty("Authorization", "Bearer "+token);
        con.connect();

        return con.getResponseCode()!=401;
    }

}
