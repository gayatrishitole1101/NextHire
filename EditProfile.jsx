
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

function EditProfile() {

    const navigate = useNavigate();
    const { studentid } = useParams();

    const [student, setStudent] = useState({
        studentid: "",
        studentname: "",
        email: "",
        phone: "",
        skills: "",
        education: "",
        experience: "",
        resumeName: ""
    });

    const [loading, setLoading] = useState(true);


    // ================= GET STUDENT =================

    useEffect(() => {

        axios.get(`http://localhost:8080/student/${studentid}`)
            .then((response) => {

                setStudent(response.data);
                setLoading(false);

            })
            .catch((error) => {

                console.log(error);
                alert("Unable to load profile.");
                setLoading(false);

            });

    }, [studentid]);


    // ================= HANDLE CHANGE =================

    const handleChange = (e) => {

        setStudent({
            ...student,
            [e.target.name]: e.target.value
        });

    };


    // ================= UPDATE PROFILE =================

    const handleSubmit = (e) => {

        e.preventDefault();

        axios.put(
            `http://localhost:8080/updateprofile/${student.studentid}`,
            student
        )
        .then((response) => {

            alert(response.data);

            navigate("/myprofile");

        })
        .catch((error) => {

            console.log(error);

            alert("Unable to update profile.");

        });

    };


    // ================= LOADING =================

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


    return (

        <div className="bg-light min-vh-100">

            {/* Header */}

            <div className="bg-primary text-white py-4">

                <div className="container">

                    <h2 className="fw-bold mb-1">
                        Edit Profile
                    </h2>

                    <p className="mb-0">
                        Update your personal and professional information
                    </p>

                </div>

            </div>


            {/* Form */}

            <div className="container py-5">

                <div className="row justify-content-center">

                    <div className="col-lg-8">

                        <div className="card border-0 shadow-sm">

                            <div className="card-body p-4">

                                <h4 className="fw-bold mb-4">
                                    Profile Information
                                </h4>


                                <form onSubmit={handleSubmit}>


                                    {/* Full Name */}

                                    <div className="mb-3">

                                        <label className="form-label fw-semibold">
                                            Full Name
                                        </label>

                                        <input
                                            type="text"
                                            name="studentname"
                                            className="form-control"
                                            value={student.studentname || ""}
                                            onChange={handleChange}
                                            required
                                        />

                                    </div>


                                    {/* Email */}

                                    <div className="mb-3">

                                        <label className="form-label fw-semibold">
                                            Email
                                        </label>

                                        <input
                                            type="email"
                                            name="email"
                                            className="form-control"
                                            value={student.email || ""}
                                            onChange={handleChange}
                                            required
                                        />

                                    </div>


                                    {/* Phone */}

                                    <div className="mb-3">

                                        <label className="form-label fw-semibold">
                                            Phone Number
                                        </label>

                                        <input
                                            type="tel"
                                            name="phone"
                                            className="form-control"
                                            value={student.phone || ""}
                                            onChange={handleChange}
                                            required
                                        />

                                    </div>


                                    {/* Education */}

                                    <div className="mb-3">

                                        <label className="form-label fw-semibold">
                                            Education
                                        </label>

                                        <input
                                            type="text"
                                            name="education"
                                            className="form-control"
                                            placeholder="Example: BCA"
                                            value={student.education || ""}
                                            onChange={handleChange}
                                        />

                                    </div>


                                    {/* Skills */}

                                    <div className="mb-3">

                                        <label className="form-label fw-semibold">
                                            Skills
                                        </label>

                                        <textarea
                                            name="skills"
                                            className="form-control"
                                            rows="3"
                                            placeholder="Example: Java, React, Spring Boot, SQL"
                                            value={student.skills || ""}
                                            onChange={handleChange}
                                        ></textarea>

                                    </div>


                                    {/* Experience */}

                                    <div className="mb-3">

                                        <label className="form-label fw-semibold">
                                            Experience
                                        </label>

                                        <textarea
                                            name="experience"
                                            className="form-control"
                                            rows="3"
                                            placeholder="Example: Fresher / 1 year experience"
                                            value={student.experience || ""}
                                            onChange={handleChange}
                                        ></textarea>

                                    </div>


                                    {/* Resume */}

                                    <div className="mb-4">

                                        <label className="form-label fw-semibold">
                                            Resume Name
                                        </label>

                                        <input
                                            type="text"
                                            name="resumeName"
                                            className="form-control"
                                            placeholder="Example: Gayatri_Resume.pdf"
                                            value={student.resumeName || ""}
                                            onChange={handleChange}
                                        />

                                    </div>


                                    {/* Buttons */}

                                    <div className="d-flex gap-2">

                                        <button
                                            type="submit"
                                            className="btn btn-primary px-4"
                                        >
                                            Save Changes
                                        </button>

                                        <button
                                            type="button"
                                            className="btn btn-outline-secondary px-4"
                                            onClick={() =>
                                                navigate("/myprofile")
                                            }
                                        >
                                            Cancel
                                        </button>

                                    </div>


                                </form>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </div>

    );
}

export default EditProfile;