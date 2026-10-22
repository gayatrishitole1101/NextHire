package com.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.Entity.JobApplication;
import com.Service.JobApplicationService;

@RestController
@CrossOrigin
public class JobApplicationController {
	
	@Autowired
	JobApplicationService jobapplicationserv;
	
	@PostMapping("/applyjob")
	public String applyjob(@RequestBody JobApplication application) {
		return jobapplicationserv.applyjob(application);
	}
	
	 // Get all applications of a student
    @GetMapping("/application/student/{studentid}")
    public List<JobApplication> getApplicationsByStudent(
            @PathVariable int studentid) {

        return jobapplicationserv.getApplicationsByStudent(
                studentid);
    }
}
