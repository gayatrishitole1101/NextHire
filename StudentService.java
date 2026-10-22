package com.Service;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.Entity.Student;
import com.Repository.StudentRepository;

@Service
public class StudentService {

    @Autowired
    private StudentRepository studentRepository;


    // Registration
    public String registerStudent(Student student) {

        Student existingStudent =
                studentRepository.findByEmail(student.getEmail());

        if (existingStudent != null) {
            return "Email already registered";
        }

        studentRepository.save(student);

        return "Registration successful";
    }
    


    // Login
    public String loginStudent(String email, String password) {

        Student student =
                studentRepository.findByEmail(email);

        if (student == null) {
            return "Invalid Email or Password";
        }

        if (!student.getPassword().equals(password)) {
            return "Invalid Email or Password";
        }

        return "success";
    }
    
    //find by id
    public Student getstudentbyid(int id) {
    	return studentRepository.findById(id).orElse(null);
    }
    
    //find by email
    public Student getstudentbyemail(String email) {
    	return studentRepository.findByEmail(email);
    }
    
    //count 
    public long jobseekers() {
    	return studentRepository.count();
    }

    //update student 
    public String updatestudent(int id, Student updatestudent) {
    	Student student = studentRepository.findById(id).orElse(null);
    	if(student == null) {
    		return "Student is not found";
    }
    student.setStudentname(updatestudent.getStudentname());
    student.setEmail(updatestudent.getEmail());
    student.setPhone(updatestudent.getPhone());
    student.setSkills(updatestudent.getSkills());
    student.setEducation(updatestudent.getEducation());
    student.setExperience(updatestudent.getExperience());
    student.setResume(updatestudent.getResume());
    
    studentRepository.save(student);
    
    return "Student updated successfully";
    }
    
    private final Path uploadDir =
            Paths.get("uploads", "resumes").toAbsolutePath().normalize();

    public String uploadResume(int studentid, MultipartFile file)
            throws IOException {

        Student student = studentRepository.findById(studentid)
                .orElseThrow(() -> new RuntimeException("Student not found"));

        if (file == null || file.isEmpty()) {
            throw new RuntimeException("Please select a resume file");
        }

        String originalName = file.getOriginalFilename();

        if (originalName == null || !originalName.contains(".")) {
            throw new RuntimeException("Invalid file name");
        }

        String extension = originalName.substring(
                originalName.lastIndexOf(".")).toLowerCase();

        if (!extension.equals(".pdf")
                && !extension.equals(".doc")
                && !extension.equals(".docx")) {
            throw new RuntimeException(
                    "Only PDF, DOC and DOCX files are allowed");
        }

        
        //resume file upload
        Files.createDirectories(uploadDir);

        String savedFileName = UUID.randomUUID().toString() + extension;

        Path targetPath = uploadDir.resolve(savedFileName).normalize();

        if (!targetPath.startsWith(uploadDir)) {
            throw new RuntimeException("Invalid file path");
        }

        file.transferTo(targetPath);

        student.setResume(savedFileName);
        studentRepository.save(student);

        return "Resume uploaded successfully";
    }

    public Path getResumePath(int studentid) {

        Student student = studentRepository.findById(studentid)
                .orElseThrow(() -> new RuntimeException("Student not found"));

        if (student.getResume() == null || student.getResume().isBlank()) {
            throw new RuntimeException("No resume uploaded");
        }

        Path path = uploadDir.resolve(student.getResume()).normalize();

        if (!path.startsWith(uploadDir) || !Files.exists(path)) {
            throw new RuntimeException("Resume file not found");
        }

        return path;
    }
    
    
 // Change Password
    public String changePassword(
            int studentId,
            String currentPassword,
            String newPassword) {

        Student student = studentRepository
                .findById(studentId)
                .orElse(null);

        if (student == null) {
            return "Student not found";
        }

        if (currentPassword == null || currentPassword.isBlank()
                || newPassword == null || newPassword.isBlank()) {
            return "Password fields are required";
        }

        if (!student.getPassword().equals(currentPassword)) {
            return "Current password is incorrect";
        }

        if (newPassword.length() < 8) {
            return "New password must be at least 8 characters";
        }

        if (newPassword.equals(currentPassword)) {
            return "New password must be different from current password";
        }

        student.setPassword(newPassword);
        studentRepository.save(student);

        return "Password changed successfully";
    }
}