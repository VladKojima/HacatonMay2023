package ru.project.chat_1.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.web.bind.annotation.*;
import ru.project.chat_1.model.Category;
import ru.project.chat_1.model.Manager;
import ru.project.chat_1.repository.CategoryRepository;
import ru.project.chat_1.repository.ManagerRepository;

import java.util.List;

@RestController
public class ManagerController {

    @Autowired
    ManagerRepository managerRepository;
    @Autowired
    private CategoryRepository categoryRepository;

    @GetMapping("/managers/{id}")
    public List<Manager> getManagerByCategory(@PathVariable("id") String idCategory){
        return managerRepository.findByCategoryId(idCategory);
    }

    @GetMapping("/manager/status")
    public UserInfo isManager(@RequestParam("id") String id)
    {
        UserInfo res = new UserInfo();
        Manager m = managerRepository.findById(id).orElse(null);
        if(m != null)
        {
            res.role = "manager";
            res.category = m.category;
        }
        else res.role = "user";

        return res;
    }

    private static class UserInfo{
        public String role;
        public String category;
    }
}
