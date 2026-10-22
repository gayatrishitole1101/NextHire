import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function MyResume() {
    const navigate = useNavigate();
    const [studentId, setStudentId] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const [resumeName, setResumeName] = useState("");
    const [loading, setLoading] = useState(true);
    const [uploading, setUploading] = useState(false);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        const loadStudent = async () => {
            try {
                const loggedInStudent = localStorage.getItem("student");
                if (!loggedInStudent) {
                    navigate("/studentlogin");
                    return;
                }

                const student = JSON.parse(loggedInStudent);
                const response = await axios.get(
                    `http://localhost:8080/student/email/${encodeURIComponent(student.email)}`
                );

                setStudentId(response.data.studentid);
                setResumeName(response.data.resume || "");
            } catch (err) {
                console.error("Unable to load student details:", err);
                setError("Could not load your profile. Please check the backend.");
            } finally {
                setLoading(false);
            }
        };

        loadStudent();
    }, [navigate]);

    const handleFileChange = (event) => {
        const file = event.target.files?.[0];
        setMessage("");
        setError("");

        if (!file) {
            setSelectedFile(null);
            return;
        }

        const allowedExtensions = [".pdf", ".doc", ".docx"];
        const isAllowed = allowedExtensions.some((extension) =>
            file.name.toLowerCase().endsWith(extension)
        );

        if (!isAllowed) {
            setSelectedFile(null);
            setError("Please choose a PDF, DOC, or DOCX file.");
            event.target.value = "";
            return;
        }

        if (file.size > 5 * 1024 * 1024) {
            setSelectedFile(null);
            setError("File size must be 5 MB or less.");
            event.target.value = "";
            return;
        }

        setSelectedFile(file);
    };

    const handleUpload = async (event) => {
        event.preventDefault();
        setMessage("");
        setError("");

        if (!studentId || !selectedFile) {
            setError("Please select your resume file first.");
            return;
        }

        const formData = new FormData();
        formData.append("file", selectedFile);

        try {
            setUploading(true);
            const response = await axios.post(
                `http://localhost:8080/student/${studentId}/resume`,
                formData
            );

            setMessage(
                typeof response.data === "string"
                    ? response.data
                    : "Resume uploaded successfully."
            );

            const studentResponse = await axios.get(
                `http://localhost:8080/student/${studentId}`
            );
            setResumeName(studentResponse.data.resume || "");
            setSelectedFile(null);

            const fileInput = document.getElementById("resume-file");
            if (fileInput) fileInput.value = "";
        } catch (err) {
            console.error("Resume upload failed:", err);
            setError(
                typeof err.response?.data === "string"
                    ? err.response.data
                    : "Resume upload failed. Please check the backend."
            );
        } finally {
            setUploading(false);
        }
    };

    const handleDownload = async () => {
        if (!studentId || !resumeName) return;

        try {
            const response = await axios.get(
                `http://localhost:8080/student/${studentId}/resume/download`,
                { responseType: "blob" }
            );

            const blobUrl = window.URL.createObjectURL(response.data);
            const link = document.createElement("a");
            link.href = blobUrl;
            link.download = resumeName;
            document.body.appendChild(link);
            link.click();
            link.remove();
            window.URL.revokeObjectURL(blobUrl);
        } catch (err) {
            console.error("Resume download failed:", err);
            setError("Could not download the resume. Please check the backend.");
        }
    };

    if (loading) {
        return (
            <div className="bg-light min-vh-100 d-flex justify-content-center align-items-center">
                <div className="text-center">
                    <div className="spinner-border text-primary" role="status" />
                    <p className="text-muted mt-3">Loading your resume...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-light min-vh-100">
            <div className="bg-primary text-white py-5">
                <div className="container">
                    <p className="text-white-50 mb-2">NextHire / Student</p>
                    <h2 className="fw-bold mb-2">My Resume</h2>
                    <p className="mb-0">
                        Upload and manage the resume you use for job applications.
                    </p>
                </div>
            </div>

            <div className="container py-5">
                {message && <div className="alert alert-success">{message}</div>}
                {error && <div className="alert alert-danger">{error}</div>}

                <div className="row g-4">
                    <div className="col-12 col-lg-7">
                        <div className="card border-0 shadow-sm h-100">
                            <div className="card-body p-4 p-md-5">
                                <div className="d-flex align-items-center gap-3 mb-4">
                                    <div
                                        className="rounded-3 bg-primary bg-opacity-10 text-primary d-flex align-items-center justify-content-center"
                                        style={{ width: 56, height: 56 }}
                                    >
                                        <span className="fs-3">📄</span>
                                    </div>
                                    <div>
                                        <h4 className="fw-bold mb-1">Upload Your Resume</h4>
                                        <p className="text-muted mb-0">
                                            Choose a file from your laptop.
                                        </p>
                                    </div>
                                </div>

                                <form onSubmit={handleUpload}>
                                    <label htmlFor="resume-file" className="form-label fw-semibold">
                                        Select resume file
                                    </label>
                                    <input
                                        id="resume-file"
                                        type="file"
                                        className="form-control form-control-lg"
                                        accept=".pdf,.doc,.docx"
                                        onChange={handleFileChange}
                                    />
                                    <div className="form-text mb-4">
                                        Accepted formats: PDF, DOC, DOCX. Maximum size: 5 MB.
                                    </div>

                                    {selectedFile && (
                                        <div className="alert alert-info text-break">
                                            <strong>Selected:</strong> {selectedFile.name}
                                            <div className="small">
                                                {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB
                                            </div>
                                        </div>
                                    )}

                                    <button
                                        type="submit"
                                        className="btn btn-primary btn-lg w-100"
                                        disabled={uploading || !selectedFile}
                                    >
                                        {uploading ? "Uploading..." : "Upload Resume"}
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>

                    <div className="col-12 col-lg-5">
                        <div className="card border-0 shadow-sm h-100">
                            <div className="card-body p-4 p-md-5">
                                <h4 className="fw-bold mb-3">Current Resume</h4>

                                {resumeName ? (
                                    <>
                                        <div className="border rounded-3 p-3 mb-3">
                                            <div className="fw-semibold text-break">{resumeName}</div>
                                            <div className="text-success small mt-1">
                                                ● Resume uploaded
                                            </div>
                                        </div>
                                        <button
                                            type="button"
                                            className="btn btn-outline-primary w-100"
                                            onClick={handleDownload}
                                        >
                                            Download Resume
                                        </button>
                                        <p className="text-muted small mt-3 mb-0">
                                            To replace your resume, select a new file and upload it.
                                        </p>
                                    </>
                                ) : (
                                    <div className="text-center py-4">
                                        <div className="display-4 mb-3">📂</div>
                                        <h5 className="fw-bold">No resume uploaded yet</h5>
                                        <p className="text-muted mb-0">
                                            Browse for your resume and upload it to your profile.
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="card border-0 shadow-sm mt-4">
                            <div className="card-body p-4">
                                <h6 className="fw-bold">Resume tips</h6>
                                <ul className="text-muted small mb-0">
                                    <li>Use a clear, professional file name.</li>
                                    <li>Keep your resume up to date.</li>
                                    <li>Check your contact details before uploading.</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-4">
                    <Link to="/studentdashboard" className="btn btn-outline-primary">
                        ← Back to Dashboard
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default MyResume;
