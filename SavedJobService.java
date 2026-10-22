package com.Service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.Entity.SavedJob;
import com.Repository.SavedJobRepository;


@Service
public class SavedJobService {
	@Autowired
	
	SavedJobRepository savedjobrepo;
	
	// Save Job
	public String saveJob(SavedJob savedJob) {

	    SavedJob existing =
	            savedjobrepo.findByStudentidAndJobid(
	                    savedJob.getStudentid(),
	                    savedJob.getJobid()
	            );

	    if (existing != null) {
	        return "Job already saved";
	    }

	    savedjobrepo.save(savedJob);

	    return "Job saved successfully";
	}


	// Unsave Job
	public String unsavedjob(int studentid, int jobid) {

	    SavedJob existing =
	            savedjobrepo.findByStudentidAndJobid(
	                    studentid,
	                    jobid
	            );

	    if (existing == null) {
	        return "Job is not saved";
	    }

	    savedjobrepo.delete(existing);

	    return "Job unsaved successfully";
	}
	
	//count of saved job
	public long countsavedjob(){
		return savedjobrepo.count();
	}
	
	public List<SavedJob> getSavedJobs(int studentid) {
	    return savedjobrepo.findByStudentid(studentid);
	}
}
