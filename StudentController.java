
package com.Controller;

import java.io.IOException;
import java.nio.file.Path;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.FileSystemResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import java.util.Map;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PutMapping;
import com.Repository.StudentRepository;

import com.Entity.Student;
import com.Service.StudentService;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class StudentController {

    @Autowired
    private StudentService studentService;
    
    @Autowired
    StudentRepository studentrepo;

    // Student Registration
    @PostMapping("/studentregistration")
    public String registerStudent(@RequestBody Student student) {
        return studentService.registerStudent(student);
    }

    // Student Login
    @PostMapping("/studentlogin")
    public String loginStudent(@RequestBody Student student) {
        return studentService.loginStudent(
                student.getEmail(),
                student.getPassword()
        );
    }

    // Get student by ID
    @GetMapping("/student/{id}")
    public Student getstudentbyid(@PathVariable int id) {
        return studentService.getstudentbyid(id);
    }

    // Get student by email
    @GetMapping("/student/email/{email}")
    public Student getstudentbyemail(@PathVariable String email) {
        return studentService.getstudentbyemail(email);
    }

    // Count job seekers
    @GetMapping("/countofjobseekers")
    public long jobseekers() {
        return studentService.jobseekers();
    }

    // Update student profile
    @PutMapping("/updateprofile/{id}")
    public String updateStudent(
            @PathVariable int id,
            @RequestBody Student student) {
        return studentService.updatestudent(id, student);
    }

    // Upload resume
    @PostMapping("/student/{studentid}/resume")
    public ResponseEntity<String> uploadResume(
            @PathVariable int studentid,
            @RequestParam("file") MultipartFile file) throws IOException {

        String message = studentService.uploadResume(studentid, file);
        return ResponseEntity.ok(message);
    }

    // Download resume
    @GetMapping("/student/{studentid}/resume/download")
    public ResponseEntity<Resource> downloadResume(
            @PathVariable int studentid) {

        Path path = studentService.getResumePath(studentid);
        Resource resource = new FileSystemResource(path);

        return ResponseEntity.ok()
                .header(
                        HttpHeaders.CONTENT_DISPOSITION,
                        "attachment; filename=\"" + path.getFileName() + "\""
                )
                .contentType(MediaType.APPLICATION_OCTET_STREAM)
                .body(resource);
    }
    
    @PutMapping("/changepassword/{id}")
    public ResponseEntity<String> changePassword(
            @PathVariable int id,
            @RequestBody Map<String, String> request) {

        Student student = studentrepo.findById(id).orElse(null);

        if (student == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("Student not found");
        }

        String currentPassword = request.get("currentPassword");
        String newPassword = request.get("newPassword");

        if (currentPassword == null || newPassword == null
                || currentPassword.isBlank() || newPassword.isBlank()) {
            return ResponseEntity.badRequest()
                    .body("Password fields are required");
        }

        if (!student.getPassword().equals(currentPassword)) {
            return ResponseEntity.badRequest()
                    .body("Current password is incorrect");
        }

        if (newPassword.length() < 8) {
            return ResponseEntity.badRequest()
                    .body("New password must be at least 8 characters");
        }

        student.setPassword(newPassword);
        studentrepo.save(student);

        return ResponseEntity.ok("Password changed successfully");
    }
}
