package ru.project.chat_1.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import ru.project.chat_1.model.Category;

@Repository
public interface CategoryRepository extends MongoRepository<Category, String> {
}
