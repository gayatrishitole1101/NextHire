
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const API = "http://localhost:8080";

function StudentDashboard() {
  const navigate = useNavigate();

  const [student, setStudent] = useState(null);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [applicationsLoading, setApplicationsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [applicationError, setApplicationError] = useState("");
  const [downloadingResume, setDownloadingResume] = useState(false);

  useEffect(() => {
    let active = true;

    const loadDashboard = async () => {
      try {
        const storedStudent = localStorage.getItem("student");

        if (!storedStudent) {
          navigate("/studentlogin");
          return;
        }

        let loggedInStudent;

        try {
          loggedInStudent = JSON.parse(storedStudent);
        } catch {
          localStorage.removeItem("student");
          navigate("/studentlogin");
          return;
        }

        if (!loggedInStudent?.email) {
          localStorage.removeItem("student");
          navigate("/studentlogin");
          return;
        }

        const response = await axios.get(
          `${API}/student/email/${encodeURIComponent(
            loggedInStudent.email
          )}`
        );

        if (!active) return;

        const studentData = response.data;

        if (!studentData?.studentid) {
          setErrorMessage("Student information was not found.");
          return;
        }

        setStudent(studentData);

        // Fetch applications belonging to the logged-in student.
        try {
          const applicationResponse = await axios.get(
            `${API}/application/student/${studentData.studentid}`
          );

          const applicationList = Array.isArray(applicationResponse.data)
            ? applicationResponse.data
            : [];

          // Fetch job details for each application.
          const enrichedApplications = await Promise.all(
            applicationList.map(async (application) => {
              try {
                const jobResponse = await axios.get(
                  `${API}/findbyid/${application.jobid}`
                );

                return {
                  ...application,
                  job: jobResponse.data,
                };
              } catch (error) {
                console.error(
                  `Could not load job ${application.jobid}:`,
                  error
                );

                return {
                  ...application,
                  job: null,
                };
              }
            })
          );

          if (active) {
            enrichedApplications.sort((a, b) => {
              const dateA = new Date(a.applicationdate || 0).getTime();
              const dateB = new Date(b.applicationdate || 0).getTime();
              return dateB - dateA;
            });

            setApplications(enrichedApplications);
            setApplicationError("");
          }
        } catch (error) {
          console.error("Applications API error:", error);

          if (active) {
            setApplications([]);
            setApplicationError(
              "Unable to load applications. Please check the backend API."
            );
          }
        } finally {
          if (active) setApplicationsLoading(false);
        }
      } catch (error) {
        console.error("Dashboard API error:", error);

        if (active) {
          setErrorMessage(
            "Unable to load your dashboard. Check whether Spring Boot is running."
          );
        }
      } finally {
        if (active) setLoading(false);
      }
    };

    loadDashboard();

    return () => {
      active = false;
    };
  }, [navigate]);

  const logout = () => {
    localStorage.removeItem("student");
    navigate("/");
  };

  const downloadResume = async () => {
    if (!student?.resume) {
      alert("No resume uploaded. Please upload your resume first.");
      return;
    }

    try {
      setDownloadingResume(true);

      const response = await axios.get(
        `${API}/student/${student.studentid}/resume/download`,
        { responseType: "blob" }
      );

      const blobUrl = window.URL.createObjectURL(response.data);
      const link = document.createElement("a");

      link.href = blobUrl;
      link.download = student.resume;
      document.body.appendChild(link);
      link.click();
      link.remove();

      window.URL.revokeObjectURL(blobUrl);
    } catch (error) {
      console.error("Resume download error:", error);
      alert(
        "Could not download resume. Check the backend endpoint and uploaded file."
      );
    } finally {
      setDownloadingResume(false);
    }
  };

  const getStatusClass = (status) => {
    switch ((status || "Applied").toLowerCase()) {
      case "shortlisted":
        return "bg-primary";
      case "selected":
        return "bg-success";
      case "rejected":
        return "bg-danger";
      case "applied":
        return "bg-secondary";
      default:
        return "bg-secondary";
    }
  };

  const formatDate = (date) => {
    if (!date) return "Date unavailable";

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
      return "Date unavailable";
    }

    return parsedDate.toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center min-vh-100">
        <div className="text-center">
          <div className="spinner-border text-primary" role="status" />
          <p className="mt-3 text-muted">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  if (errorMessage) {
    return (
      <div className="container py-5 text-center">
        <h4 className="text-danger">{errorMessage}</h4>
        <button
          className="btn btn-primary mt-3"
          onClick={() => window.location.reload()}
        >
          Try Again
        </button>
      </div>
    );
  }

  if (!student) return null;

  const firstName = student.studentname
    ? student.studentname.split(" ")[0]
    : "Student";

  const initials = student.studentname
    ? student.studentname
        .split(" ")
        .map((name) => name.charAt(0))
        .join("")
        .substring(0, 2)
        .toUpperCase()
    : "ST";

  const shortlistedCount = applications.filter(
    (application) =>
      (application.status || "Applied").toLowerCase() === "shortlisted"
  ).length;

  const selectedCount = applications.filter(
    (application) =>
      (application.status || "").toLowerCase() === "selected"
  ).length;

  return (
    <div className="bg-light min-vh-100">
      {/* Navbar */}
      <nav className="navbar navbar-dark bg-primary px-4 shadow-sm">
        <div className="container-fluid">
          <Link
            to="/"
            className="navbar-brand fw-bold fs-4 text-decoration-none"
          >
            🚀 NextHire
          </Link>

          <div className="d-flex align-items-center gap-3">
            <button
              className="btn btn-light"
              title="Notifications"
              onClick={() => navigate("/notifications")}
            >
              🔔
            </button>

            <div className="text-white text-end d-none d-md-block">
              <div className="fw-bold">{student.studentname}</div>
              <small>Job Seeker</small>
            </div>

            <div
              className="bg-white text-primary rounded-circle d-flex align-items-center justify-content-center fw-bold"
              style={{ width: "42px", height: "42px" }}
            >
              {initials}
            </div>
          </div>
        </div>
      </nav>

      <div className="container-fluid">
        <div className="row">
          {/* Sidebar */}
          <aside className="col-md-3 col-lg-2 bg-white shadow-sm p-0">
            <div className="p-3">
              <div className="text-center border-bottom pb-4 mb-3">
                <div
                  className="bg-primary text-white rounded-circle mx-auto d-flex align-items-center justify-content-center fw-bold"
                  style={{
                    width: "75px",
                    height: "75px",
                    fontSize: "24px",
                  }}
                >
                  {initials}
                </div>

                <h6 className="mt-3 mb-1">{student.studentname}</h6>
                <small className="text-muted">Job Seeker</small>
              </div>

              {[
                { to: "/studentdashboard", label: "🏠 Dashboard" },
                { to: "/myprofile", label: "👤 My Profile" },
                { to: "/jobs", label: "🔎 Find Jobs" },
                { to: "/savedjob", label: "🔖 Saved Jobs" },
                { to: "/myapplications", label: "📋 My Applications" },
                { to: "/myresume", label: "📄 My Resume" },
                { to: "/notifications", label: "🔔 Notifications" },
                { to: "/settings", label: "⚙️ Settings" },
              ].map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  className={`btn w-100 text-start mb-2 ${
                    item.to === "/studentdashboard"
                      ? "btn-primary"
                      : "btn-light"
                  }`}
                >
                  {item.label}
                </Link>
              ))}

              <hr />

              <button
                onClick={logout}
                className="btn btn-outline-danger w-100 text-start"
              >
                🚪 Logout
              </button>
            </div>
          </aside>

          {/* Main content */}
          <main className="col-md-9 col-lg-10 p-4">
            <div className="mb-4">
              <h2 className="fw-bold">Welcome back, {firstName}! 👋</h2>
              <p className="text-muted">
                Track your applications, manage your resume and discover jobs.
              </p>
            </div>

            {/* Profile Information */}
            <div className="card border-0 shadow-sm mb-4">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h5 className="fw-bold mb-0">👤 Profile Information</h5>
                  <Link
                    to="/myprofile"
                    className="btn btn-outline-primary btn-sm"
                  >
                    Edit Profile
                  </Link>
                </div>

                <div className="row">
                  {[
                    ["Full Name", student.studentname],
                    ["Email", student.email],
                    ["Phone", student.phone],
                    ["Skills", student.skills],
                    ["Education", student.education],
                    ["Experience", student.experience],
                  ].map(([label, value]) => (
                    <div className="col-md-6 mb-3" key={label}>
                      <small className="text-muted">{label}</small>
                      <h6 className="mt-1">
                        {value || (label === "Experience" ? "Fresher" : "Not provided")}
                      </h6>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Dynamic statistics */}
            <div className="row g-3 mb-4">
              <div className="col-sm-6 col-xl-3">
                <div className="card border-0 shadow-sm h-100">
                  <div className="card-body">
                    <div className="text-muted">Applications</div>
                    <h2 className="fw-bold mt-2">
                      {applicationsLoading ? "…" : applications.length}
                    </h2>
                    <Link
                      to="/myapplications"
                      className="small text-decoration-none"
                    >
                      View Applications →
                    </Link>
                  </div>
                </div>
              </div>

              <div className="col-sm-6 col-xl-3">
                <div className="card border-0 shadow-sm h-100">
                  <div className="card-body">
                    <div className="text-muted">Shortlisted</div>
                    <h2 className="fw-bold mt-2">
                      {applicationsLoading ? "…" : shortlistedCount}
                    </h2>
                    <small className="text-muted">
                      Applications shortlisted
                    </small>
                  </div>
                </div>
              </div>

              <div className="col-sm-6 col-xl-3">
                <div className="card border-0 shadow-sm h-100">
                  <div className="card-body">
                    <div className="text-muted">Selected</div>
                    <h2 className="fw-bold mt-2">
                      {applicationsLoading ? "…" : selectedCount}
                    </h2>
                    <small className="text-muted">Selected applications</small>
                  </div>
                </div>
              </div>

              <div className="col-sm-6 col-xl-3">
                <div className="card border-0 shadow-sm h-100">
                  <div className="card-body">
                    <div className="text-muted">Resume</div>
                    <h5 className="fw-bold mt-3">
                      {student.resume ? "Uploaded" : "Not uploaded"}
                    </h5>
                    <Link
                      to="/myresume"
                      className="small text-decoration-none"
                    >
                      Manage Resume →
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Applications */}
            <div className="card border-0 shadow-sm mb-4">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h5 className="fw-bold mb-0">📋 Recent Applications</h5>
                  <Link
                    to="/myapplications"
                    className="text-primary text-decoration-none"
                  >
                    View All
                  </Link>
                </div>

                {applicationError && (
                  <div className="alert alert-danger">
                    {applicationError}
                  </div>
                )}

                {applicationsLoading ? (
                  <div className="text-center py-4">
                    <div className="spinner-border spinner-border-sm text-primary" />
                    <p className="text-muted mt-2 mb-0">
                      Loading applications...
                    </p>
                  </div>
                ) : applications.length === 0 ? (
                  <div className="text-center py-4">
                    <div style={{ fontSize: "42px" }}>📋</div>
                    <h6 className="mt-3">No applications found</h6>
                    <p className="text-muted">
                      Apply for jobs to see your application status here.
                    </p>
                    <Link to="/jobs" className="btn btn-primary">
                      Find Jobs
                    </Link>
                  </div>
                ) : (
                  <div className="table-responsive">
                    <table className="table table-hover align-middle">
                      <thead className="table-light">
                        <tr>
                          <th>Job Role</th>
                          <th>Company</th>
                          <th>Applied On</th>
                          <th>Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {applications.slice(0, 5).map((application) => (
                          <tr key={application.applicationid}>
                            <td>
                              <strong>
                                {application.job?.jobrole ||
                                  `Job #${application.jobid}`}
                              </strong>
                            </td>
                            <td>
                              {application.job?.company || "Not available"}
                            </td>
                            <td>{formatDate(application.applicationdate)}</td>
                            <td>
                              <span
                                className={`badge ${getStatusClass(
                                  application.status
                                )}`}
                              >
                                {application.status || "Applied"}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>

            {/* Resume */}
            <div className="card border-0 shadow-sm mb-4">
              <div className="card-body">
                <h5 className="fw-bold mb-2">📄 My Resume</h5>
                <p className="text-muted">
                  Keep your resume updated for better job opportunities.
                </p>

                <div className="border rounded p-3 mb-3 d-flex justify-content-between align-items-center flex-wrap gap-3">
                  <div>
                    <strong>
                      {student.resume || "No resume uploaded"}
                    </strong>
                    <div className="small text-muted">
                      {student.resume
                        ? "Resume is saved in your account."
                        : "Upload a resume to your account."}
                    </div>
                  </div>

                  {student.resume && (
                    <button
                      className="btn btn-outline-success"
                      onClick={downloadResume}
                      disabled={downloadingResume}
                    >
                      {downloadingResume ? "Downloading..." : "Download Resume"}
                    </button>
                  )}
                </div>

                <Link to="/myresume" className="btn btn-primary">
                  {student.resume ? "Manage Resume" : "Upload Resume"}
                </Link>
              </div>
            </div>

            {/* Recommended Jobs */}
            <div className="card border-0 shadow-sm">
              <div className="card-body d-flex justify-content-between align-items-center flex-wrap gap-3">
                <div>
                  <h5 className="fw-bold">🔎 Find Your Next Opportunity</h5>
                  <p className="text-muted mb-0">
                    Explore available jobs and apply according to your skills.
                  </p>
                </div>
                <Link to="/jobs" className="btn btn-primary">
                  Explore Jobs
                </Link>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

export default StudentDashboard;
