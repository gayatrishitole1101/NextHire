package com.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.Entity.SavedJob;



@Repository
public interface SavedJobRepository  extends JpaRepository<SavedJob,Integer>{
	SavedJob findByStudentidAndJobid(int studentid, int jobid);

	List<SavedJob> findByStudentid(int studentid);
}
