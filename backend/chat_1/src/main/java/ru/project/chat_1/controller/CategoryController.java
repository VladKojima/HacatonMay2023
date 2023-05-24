package ru.project.chat_1.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import ru.project.chat_1.model.Category;
import ru.project.chat_1.repository.CategoryRepository;

import java.util.List;

@RestController
public class CategoryController {
    @Autowired
    private CategoryRepository categoryRepository;

    @GetMapping("/categories")
    public List<Category> findAllCategory(){
        return categoryRepository.findAll();
    }
}
