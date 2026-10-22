package com.Service;
import org.springframework.stereotype.Service;

import com.Entity.Admin;

@Service
public class AdminService {

    private final String ADMIN_USERNAME = "gayatri";
    private final String ADMIN_PASSWORD = "gayatri123";

    public String login(Admin login) {

        if (ADMIN_USERNAME.equals(login.getUsername())
                && ADMIN_PASSWORD.equals(login.getPassword())) {

            return "success";
        }

        return "invalid";
    }
}