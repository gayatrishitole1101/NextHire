import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function MyProfile() {

    const navigate = useNavigate();

    const [student, setStudent] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const loggedInStudent = localStorage.getItem("student");

        if (!loggedInStudent) {
            navigate("/studentlogin");
            return;
        }

        const studentData = JSON.parse(loggedInStudent);

        axios.get(
            `http://localhost:8080/student/email/${studentData.email}`
        )
        .then((response) => {
            setStudent(response.data);
            setLoading(false);
        })
        .catch((error) => {
            console.log(error);
            setLoading(false);
        });

    }, [navigate]);


    if (loading) {
        return (
            <div className="container text-center mt-5">
                <div
                    className="spinner-border text-primary"
                    role="status"
                ></div>

                <p className="mt-3">
                    Loading profile...
                </p>
            </div>
        );
    }


    if (!student) {
        return (
            <div className="container text-center mt-5">

                <h4>
                    Unable to load profile
                </h4>

                <Link
                    to="/studentdashboard"
                    className="btn btn-primary mt-3"
                >
                    Back to Dashboard
                </Link>

            </div>
        );
    }


    const firstLetter = student.studentname
        ? student.studentname.charAt(0).toUpperCase()
        : "U";


    return (

        <div className="bg-light min-vh-100">

            {/* Header */}

            <div className="bg-primary text-white py-4">

                <div className="container">

                    <h2 className="fw-bold mb-1">
                        My Profile
                    </h2>

                    <p className="mb-0">
                        Manage and view your personal information
                    </p>

                </div>

            </div>


            {/* Profile */}

            <div className="container py-5">

                <div className="row g-4">

                    {/* Left Profile Card */}

                    <div className="col-md-4">

                        <div className="card border-0 shadow-sm text-center">

                            <div className="card-body p-4">

                                <div
                                    className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center mx-auto mb-3"
                                    style={{
                                        width: "100px",
                                        height: "100px",
                                        fontSize: "40px"
                                    }}
                                >
                                    {firstLetter}
                                </div>

                                <h4 className="fw-bold">
                                    {student.studentname}
                                </h4>

                                <p className="text-muted mb-1">
                                    Job Seeker
                                </p>

                                <p className="text-muted">
                                    {student.email}
                                </p>

                                <Link
                                    to={`/updateprofile/${student.studentid}`}
                                    className="btn btn-primary w-100 mt-2"
                                >
                                    Edit Profile
                                </Link>

                            </div>

                        </div>

                    </div>


                    {/* Right Information */}

                    <div className="col-md-8">

                        <div className="card border-0 shadow-sm">

                            <div className="card-body p-4">

                                <h4 className="fw-bold mb-4">
                                    Personal Information
                                </h4>


                                <div className="row">

                                    <div className="col-md-6 mb-4">

                                        <label className="text-muted small">
                                            Full Name
                                        </label>

                                        <h6 className="mt-1">
                                            {student.studentname || "Not provided"}
                                        </h6>

                                    </div>


                                    <div className="col-md-6 mb-4">

                                        <label className="text-muted small">
                                            Email
                                        </label>

                                        <h6 className="mt-1">
                                            {student.email || "Not provided"}
                                        </h6>

                                    </div>


                                    <div className="col-md-6 mb-4">

                                        <label className="text-muted small">
                                            Phone Number
                                        </label>

                                        <h6 className="mt-1">
                                            {student.phone || "Not provided"}
                                        </h6>

                                    </div>


                                    <div className="col-md-6 mb-4">

                                        <label className="text-muted small">
                                            Education
                                        </label>

                                        <h6 className="mt-1">
                                            {student.education || "Not provided"}
                                        </h6>

                                    </div>


                                    <div className="col-12 mb-4">

                                        <label className="text-muted small">
                                            Skills
                                        </label>

                                        <h6 className="mt-1">
                                            {student.skills || "Not provided"}
                                        </h6>

                                    </div>


                                    <div className="col-12 mb-4">

                                        <label className="text-muted small">
                                            Experience
                                        </label>

                                        <h6 className="mt-1">
                                            {student.experience || "Fresher"}
                                        </h6>

                                    </div>


                                    <div className="col-12">

                                        <label className="text-muted small">
                                            Resume
                                        </label>

                                        <h6 className="mt-1">

                                            {student.resumeName
                                                ? student.resumeName
                                                : "No resume uploaded"}

                                        </h6>

                                    </div>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>


                {/* Back Button */}

                <div className="mt-4">

                    <Link
                        to="/studentdashboard"
                        className="btn btn-outline-primary"
                    >
                        ← Back to Dashboard
                    </Link>

                </div>

            </div>

        </div>

    );
}

export default MyProfile;