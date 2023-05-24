package ru.project.chat_1.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import ru.project.chat_1.model.State;

@Repository
public interface StateRepository extends MongoRepository<State, String> {

}
