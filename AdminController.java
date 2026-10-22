package com.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.Entity.Admin;
import com.Service.AdminService;

@RestController
@CrossOrigin
public class AdminController {
	
	@Autowired
	AdminService aserv;

	    // Hardcoded Admin credentials
	@PostMapping("/adminlogin")
	public String Admin(@RequestBody Admin login) {
	    return aserv.login(login);
	}

}
