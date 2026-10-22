package com.Entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class SavedJob {

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	
	int savedjobid;
	int studentid;
	int jobid;
	
	public SavedJob() {
		super();
	}

	public int getSavedjobid() {
		return savedjobid;
	}

	public void setSavedjobid(int savedjobid) {
		this.savedjobid = savedjobid;
	}

	public int getStudentid() {
		return studentid;
	}

	public void setStudentid(int studentid) {
		this.studentid = studentid;
	}

	public int getJobid() {
		return jobid;
	}

	public void setJobid(int jobid) {
		this.jobid = jobid;
	}
	
	
}
