package com.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.Entity.Admin;

@Repository
public interface AdminRepository extends JpaRepository<Admin , Integer>{

	

}
