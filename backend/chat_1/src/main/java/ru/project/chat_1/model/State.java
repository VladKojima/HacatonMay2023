package ru.project.chat_1.model;

public class State{
    public String userId;
    public States state = States.FREE;
    public enum States{
        FREE, READING, WRITING
    }
}

