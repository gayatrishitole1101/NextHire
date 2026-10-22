import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function SavedJob() {

    const navigate = useNavigate();

    const [savedJobs, setSavedJobs] = useState([]);
    const [loading, setLoading] = useState(true);

    // Load saved jobs
    const fetchSavedJobs = async () => {

        try {

            const loggedInStudent = localStorage.getItem("student");

            if (!loggedInStudent) {
                navigate("/studentlogin");
                return;
            }

            const student = JSON.parse(loggedInStudent);

            // Get logged-in student's database details
            const studentResponse = await axios.get(
                `http://localhost:8080/student/email/${student.email}`
            );

            const studentData = studentResponse.data;

            // Get saved jobs for this student
            const savedResponse = await axios.get(
                `http://localhost:8080/savedjob/student/${studentData.studentid}`
            );

            // Fetch actual job details for each saved job
            const jobResponses = await Promise.all(
                savedResponse.data.map(async (savedJob) => {

                    const jobResponse = await axios.get(
                        `http://localhost:8080/findbyid/${savedJob.jobid}`
                    );

                    return {
                        ...jobResponse.data,
                        savedjobid: savedJob.savedjobid
                    };

                })
            );

            setSavedJobs(jobResponses);

        } catch (error) {

            console.log("Error loading saved jobs:", error);
            alert("Unable to load saved jobs.");

        } finally {

            setLoading(false);

        }
    };


    useEffect(() => {
        fetchSavedJobs();
    }, []);


    // Unsave job
    const handleUnsave = async (job) => {

        try {

            const loggedInStudent = JSON.parse(
                localStorage.getItem("student")
            );

            const studentResponse = await axios.get(
                `http://localhost:8080/student/email/${loggedInStudent.email}`
            );

            const studentId = studentResponse.data.studentid;

            await axios.delete(
                `http://localhost:8080/savedjob/unsave/${studentId}/${job.jobid}`
            );

            setSavedJobs((previousJobs) =>
                previousJobs.filter(
                    (savedJob) => savedJob.jobid !== job.jobid
                )
            );

            alert("Job removed from saved jobs.");

        } catch (error) {

            console.log(error);
            alert("Unable to remove saved job.");

        }
    };


    return (

        <div className="bg-light min-vh-100">

            {/* Header */}

            <div className="bg-primary text-white py-5">

                <div className="container">

                    <h2 className="fw-bold">
                        Saved Jobs
                    </h2>

                    <p className="mb-0">
                        Keep track of the jobs you are interested in.
                    </p>

                </div>

            </div>


            {/* Main Content */}

            <div className="container py-5">

                <div className="d-flex justify-content-between align-items-center mb-4">

                    <div>
                        <h3 className="fw-bold mb-1">
                            My Saved Jobs
                        </h3>

                        <p className="text-muted mb-0">
                            {savedJobs.length} jobs saved
                        </p>
                    </div>

                    <Link
                        to="/jobs"
                        className="btn btn-primary"
                    >
                        Find More Jobs
                    </Link>

                </div>


                {/* Loading */}

                {loading && (

                    <div className="text-center py-5">

                        <div
                            className="spinner-border text-primary"
                            role="status"
                        ></div>

                        <p className="mt-3 text-muted">
                            Loading saved jobs...
                        </p>

                    </div>

                )}


                {/* Empty State */}

                {!loading && savedJobs.length === 0 && (

                    <div className="card border-0 shadow-sm text-center py-5">

                        <div className="card-body">

                            <div className="display-3 mb-3">
                                ☆
                            </div>

                            <h4 className="fw-bold">
                                No Saved Jobs Yet
                            </h4>

                            <p className="text-muted">
                                Save jobs that interest you and find them here.
                            </p>

                            <Link
                                to="/jobs"
                                className="btn btn-primary mt-2"
                            >
                                Explore Jobs
                            </Link>

                        </div>

                    </div>

                )}


                {/* Saved Jobs List */}

                {!loading && savedJobs.length > 0 && (

                    <div className="row g-4">

                        {savedJobs.map((job) => (

                            <div
                                className="col-lg-6"
                                key={job.jobid}
                            >

                                <div className="card border-0 shadow-sm h-100">

                                    <div className="card-body p-4">

                                        <div className="d-flex justify-content-between align-items-start">

                                            <div>

                                                <h4 className="fw-bold mb-1">
                                                    {job.jobrole}
                                                </h4>

                                                <p className="text-primary fw-semibold mb-2">
                                                    {job.company}
                                                </p>

                                            </div>

                                            <span className="badge bg-warning text-dark">
                                                ★ Saved
                                            </span>

                                        </div>


                                        <p className="text-muted">
                                            {job.jobdescription}
                                        </p>


                                        <div className="row text-muted small mb-3">

                                            <div className="col-6 mb-2">
                                                📍 {job.location || "Not specified"}
                                            </div>

                                            <div className="col-6 mb-2">
                                                💼 {job.experience || "Not specified"}
                                            </div>

                                            <div className="col-6 mb-2">
                                                💰 ₹ {job.salary}
                                            </div>

                                            <div className="col-6 mb-2">
                                                🏷️ {job.jobtype || "Not specified"}
                                            </div>

                                        </div>


                                        <div className="mb-3">

                                            <strong>Skills:</strong>

                                            <p className="text-muted mb-0 mt-1">
                                                {job.skills || "Not specified"}
                                            </p>

                                        </div>


                                        <div className="d-flex gap-2">

                                            <Link
                                                to={`/jobs/${job.jobid}`}
                                                className="btn btn-primary flex-grow-1"
                                            >
                                                View Job
                                            </Link>

                                            <button
                                                className="btn btn-outline-danger"
                                                onClick={() => handleUnsave(job)}
                                            >
                                                ★ Unsave
                                            </button>

                                        </div>

                                    </div>

                                </div>

                            </div>

                        ))}

                    </div>

                )}


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

export default SavedJob;