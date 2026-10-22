
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function Settings() {
  const navigate = useNavigate();

  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);

  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordLoading, setPasswordLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  useEffect(() => {
    const loggedInStudent = JSON.parse(
      localStorage.getItem("student")
    );

    if (!loggedInStudent || !loggedInStudent.email) {
      navigate("/studentlogin");
      return;
    }

    axios
      .get(
        `http://localhost:8080/student/email/${encodeURIComponent(
          loggedInStudent.email
        )}`
      )
      .then((response) => {
        setStudent(response.data);
      })
      .catch((error) => {
        console.error("Unable to load student details:", error);
        setMessage("Unable to load account details.");
        setMessageType("danger");
      })
      .finally(() => setLoading(false));
  }, [navigate]);

  const handleChangePassword = async (e) => {
    e.preventDefault();

    setMessage("");
    setMessageType("");

    if (!currentPassword || !newPassword || !confirmPassword) {
      setMessage("Please fill in all password fields.");
      setMessageType("danger");
      return;
    }

    if (newPassword.length < 8) {
      setMessage("New password must be at least 8 characters.");
      setMessageType("danger");
      return;
    }

    if (newPassword !== confirmPassword) {
      setMessage("New password and confirm password do not match.");
      setMessageType("danger");
      return;
    }

    if (currentPassword === newPassword) {
      setMessage("New password must be different from current password.");
      setMessageType("danger");
      return;
    }

    if (!student?.studentid) {
      setMessage("Student information not found. Please login again.");
      setMessageType("danger");
      return;
    }

    try {
      setPasswordLoading(true);

      const response = await axios.put(
        `http://localhost:8080/changepassword/${student.studentid}`,
        {
          currentPassword: currentPassword,
          newPassword: newPassword,
        }
      );

      setMessage(
        typeof response.data === "string"
          ? response.data
          : "Password changed successfully."
      );
      setMessageType("success");

      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setShowPasswordForm(false);
    } catch (error) {
      const errorMessage =
        typeof error.response?.data === "string"
          ? error.response.data
          : "Unable to change password. Please try again.";

      setMessage(errorMessage);
      setMessageType("danger");
    } finally {
      setPasswordLoading(false);
    }
  };

  const handleLogout = () => {
    const confirmLogout = window.confirm(
      "Are you sure you want to logout?"
    );

    if (confirmLogout) {
      localStorage.removeItem("student");
      navigate("/");
    }
  };

  if (loading) {
    return (
      <div className="container mt-5 text-center">
        Loading settings...
      </div>
    );
  }

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-2">
        <div>
          <h2 className="fw-bold">Settings</h2>
          <p className="text-muted mb-0">
            Manage your NextHire account and preferences.
          </p>
        </div>

        <Link
          to="/studentdashboard"
          className="btn btn-outline-secondary"
        >
          Back to Dashboard
        </Link>
      </div>

      {message && (
        <div
          className={`alert alert-${messageType}`}
          role="alert"
        >
          {message}
        </div>
      )}

      {/* Account Information */}
      <div className="card shadow-sm mb-4">
        <div className="card-body p-4">
          <h5 className="fw-bold mb-3">
            Account Information
          </h5>

          <div className="mb-3">
            <label className="form-label fw-semibold">
              Student Name
            </label>
            <input
              type="text"
              className="form-control"
              value={student?.studentname || ""}
              readOnly
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">
              Email Address
            </label>
            <input
              type="email"
              className="form-control"
              value={student?.email || ""}
              readOnly
            />
          </div>

          <div className="mb-0">
            <label className="form-label fw-semibold">
              Phone Number
            </label>
            <input
              type="text"
              className="form-control"
              value={student?.phone || ""}
              readOnly
            />
          </div>

          <small className="text-muted d-block mt-3">
            To edit your profile, visit My Profile.
          </small>

          <Link
            to="/myprofile"
            className="btn btn-primary mt-3"
          >
            Edit Profile
          </Link>
        </div>
      </div>

      {/* Security / Change Password */}
      <div className="card shadow-sm mb-4">
        <div className="card-body p-4">
          <h5 className="fw-bold mb-2">Security</h5>

          <p className="text-muted">
            Keep your account credentials secure.
          </p>

          {!showPasswordForm ? (
            <button
              type="button"
              className="btn btn-outline-primary"
              onClick={() => {
                setMessage("");
                setShowPasswordForm(true);
              }}
            >
              Change Password
            </button>
          ) : (
            <form onSubmit={handleChangePassword}>
              <div className="mb-3">
                <label className="form-label fw-semibold">
                  Current Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  value={currentPassword}
                  onChange={(e) =>
                    setCurrentPassword(e.target.value)
                  }
                  autoComplete="current-password"
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label fw-semibold">
                  New Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  value={newPassword}
                  onChange={(e) =>
                    setNewPassword(e.target.value)
                  }
                  minLength={8}
                  autoComplete="new-password"
                  required
                />
                <small className="text-muted">
                  Minimum 8 characters.
                </small>
              </div>

              <div className="mb-3">
                <label className="form-label fw-semibold">
                  Confirm New Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  value={confirmPassword}
                  onChange={(e) =>
                    setConfirmPassword(e.target.value)
                  }
                  minLength={8}
                  autoComplete="new-password"
                  required
                />
              </div>

              <button
                type="submit"
                className="btn btn-primary me-2"
                disabled={passwordLoading}
              >
                {passwordLoading
                  ? "Updating..."
                  : "Update Password"}
              </button>

              <button
                type="button"
                className="btn btn-outline-secondary"
                disabled={passwordLoading}
                onClick={() => {
                  setShowPasswordForm(false);
                  setCurrentPassword("");
                  setNewPassword("");
                  setConfirmPassword("");
                  setMessage("");
                }}
              >
                Cancel
              </button>
            </form>
          )}
        </div>
      </div>

      {/* Privacy */}
      <div className="card shadow-sm mb-4">
        <div className="card-body p-4">
          <h5 className="fw-bold mb-2">Privacy</h5>
          <p className="text-muted mb-0">
            Your profile information is used to support your
            job applications and recruitment activities.
          </p>
        </div>
      </div>

      {/* Logout */}
      <div className="card shadow-sm border-danger">
        <div className="card-body p-4">
          <h5 className="fw-bold text-danger">Logout</h5>

          <p className="text-muted">
            Sign out of your NextHire student account.
          </p>

          <button
            type="button"
            className="btn btn-danger"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

export default Settings;
