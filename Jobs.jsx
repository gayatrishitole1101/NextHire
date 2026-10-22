import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useSearchParams } from "react-router-dom";

function Jobs() {

    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);

    const [savedJobs, setSavedJobs] = useState([]);
    const [appliedJobs, setAppliedJobs] = useState([]);

    // ================= CATEGORY =================

    const [searchParams] = useSearchParams();

    const category = searchParams.get("category");

    // ================= GET ALL JOBS =================

    useEffect(() => {

        axios.get("http://localhost:8080/findalljobs")
            .then((response) => {
                setJobs(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
            });

    }, []);


    // ================= FILTER CATEGORY =================

    const filteredJobs = category
        ? jobs.filter(
            (job) =>
                job.category?.toLowerCase() ===
                category.toLowerCase()
        )
        : jobs;


    // ================= SAVE / UNSAVE JOB =================

    const handleSaveJob = async (job) => {

        const loggedInStudent = localStorage.getItem("student");

        if (!loggedInStudent) {
            alert("Please login as a student to save jobs.");
            return;
        }

        try {

            const student = JSON.parse(loggedInStudent);

            // Get student details
            const studentResponse = await axios.get(
                `http://localhost:8080/student/email/${student.email}`
            );

            const studentData = studentResponse.data;

            // If already saved → Unsave
            if (savedJobs.includes(job.jobid)) {

                await axios.delete(
                    `http://localhost:8080/savedjob/unsave/${studentData.studentid}/${job.jobid}`
                );

                setSavedJobs(
                    savedJobs.filter(
                        (id) => id !== job.jobid
                    )
                );

                alert("Job removed from saved jobs.");

            } else {

                // Save Job
                await axios.post(
                    "http://localhost:8080/savedjob",
                    {
                        studentid: studentData.studentid,
                        jobid: job.jobid
                    }
                );

                setSavedJobs([
                    ...savedJobs,
                    job.jobid
                ]);

                alert("Job saved successfully!");

            }

        } catch (error) {

            console.log(error);

            alert("Unable to save/unsave job.");

        }
    };


    // ================= APPLY JOB =================

    const handleApplyJob = async (job) => {

        const loggedInStudent = localStorage.getItem("student");

        if (!loggedInStudent) {
            alert("Please login as a student to apply for jobs.");
            return;
        }

        try {

            const student = JSON.parse(loggedInStudent);

            // Get logged-in student from DB
            const studentResponse = await axios.get(
                `http://localhost:8080/student/email/${student.email}`
            );

            const studentData = studentResponse.data;

            await axios.post(
                "http://localhost:8080/applyjob",
                {
                    studentid: studentData.studentid,
                    jobid: job.jobid
                }
            );

            setAppliedJobs([
                ...appliedJobs,
                job.jobid
            ]);

            alert("Application submitted successfully!");

        } catch (error) {

            console.log(error);

            alert("Unable to apply for this job.");

        }
    };


    return (
        <div className="bg-light min-vh-100">

            {/* ================= HEADER ================= */}

            <div className="bg-primary text-white py-5">

                <div className="container">

                    <h1 className="fw-bold">
                        Find Your Dream Job
                    </h1>

                    <p className="mb-0">
                        Explore the latest job opportunities and take the
                        next step in your career.
                    </p>

                </div>

            </div>


            {/* ================= JOBS SECTION ================= */}

            <div className="container py-5">

                <div className="d-flex justify-content-between align-items-center mb-4">

                    <div>

                        <h2 className="fw-bold mb-1">
                            {category
                                ? `${category} Jobs`
                                : "Latest Jobs"}
                        </h2>

                        <p className="text-muted mb-0">
                            Find opportunities that match your skills.
                        </p>

                    </div>

                    <span className="badge bg-primary fs-6">
                        {filteredJobs.length} Jobs
                    </span>

                </div>


                {/* ================= LOADING ================= */}

                {loading && (

                    <div className="text-center py-5">

                        <div
                            className="spinner-border text-primary"
                            role="status"
                        ></div>

                        <p className="mt-3 text-muted">
                            Loading jobs...
                        </p>

                    </div>

                )}


                {/* ================= NO JOBS ================= */}

                {!loading && filteredJobs.length === 0 && (

                    <div className="text-center py-5">

                        <h4>
                            No jobs available
                        </h4>

                        <p className="text-muted">
                            No jobs found in this category.
                        </p>

                    </div>

                )}


                {/* ================= JOBS ================= */}

                {!loading && filteredJobs.length > 0 && (

                    <div className="row g-4">

                        {filteredJobs.map((job) => (

                            <div
                                className="col-lg-6"
                                key={job.jobid}
                            >

                                <div className="card border-0 shadow-sm h-100">

                                    <div className="card-body p-4">

                                        {/* Job Header */}

                                        <div className="d-flex justify-content-between">

                                            <div>

                                                <h4 className="fw-bold mb-1">
                                                    {job.jobrole}
                                                </h4>

                                                <p className="text-primary fw-semibold mb-2">
                                                    {job.company}
                                                </p>

                                            </div>

                                            <span className="badge bg-light text-primary border h-25">
                                                {job.jobtype}
                                            </span>

                                        </div>


                                        {/* Description */}

                                        <p className="text-muted">
                                            {job.jobdescription}
                                        </p>


                                        {/* Job Information */}

                                        <div className="row text-muted small mb-3">

                                            <div className="col-md-6 mb-2">
                                                📍 {job.location}
                                            </div>

                                            <div className="col-md-6 mb-2">
                                                💼 {job.experience}
                                            </div>

                                            <div className="col-md-6">
                                                💰 ₹ {job.salary}
                                            </div>

                                            <div className="col-md-6">
                                                📅 {job.posteddate}
                                            </div>

                                        </div>


                                        {/* Skills */}

                                        <div className="mb-3">

                                            <strong>
                                                Skills:
                                            </strong>

                                            <div className="mt-2">
                                                {job.skills}
                                            </div>

                                        </div>


                                        {/* Buttons */}

                                        <div className="d-flex gap-2">

                                            {/* Apply */}

                                            <button
                                                className={`btn ${
                                                    appliedJobs.includes(job.jobid)
                                                        ? "btn-success"
                                                        : "btn-primary"
                                                } flex-grow-1`}
                                                onClick={() =>
                                                    handleApplyJob(job)
                                                }
                                                disabled={appliedJobs.includes(
                                                    job.jobid
                                                )}
                                            >

                                                {appliedJobs.includes(job.jobid)
                                                    ? "✓ Applied"
                                                    : "Apply Now"}

                                            </button>


                                            {/* Save / Unsave */}

                                            <button
                                                className={`btn ${
                                                    savedJobs.includes(job.jobid)
                                                        ? "btn-warning"
                                                        : "btn-outline-warning"
                                                }`}
                                                onClick={() =>
                                                    handleSaveJob(job)
                                                }
                                                title={
                                                    savedJobs.includes(job.jobid)
                                                        ? "Unsave Job"
                                                        : "Save Job"
                                                }
                                            >

                                                {savedJobs.includes(job.jobid)
                                                    ? "★"
                                                    : "☆"}

                                            </button>


                                            {/* View */}

                                            <Link
                                                to={`/jobs/${job.jobid}`}
                                                className="btn btn-outline-primary"
                                            >
                                                View
                                            </Link>

                                        </div>

                                    </div>

                                </div>

                            </div>

                        ))}

                    </div>

                )}

            </div>

        </div>
    );
}

export default Jobs;