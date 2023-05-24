package ru.project.chat_1.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;
import ru.project.chat_1.model.Client;

import java.util.List;

@Repository
public interface ClientRepository extends MongoRepository<Client, String> {
    @Override
    @Query(value = "{category: {$exists: 0}}")
    List<Client> findAll();
}
