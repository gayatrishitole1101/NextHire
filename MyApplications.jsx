import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function MyApplications() {
    const navigate = useNavigate();

    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState("All");

    useEffect(() => {
        const fetchApplications = async () => {
            try {
                const loggedInStudent = localStorage.getItem("student");

                if (!loggedInStudent) {
                    navigate("/studentlogin");
                    return;
                }

                const student = JSON.parse(loggedInStudent);

                // Get logged-in student's database details
                const studentResponse = await axios.get(
                    `http://localhost:8080/student/email/${encodeURIComponent(student.email)}`
                );

                const studentId = studentResponse.data.studentid;

                // Get this student's applications
                const response = await axios.get(
                    `http://localhost:8080/application/student/${studentId}`
                );

                // Fetch job details for every application
                const results = await Promise.all(
                    response.data.map(async (application) => {
                        try {
                            const jobResponse = await axios.get(
                                `http://localhost:8080/findbyid/${application.jobid}`
                            );

                            return {
                                ...application,
                                job: jobResponse.data
                            };
                        } catch (error) {
                            console.error(
                                `Unable to load job ${application.jobid}:`,
                                error
                            );

                            return {
                                ...application,
                                job: {
                                    jobrole: "Job details unavailable",
                                    company: "Company unavailable",
                                    location: "",
                                    jobtype: "",
                                    jobid: application.jobid
                                }
                            };
                        }
                    })
                );

                setApplications(results);
            } catch (error) {
                console.error("Error loading applications:", error);
                alert(
                    "Unable to load applications. Please check the backend API."
                );
            } finally {
                setLoading(false);
            }
        };

        fetchApplications();
    }, [navigate]);

    const statusOf = (application) =>
        application.status || application.applicationStatus || "Applied";

    const statusClass = (status) => {
        switch ((status || "").toLowerCase()) {
            case "selected":
                return "bg-success";
            case "shortlisted":
                return "bg-primary";
            case "rejected":
                return "bg-danger";
            case "applied":
                return "bg-secondary";
            default:
                return "bg-secondary";
        }
    };

    // Backend field is applicationdate
    const getDate = (application) => {
        const date = application.applicationdate;

        if (!date) return "Date not available";

        const parsedDate = new Date(date);

        return Number.isNaN(parsedDate.getTime())
            ? "Date not available"
            : parsedDate.toLocaleDateString("en-IN", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric"
              });
    };

    const filteredApplications =
        filter === "All"
            ? applications
            : applications.filter(
                  (application) => statusOf(application) === filter
              );

    const countStatus = (status) =>
        applications.filter(
            (application) => statusOf(application) === status
        ).length;

    return (
        <div className="bg-light min-vh-100">
            {/* Header */}
            <div className="bg-primary text-white py-5">
                <div className="container">
                    <h2 className="fw-bold">My Applications</h2>
                    <p className="mb-0">
                        Track your job applications and their progress.
                    </p>
                </div>
            </div>

            <div className="container py-5">
                {/* Summary */}
                <div className="row g-3 mb-4">
                    <div className="col-6 col-lg-3">
                        <div className="card border-0 shadow-sm h-100">
                            <div className="card-body">
                                <p className="text-muted mb-2">Total Applied</p>
                                <h3 className="fw-bold text-primary">
                                    {applications.length}
                                </h3>
                            </div>
                        </div>
                    </div>

                    <div className="col-6 col-lg-3">
                        <div className="card border-0 shadow-sm h-100">
                            <div className="card-body">
                                <p className="text-muted mb-2">Applied</p>
                                <h3 className="fw-bold text-secondary">
                                    {countStatus("Applied")}
                                </h3>
                            </div>
                        </div>
                    </div>

                    <div className="col-6 col-lg-3">
                        <div className="card border-0 shadow-sm h-100">
                            <div className="card-body">
                                <p className="text-muted mb-2">Shortlisted</p>
                                <h3 className="fw-bold text-success">
                                    {countStatus("Shortlisted")}
                                </h3>
                            </div>
                        </div>
                    </div>

                    <div className="col-6 col-lg-3">
                        <div className="card border-0 shadow-sm h-100">
                            <div className="card-body">
                                <p className="text-muted mb-2">Rejected</p>
                                <h3 className="fw-bold text-danger">
                                    {countStatus("Rejected")}
                                </h3>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Applications heading and filter */}
                <div className="d-flex flex-wrap justify-content-between align-items-center gap-3 mb-4">
                    <div>
                        <h4 className="fw-bold mb-1">Applied Jobs</h4>
                        <p className="text-muted mb-0">
                            View your application status and job details.
                        </p>
                    </div>

                    <select
                        className="form-select"
                        style={{ maxWidth: "220px" }}
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                    >
                        <option value="All">All Applications</option>
                        <option value="Applied">Applied</option>
                        <option value="Shortlisted">Shortlisted</option>
                        <option value="Selected">Selected</option>
                        <option value="Rejected">Rejected</option>
                    </select>
                </div>

                {/* Loading */}
                {loading && (
                    <div className="text-center py-5">
                        <div
                            className="spinner-border text-primary"
                            role="status"
                        />
                        <p className="text-muted mt-3">
                            Loading your applications...
                        </p>
                    </div>
                )}

                {/* Empty state */}
                {!loading && filteredApplications.length === 0 && (
                    <div className="card border-0 shadow-sm text-center py-5">
                        <div className="card-body">
                            <div className="display-4 mb-3">📄</div>
                            <h4 className="fw-bold">
                                {applications.length === 0
                                    ? "No Applications Yet"
                                    : "No Matching Applications"}
                            </h4>
                            <p className="text-muted">
                                {applications.length === 0
                                    ? "Jobs you apply for will appear here."
                                    : "Try selecting a different application status."}
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

                {/* Application list */}
                {!loading && filteredApplications.length > 0 && (
                    <div className="row g-4">
                        {filteredApplications.map((application, index) => (
                            <div
                                className="col-12"
                                key={
                                    application.applicationid ||
                                    application.applicationId ||
                                    index
                                }
                            >
                                <div className="card border-0 shadow-sm">
                                    <div className="card-body p-4">
                                        <div className="d-flex flex-wrap justify-content-between align-items-start gap-3">
                                            <div>
                                                <h5 className="fw-bold mb-1">
                                                    {application.job?.jobrole ||
                                                        "Job title unavailable"}
                                                </h5>

                                                <p className="text-primary fw-semibold mb-2">
                                                    {application.job?.company ||
                                                        "Company unavailable"}
                                                </p>

                                                <p className="text-muted small mb-0">
                                                    📍{" "}
                                                    {application.job?.location ||
                                                        "Location not specified"}
                                                    {" · "}
                                                    💼{" "}
                                                    {application.job?.jobtype ||
                                                        "Job type not specified"}
                                                </p>
                                            </div>

                                            <span
                                                className={`badge ${statusClass(
                                                    statusOf(application)
                                                )} px-3 py-2`}
                                            >
                                                {statusOf(application)}
                                            </span>
                                        </div>

                                        <hr />

                                        <div className="d-flex flex-wrap justify-content-between align-items-center gap-3">
                                            <div className="text-muted small">
                                                <div>
                                                    Applied on: {getDate(application)}
                                                </div>

                                                {(application.applicationid ||
                                                    application.applicationId) && (
                                                    <div className="mt-1">
                                                        Application ID:{" "}
                                                        {application.applicationid ||
                                                            application.applicationId}
                                                    </div>
                                                )}
                                            </div>

                                            {application.job?.jobid && (
                                                <Link
                                                    to={`/jobs/${application.job.jobid}`}
                                                    className="btn btn-outline-primary"
                                                >
                                                    View Job
                                                </Link>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

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

export default MyApplications;
