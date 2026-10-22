
package com.Service;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.Entity.JobApplication;
import com.Repository.JobApplicationRepository;

@Service
public class JobApplicationService {

    @Autowired
    JobApplicationRepository jobapplicationrepo;

    public String applyjob(JobApplication application) {

        JobApplication existingApplication =
                jobapplicationrepo.findByStudentidAndJobid(
                        application.getStudentid(),
                        application.getJobid()
                );

        if (existingApplication != null) {
            return "Already applied for this job";
        }

        application.setStatus("Applied");
        application.setApplicationdate(new Date());

        JobApplication savedApplication =
                jobapplicationrepo.save(application);

        System.out.println("Saved Application ID: "
                + savedApplication.getApplicationid());

        System.out.println("Saved Application Date: "
                + savedApplication.getApplicationdate());

        return "Application submitted successfully";
    }

    // Get all applications of a particular student
    public List<JobApplication> getApplicationsByStudent(
            int studentid) {

        return jobapplicationrepo.findByStudentid(studentid);
    }
}
