package com.Repository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.Entity.Jobs;

@Repository
public interface JobsRepository extends JpaRepository<Jobs , Integer> {
	
	@Autowired
	
	@Query("SELECT COUNT(DISTINCT j.Category) FROM Jobs j")
    long countCategories();
	
	@Query("SELECT COUNT(DISTINCT j.company) FROM Jobs j")
	long countCompanies();
	
	
}
