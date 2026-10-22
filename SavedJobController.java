package com.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.Entity.SavedJob;
import com.Service.SavedJobService;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class SavedJobController {
	@Autowired
	
	SavedJobService savedjobserv;
	
	// Save Job
	@PostMapping("/savedjob")
	public String saveJob(@RequestBody SavedJob savedJob) {

	    return savedjobserv.saveJob(savedJob);
	}


	// Unsave Job
	@DeleteMapping("/savedjob/unsave/{studentid}/{jobid}")
	public String unsavedjob(
	        @PathVariable int studentid,
	        @PathVariable int jobid) {

	    return savedjobserv.unsavedjob(studentid, jobid);
	}
	
	//count
	@GetMapping("/savedjobs")
	public long countsavedjob() {
		return savedjobserv.countsavedjob();
	}
	
	// Get saved jobs for a student
	@GetMapping("/savedjob/student/{studentid}")
	public List<SavedJob> getSavedJobs(
	        @PathVariable int studentid) {

	    return savedjobserv.getSavedJobs(studentid);
	}
}
