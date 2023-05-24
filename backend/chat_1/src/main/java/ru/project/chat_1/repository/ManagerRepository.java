package ru.project.chat_1.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import ru.project.chat_1.model.Manager;

import java.util.List;
import java.util.Optional;

@Repository
public interface ManagerRepository extends MongoRepository<Manager, String> {
    @Override
    @Query(value = "{category: {$exists: 1}}")
    List<Manager> findAll();

    @Override
    @Query("{_id: ?#{#id}, category: {$exists: 1}}")
    Optional<Manager> findById(@Param("id") String id);

    @Query("{category: {$exists: 1,$eq: null}}")
    List<Manager> findAllFirstLine();

    @Query("{category: ?#{#category}}")
    List<Manager> findByCategoryId(@Param("category") String category);

}
