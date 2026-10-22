
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const API = "http://localhost:8080";

function Notifications() {
  const navigate = useNavigate();

  const [student, setStudent] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [readIds, setReadIds] = useState(() => {
    try {
      const storedStudent = JSON.parse(
        localStorage.getItem("student") || "null"
      );

      if (!storedStudent?.email) return [];

      const saved = localStorage.getItem(
        `readNotifications_${storedStudent.email}`
      );

      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    let active = true;

    const loadNotifications = async () => {
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
          navigate("/studentlogin");
          return;
        }

        const studentResponse = await axios.get(
          `${API}/student/email/${encodeURIComponent(
            loggedInStudent.email
          )}`
        );

        const studentData = studentResponse.data;

        if (!active) return;

        if (!studentData?.studentid) {
          setError("Student information not found.");
          return;
        }

        setStudent(studentData);

        const applicationsResponse = await axios.get(
          `${API}/application/student/${studentData.studentid}`
        );

        const applicationList = Array.isArray(applicationsResponse.data)
          ? applicationsResponse.data
          : [];

        const notificationList = await Promise.all(
          applicationList.map(async (application) => {
            let job = null;

            try {
              const jobResponse = await axios.get(
                `${API}/findbyid/${application.jobid}`
              );
              job = jobResponse.data;
            } catch (jobError) {
              console.error(
                `Could not load job ${application.jobid}`,
                jobError
              );
            }

            const status = application.status || "Applied";

            return {
              id: String(application.applicationid),
              applicationid: application.applicationid,
              jobid: application.jobid,
              jobRole: job?.jobrole || `Job #${application.jobid}`,
              company: job?.company || "Company details unavailable",
              status,
              applicationdate: application.applicationdate,
            };
          })
        );

        notificationList.sort((a, b) => {
          const dateA = new Date(a.applicationdate || 0).getTime();
          const dateB = new Date(b.applicationdate || 0).getTime();
          return dateB - dateA;
        });

        if (active) {
          setNotifications(notificationList);
          setError("");
        }
      } catch (err) {
        console.error("Notifications loading error:", err);

        if (active) {
          setError(
            "Unable to load notifications. Please check the backend and try again."
          );
        }
      } finally {
        if (active) setLoading(false);
      }
    };

    loadNotifications();

    return () => {
      active = false;
    };
  }, [navigate]);

  const saveReadIds = (updatedIds) => {
    setReadIds(updatedIds);

    if (student?.email) {
      localStorage.setItem(
        `readNotifications_${student.email}`,
        JSON.stringify(updatedIds)
      );
    }
  };

  const markAsRead = (id) => {
    if (readIds.includes(id)) return;
    saveReadIds([...readIds, id]);
  };

  const markAllAsRead = () => {
    saveReadIds(notifications.map((item) => item.id));
  };

  const unreadCount = notifications.filter(
    (item) => !readIds.includes(item.id)
  ).length;

  const getStatusStyle = (status) => {
    switch ((status || "").toLowerCase()) {
      case "shortlisted":
        return "bg-primary";
      case "selected":
        return "bg-success";
      case "rejected":
        return "bg-danger";
      case "applied":
        return "bg-secondary";
      default:
        return "bg-dark";
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

  const handleLogout = () => {
    localStorage.removeItem("student");
    navigate("/");
  };

  if (loading) {
    return (
      <div className="container text-center py-5">
        <div className="spinner-border text-primary" role="status" />
        <p className="text-muted mt-3">Loading notifications...</p>
      </div>
    );
  }

  return (
    <div className="bg-light min-vh-100">
      {/* Header */}
      <nav className="navbar navbar-dark bg-primary px-3 px-md-4 shadow-sm">
        <div className="container-fluid">
          <Link
            to="/studentdashboard"
            className="navbar-brand fw-bold fs-4"
          >
            🚀 NextHire
          </Link>

          <div className="d-flex align-items-center gap-2">
            <span className="text-white d-none d-sm-inline">
              {student?.studentname}
            </span>

            <button
              className="btn btn-light btn-sm"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        </div>
      </nav>

      <div className="container py-4">
        {/* Page heading */}
        <div className="d-flex justify-content-between align-items-center flex-wrap gap-3 mb-4">
          <div>
            <h2 className="fw-bold mb-1">🔔 Notifications</h2>
            <p className="text-muted mb-0">
              Track your job applications and their latest status.
            </p>
          </div>

          <Link
            to="/studentdashboard"
            className="btn btn-outline-secondary"
          >
            ← Dashboard
          </Link>
        </div>

        {/* Notification summary */}
        <div className="card border-0 shadow-sm mb-4">
          <div className="card-body d-flex justify-content-between align-items-center flex-wrap gap-3">
            <div>
              <h5 className="fw-bold mb-1">Application Updates</h5>
              <span className="text-muted">
                {notifications.length} application
                {notifications.length === 1 ? "" : "s"} found
              </span>
              {unreadCount > 0 && (
                <span className="badge bg-danger ms-2">
                  {unreadCount} unread
                </span>
              )}
            </div>

            <div className="d-flex gap-2 flex-wrap">
              <button
                className="btn btn-outline-primary"
                onClick={() => window.location.reload()}
              >
                ↻ Refresh
              </button>

              <button
                className="btn btn-primary"
                onClick={markAllAsRead}
                disabled={unreadCount === 0}
              >
                Mark All as Read
              </button>
            </div>
          </div>
        </div>

        {/* Error message */}
        {error && (
          <div className="alert alert-danger" role="alert">
            {error}
            <button
              className="btn btn-sm btn-outline-danger ms-3"
              onClick={() => window.location.reload()}
            >
              Try Again
            </button>
          </div>
        )}

        {/* Empty state */}
        {!error && notifications.length === 0 && (
          <div className="card border-0 shadow-sm">
            <div className="card-body text-center py-5">
              <div style={{ fontSize: "55px" }}>📭</div>
              <h5 className="fw-bold mt-3">
                No notifications yet
              </h5>
              <p className="text-muted">
                Your job application activity will appear here.
              </p>
              <Link to="/jobs" className="btn btn-primary">
                Explore Jobs
              </Link>
            </div>
          </div>
        )}

        {/* Notifications list */}
        <div className="d-flex flex-column gap-3">
          {notifications.map((item) => {
            const isRead = readIds.includes(item.id);
            const isApplied =
              (item.status || "").toLowerCase() === "applied";

            return (
              <div
                key={item.id}
                className={`card border-0 shadow-sm ${
                  isRead ? "" : "border-start border-primary border-4"
                }`}
              >
                <div className="card-body p-3 p-md-4">
                  <div className="d-flex gap-3">
                    <div
                      className={`rounded-circle d-flex align-items-center justify-content-center flex-shrink-0 ${
                        isApplied
                          ? "bg-primary-subtle"
                          : item.status.toLowerCase() === "selected"
                          ? "bg-success-subtle"
                          : item.status.toLowerCase() === "rejected"
                          ? "bg-danger-subtle"
                          : "bg-info-subtle"
                      }`}
                      style={{
                        width: "48px",
                        height: "48px",
                        fontSize: "22px",
                      }}
                    >
                      {isApplied
                        ? "📨"
                        : item.status.toLowerCase() === "shortlisted"
                        ? "⭐"
                        : item.status.toLowerCase() === "selected"
                        ? "🎉"
                        : item.status.toLowerCase() === "rejected"
                        ? "📌"
                        : "🔔"}
                    </div>

                    <div className="flex-grow-1">
                      <div className="d-flex justify-content-between align-items-start flex-wrap gap-2">
                        <div>
                          <h6 className="fw-bold mb-1">
                            {isApplied
                              ? "Application Submitted"
                              : "Application Status"}
                          </h6>

                          <div className="text-muted small">
                            {item.jobRole} · {item.company}
                          </div>
                        </div>

                        <div className="d-flex gap-2 align-items-center flex-wrap">
                          <span
                            className={`badge ${getStatusStyle(item.status)}`}
                          >
                            {item.status}
                          </span>

                          {!isRead && (
                            <span className="badge bg-warning text-dark">
                              Unread
                            </span>
                          )}
                        </div>
                      </div>

                      <p className="mb-2 mt-3">
                        {isApplied
                          ? `Your application for ${item.jobRole} has been submitted.`
                          : `Your current application status for ${item.jobRole} is ${item.status}.`}
                      </p>

                      <small className="text-muted d-block mb-3">
                        🕒 {formatDate(item.applicationdate)}
                      </small>

                      <div className="d-flex gap-2 flex-wrap">
                        <Link
                          to="/jobs"
                          className="btn btn-sm btn-outline-primary"
                          onClick={() => markAsRead(item.id)}
                        >
                          View Jobs
                        </Link>

                        {!isRead && (
                          <button
                            className="btn btn-sm btn-outline-secondary"
                            onClick={() => markAsRead(item.id)}
                          >
                            Mark as Read
                          </button>
                        )}

                        {isRead && (
                          <span className="text-success small align-self-center">
                            ✓ Read
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <p className="text-muted small mt-4">
          These updates are generated from your current application records.
          They refresh when you reload this page.
        </p>
      </div>
    </div>
  );
}

export default Notifications;
