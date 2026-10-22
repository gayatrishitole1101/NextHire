package com.Service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.Entity.Jobs;
import com.Repository.JobsRepository;


@Service
public class JobsService {
	
	@Autowired
	
	JobsRepository jrepo;
	
	//save job
	public String save(Jobs job) {
		 jrepo.save(job);
		return "job added successfully";
	}
	
	//save all
	public String saveall(List<Jobs> job) {
		jrepo.saveAll(job);
		return"Added all jobs successfully";
	}
	
	//findall
	public List<Jobs> findall() {
		return jrepo.findAll();
		
	}
	
	//find by id
	public Jobs findbyid(int jobid){
		return jrepo.findById(jobid).orElse(null);
	}
	
	// update by id
	public String updatebyid(int jobid, Jobs updatejob) {

	    return jrepo.findById(jobid).map(jobs -> {

	        jobs.setJobrole(updatejob.getJobrole());
	        jobs.setJobdescription(updatejob.getJobdescription());
	        jobs.setSalary(updatejob.getSalary());
	        jobs.setExperience(updatejob.getExperience());
	        jobs.setLocation(updatejob.getLocation());
	        jobs.setCompany(updatejob.getCompany());
	        jobs.setSkills(updatejob.getSkills());
	        jobs.setJobtype(updatejob.getJobtype());
	        jobs.setPosteddate(updatejob.getPosteddate());
	       

	        jrepo.save(jobs);

	        return "Job updated successfully!";

	    }).orElse("Job with ID " + jobid + " not found.");
	}
				

 
	public String deletejob(int jobid) {
		return jrepo.findById(jobid).map(jobs -> {
			jrepo.delete(jobs);
			return "Job deleted successfully !";
		}).orElse("Job with id " + jobid + " not found");
	}
	
	public long countjob() {
		return jrepo.count();
	}
	
	public long countCategories() {
	    return jrepo.countCategories();
	}
	
	public long countCompanies() {
		return jrepo.countCompanies();
	}
	
	
	
	
}
