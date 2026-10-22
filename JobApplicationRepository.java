package com.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.Entity.JobApplication;

@Repository
public interface JobApplicationRepository extends JpaRepository<JobApplication, Integer> {
	
	// Get all applications of a particular student
    List<JobApplication> findByStudentid(int studentid);
	JobApplication findByStudentidAndJobid(int studentid, int jobid);
	
}
