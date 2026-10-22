
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function StudentRegistration() {

    const navigate = useNavigate();

    const [student, setStudent] = useState({
        name: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
        skills: "",
        education: "",
        experience: "",
        resumeName: ""
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        setStudent({
            ...student,
            [e.target.name]: e.target.value
        });

        setErrors({
            ...errors,
            [e.target.name]: ""
        });
    };

    const validateForm = () => {

        let newErrors = {};

        // Name validation
        if (!student.name.trim()) {
            newErrors.name = "Name is required";
        } else if (student.name.trim().length < 3) {
            newErrors.name = "Name must contain at least 3 characters";
        } else if (!/^[A-Za-z ]+$/.test(student.name)) {
            newErrors.name = "Name should contain only letters";
        }

        // Email validation
        if (!student.email.trim()) {
            newErrors.email = "Email is required";
        } else if (
            !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(student.email)
        ) {
            newErrors.email = "Enter a valid email address";
        }

        // Phone validation
        if (!student.phone.trim()) {
            newErrors.phone = "Phone number is required";
        } else if (!/^[6-9]\d{9}$/.test(student.phone)) {
            newErrors.phone =
                "Enter a valid 10-digit Indian mobile number";
        }

        // Password validation
        if (!student.password) {
            newErrors.password = "Password is required";
        } else if (student.password.length < 4) {
            newErrors.password =
                "Password must contain at least 4 characters";
        } else if (!/(?=.*[A-Za-z])(?=.*\d)/.test(student.password)) {
            newErrors.password =
                "Password must contain at least one letter and one number";
        }

        // Confirm password validation
        if (!student.confirmPassword) {
            newErrors.confirmPassword =
                "Please confirm your password";
        } else if (
            student.password !== student.confirmPassword
        ) {
            newErrors.confirmPassword =
                "Passwords do not match";
        }

        // Skills validation
        if (!student.skills.trim()) {
            newErrors.skills = "Skills are required";
        }

        // Education validation
        if (!student.education.trim()) {
            newErrors.education = "Education is required";
        }

        // Experience validation
        if (!student.experience.trim()) {
            newErrors.experience = "Experience is required";
        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    const handleRegister = async (e) => {

        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        try {

            const response = await axios.post(
                "http://localhost:8080/studentregistration",
                {
                    studentname: student.name,
                    email: student.email,
                    phone: student.phone,
                    password: student.password,
                    skills: student.skills,
                    education: student.education,
                    experience: student.experience,
                    resumeName: student.resumeName
                }
            );

            if (response.data === "Registration successful") {

                alert("Registration Successful!");

                navigate("/studentlogin");

            } else {

                alert(response.data);

            }

        } catch (error) {

            console.log(error);

            alert("Registration failed. Please try again.");

        }
    };

    return (
        <div className="container mt-5 mb-5">

            <div className="row justify-content-center">

                <div className="col-md-6">

                    <div className="card shadow p-4">

                        <h2 className="text-center mb-4">
                            Student Registration
                        </h2>

                        <form onSubmit={handleRegister}>

                            {/* Name */}
                            <div className="mb-3">

                                <label className="form-label">
                                    Full Name
                                </label>

                                <input
                                    type="text"
                                    name="name"
                                    className={`form-control ${
                                        errors.name
                                            ? "is-invalid"
                                            : ""
                                    }`}
                                    placeholder="Enter your full name"
                                    value={student.name}
                                    onChange={handleChange}
                                />

                                {errors.name && (
                                    <div className="invalid-feedback">
                                        {errors.name}
                                    </div>
                                )}

                            </div>

                            {/* Email */}
                            <div className="mb-3">

                                <label className="form-label">
                                    Email
                                </label>

                                <input
                                    type="email"
                                    name="email"
                                    className={`form-control ${
                                        errors.email
                                            ? "is-invalid"
                                            : ""
                                    }`}
                                    placeholder="Enter your email"
                                    value={student.email}
                                    onChange={handleChange}
                                />

                                {errors.email && (
                                    <div className="invalid-feedback">
                                        {errors.email}
                                    </div>
                                )}

                            </div>

                            {/* Phone */}
                            <div className="mb-3">

                                <label className="form-label">
                                    Phone Number
                                </label>

                                <input
                                    type="tel"
                                    name="phone"
                                    className={`form-control ${
                                        errors.phone
                                            ? "is-invalid"
                                            : ""
                                    }`}
                                    placeholder="Enter 10-digit mobile number"
                                    value={student.phone}
                                    onChange={handleChange}
                                    maxLength="10"
                                />

                                {errors.phone && (
                                    <div className="invalid-feedback">
                                        {errors.phone}
                                    </div>
                                )}

                            </div>

                            {/* Education */}
                            <div className="mb-3">

                                <label className="form-label">
                                    Education
                                </label>

                                <input
                                    type="text"
                                    name="education"
                                    className={`form-control ${
                                        errors.education
                                            ? "is-invalid"
                                            : ""
                                    }`}
                                    placeholder="e.g. BCA, MCA, B.Tech"
                                    value={student.education}
                                    onChange={handleChange}
                                />

                                {errors.education && (
                                    <div className="invalid-feedback">
                                        {errors.education}
                                    </div>
                                )}

                            </div>

                            {/* Skills */}
                            <div className="mb-3">

                                <label className="form-label">
                                    Skills
                                </label>

                                <input
                                    type="text"
                                    name="skills"
                                    className={`form-control ${
                                        errors.skills
                                            ? "is-invalid"
                                            : ""
                                    }`}
                                    placeholder="e.g. Java, React, SQL"
                                    value={student.skills}
                                    onChange={handleChange}
                                />

                                {errors.skills && (
                                    <div className="invalid-feedback">
                                        {errors.skills}
                                    </div>
                                )}

                            </div>

                            {/* Experience */}
                            <div className="mb-3">

                                <label className="form-label">
                                    Experience
                                </label>

                                <input
                                    type="text"
                                    name="experience"
                                    className={`form-control ${
                                        errors.experience
                                            ? "is-invalid"
                                            : ""
                                    }`}
                                    placeholder="e.g. Fresher, 1 Year, 2 Years"
                                    value={student.experience}
                                    onChange={handleChange}
                                />

                                {errors.experience && (
                                    <div className="invalid-feedback">
                                        {errors.experience}
                                    </div>
                                )}

                            </div>

                            {/* Resume Name */}
                            <div className="mb-3">

                                <label className="form-label">
                                    Resume Name
                                </label>

                                <input
                                    type="text"
                                    name="resumeName"
                                    className="form-control"
                                    placeholder="e.g. Gayatri_Resume.pdf"
                                    value={student.resumeName}
                                    onChange={handleChange}
                                />

                            </div>

                            {/* Password */}
                            <div className="mb-3">

                                <label className="form-label">
                                    Password
                                </label>

                                <input
                                    type="password"
                                    name="password"
                                    className={`form-control ${
                                        errors.password
                                            ? "is-invalid"
                                            : ""
                                    }`}
                                    placeholder="Create password"
                                    value={student.password}
                                    onChange={handleChange}
                                />

                                {errors.password && (
                                    <div className="invalid-feedback">
                                        {errors.password}
                                    </div>
                                )}

                            </div>

                            {/* Confirm Password */}
                            <div className="mb-3">

                                <label className="form-label">
                                    Confirm Password
                                </label>

                                <input
                                    type="password"
                                    name="confirmPassword"
                                    className={`form-control ${
                                        errors.confirmPassword
                                            ? "is-invalid"
                                            : ""
                                    }`}
                                    placeholder="Confirm password"
                                    value={student.confirmPassword}
                                    onChange={handleChange}
                                />

                                {errors.confirmPassword && (
                                    <div className="invalid-feedback">
                                        {errors.confirmPassword}
                                    </div>
                                )}

                            </div>

                            <button
                                type="submit"
                                className="btn btn-primary w-100"
                            >
                                Register
                            </button>

                        </form>

                        <p className="text-center mt-3">

                            Already have an account?{" "}

                            <Link to="/studentlogin">
                                Login
                            </Link>

                        </p>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default StudentRegistration;
