package com.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.Entity.Jobs;
import com.Service.JobsService;

@RestController
@CrossOrigin
public class JobsController {
	
	@Autowired
	
	JobsService jserv;
	
	@PostMapping("/savejob")
	public String save(@RequestBody Jobs job) {
		return jserv.save(job);
		
	}
	
	@PostMapping("/savealljobs")
	public String saveAll(@RequestBody List<Jobs> job) {
		return jserv.saveall(job);
	}
	
	@GetMapping("/findalljobs")
	public List<Jobs> findall() {
		return jserv.findall();
	}
	
	@GetMapping("/findbyid/{jobid}")
	public Jobs findbyid(@PathVariable int jobid) {
		return jserv.findbyid(jobid);
	}
	
	@PutMapping("/update/{jobid}")
	public String updatebyid(@PathVariable int jobid, @RequestBody Jobs updatejob) {
		return jserv.updatebyid(jobid, updatejob);
	}
	
	@DeleteMapping("/deletejob/{jobid}")
	public String deletebyid(@PathVariable int jobid, @RequestBody Jobs deletejob) {
		return jserv.deletejob(jobid);
	}
	
	@GetMapping("/countofjob")
	public long countjob() {
		return jserv.countjob();
	}
	
	@GetMapping("/countofcategory")
	public long countCategories() {
	    return jserv.countCategories();
	}
	
	@GetMapping("/countofcompany")
	public long countCompanies() {
	    return jserv.countCompanies();
	}
	
	

}
