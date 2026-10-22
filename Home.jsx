import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import HomeNavbar from "./HomeNavbar";
import axios from "axios";

function Home() {

    // ================= STATS =================

    const [jobCount, setJobCount] = useState(0);
    const [categorycount, SetCategory] = useState(0);
    const [companycount, SetCompany] = useState(0);
    const [jobSeekerCount, setJobSeekerCount] = useState(0);

    // ================= SEARCH =================

    const [searchText, setSearchText] = useState("");
    const [location, setLocation] = useState("");

    const [jobs, setJobs] = useState([]);
    const [searchResults, setSearchResults] = useState([]);

    const [searched, setSearched] = useState(false);


    // ================= JOB COUNT =================

    useEffect(() => {

        axios.get("http://localhost:8080/countofjob")
            .then((response) => {
                setJobCount(response.data);
            })
            .catch((error) => {
                console.log(error);
            });

    }, []);


    // ================= CATEGORY COUNT =================

    useEffect(() => {

        axios.get("http://localhost:8080/countofcategory")
            .then((response) => {
                SetCategory(response.data);
            })
            .catch((error) => {
                console.log(error);
            });

    }, []);


    // ================= COMPANY COUNT =================

    useEffect(() => {

        axios.get("http://localhost:8080/countofcompany")
            .then((response) => {
                SetCompany(response.data);
            })
            .catch((error) => {
                console.log(error);
            });

    }, []);


    // ================= JOB SEEKER COUNT =================

    useEffect(() => {

        axios.get("http://localhost:8080/countofjobseekers")
            .then((response) => {
                setJobSeekerCount(response.data);
            })
            .catch((error) => {
                console.log(error);
            });

    }, []);


    // ================= GET ALL JOBS =================

    useEffect(() => {

        axios.get("http://localhost:8080/findalljobs")
            .then((response) => {
                setJobs(response.data);
            })
            .catch((error) => {
                console.log(error);
            });

    }, []);


    // ================= SEARCH JOB =================

    const handleSearch = () => {

        const keyword = searchText.trim().toLowerCase();
        const searchLocation = location.trim().toLowerCase();

        const result = jobs.filter((job) => {

            const role =
                job.jobrole?.toLowerCase() || "";

            const company =
                job.company?.toLowerCase() || "";

            const skills =
                job.skills?.toLowerCase() || "";

            const description =
                job.jobdescription?.toLowerCase() || "";

            const jobLocation =
                job.location?.toLowerCase() || "";


            const keywordMatch =
                keyword === "" ||
                role.includes(keyword) ||
                company.includes(keyword) ||
                skills.includes(keyword) ||
                description.includes(keyword);


            const locationMatch =
                searchLocation === "" ||
                jobLocation.includes(searchLocation);


            return keywordMatch && locationMatch;
        });


        setSearchResults(result);
        setSearched(true);
    };


    // ================= CLEAR SEARCH =================

    const handleClearSearch = () => {

        setSearchText("");
        setLocation("");
        setSearchResults([]);
        setSearched(false);
    };


    return (
        <div>

            {/* <HomeNavbar /> */}


            {/* ================= HERO SECTION ================= */}

            <section className="py-5 bg-light">

                <div className="container py-5">

                    <div className="row justify-content-center">

                        <div className="col-lg-9 text-center">

                            <h1 className="display-4 fw-bold">
                                🚀 NextHire
                            </h1>

                            <p className="lead text-muted mt-3">
                                Search thousands of job opportunities and
                                find the right career for you.
                            </p>


                            {/* ================= SEARCH AREA ================= */}

                            <div className="card shadow border-0 p-3 mt-4">

                                <div className="row g-2">

                                    <div className="col-md-5">

                                        <input
                                            type="text"
                                            className="form-control form-control-lg"
                                            placeholder="Job title, skills or company"
                                            value={searchText}
                                            onChange={(e) =>
                                                setSearchText(e.target.value)
                                            }
                                            onKeyDown={(e) => {
                                                if (e.key === "Enter") {
                                                    handleSearch();
                                                }
                                            }}
                                        />

                                    </div>


                                    <div className="col-md-4">

                                        <input
                                            type="text"
                                            className="form-control form-control-lg"
                                            placeholder="Location"
                                            value={location}
                                            onChange={(e) =>
                                                setLocation(e.target.value)
                                            }
                                            onKeyDown={(e) => {
                                                if (e.key === "Enter") {
                                                    handleSearch();
                                                }
                                            }}
                                        />

                                    </div>


                                    <div className="col-md-3">

                                        <button
                                            className="btn btn-primary btn-lg w-100"
                                            onClick={handleSearch}
                                        >
                                            🔍 Search Jobs
                                        </button>

                                    </div>

                                </div>


                                {searched && (
                                    <div className="text-center mt-3">

                                        <button
                                            className="btn btn-sm btn-outline-secondary"
                                            onClick={handleClearSearch}
                                        >
                                            Clear Search
                                        </button>

                                    </div>
                                )}

                            </div>


                        </div>

                    </div>

                </div>

            </section>


            {/* ================= SEARCH RESULTS ================= */}

            {searched && (

                <section className="py-5">

                    <div className="container">

                        <div className="d-flex justify-content-between align-items-center mb-4">

                            <div>

                                <h2 className="fw-bold mb-1">
                                    Search Results
                                </h2>

                                <p className="text-muted mb-0">
                                    {searchResults.length} job(s) found
                                </p>

                            </div>

                        </div>


                        {searchResults.length === 0 ? (

                            <div className="text-center py-5">

                                <h4 className="text-muted">
                                    No jobs found 😔
                                </h4>

                                <p className="text-muted">
                                    Try another job title, skill, company or location.
                                </p>

                            </div>

                        ) : (

                            <div className="row g-4">

                                {searchResults.map((job) => (

                                    <div
                                        className="col-md-6"
                                        key={job.jobid}
                                    >

                                        <div className="card border-0 shadow-sm h-100">

                                            <div className="card-body p-4">

                                                <div className="d-flex justify-content-between">

                                                    <div>

                                                        <h5 className="fw-bold">
                                                            {job.jobrole}
                                                        </h5>

                                                        <p className="text-muted mb-2">
                                                            {job.company}
                                                        </p>

                                                    </div>

                                                    <span className="badge bg-primary h-25">
                                                        {job.jobtype}
                                                    </span>

                                                </div>


                                                <p className="mb-2">
                                                    📍 {job.location}
                                                    &nbsp;&nbsp;
                                                    💼 {job.experience}
                                                </p>


                                                <p className="text-muted mb-2">
                                                    🛠️ {job.skills}
                                                </p>


                                                <p className="mb-3">
                                                    💰 ₹{job.salary}
                                                </p>


                                                <Link
                                                    to={`/jobs/${job.jobid}`}
                                                    className="btn btn-primary"
                                                >
                                                    View Job
                                                </Link>

                                            </div>

                                        </div>

                                    </div>

                                ))}

                            </div>

                        )}

                    </div>

                </section>

            )}


            {/* ================= STATS ================= */}

            <section className="py-4 border-bottom">

                <div className="container">

                    <div className="row text-center">

                        <div className="col-md-3 mb-3 mb-md-0">

                            <h3 className="fw-bold text-primary">
                                {jobCount}+
                            </h3>

                            <p className="text-muted mb-0">
                                Active Jobs
                            </p>

                        </div>


                        <div className="col-md-3 mb-3 mb-md-0">

                            <h3 className="fw-bold text-primary">
                                {companycount}+
                            </h3>

                            <p className="text-muted mb-0">
                                Companies
                            </p>

                        </div>


                        <div className="col-md-3 mb-3 mb-md-0">

                            <h3 className="fw-bold text-primary">
                                {jobSeekerCount}+
                            </h3>

                            <p className="text-muted mb-0">
                                Job Seekers
                            </p>

                        </div>


                        <div className="col-md-3">

                            <h3 className="fw-bold text-primary">
                                {categorycount}+
                            </h3>

                            <p className="text-muted mb-0">
                                Job Categories
                            </p>

                        </div>

                    </div>

                </div>

            </section>


            {/* ================= JOB CATEGORIES ================= */}

            <section className="py-5">

                <div className="container">

                    <div className="text-center mb-5">

                        <h2 className="fw-bold">
                            Explore Job Categories
                        </h2>

                        <p className="text-muted">
                            Find opportunities based on your skills and interests.
                        </p>

                    </div>


                    <div className="row g-4">

                        <div className="col-md-3">

                            <div className="card border-0 shadow-sm h-100">

                                <div className="card-body">

                                    <h4>💻</h4>

                                    <h5 className="fw-bold mt-3">
                                        IT & Software
                                    </h5>

                                    <p className="text-muted">
                                        Software Developer, Web Developer,
                                        Java, React and more.
                                    </p>

                                    <Link
                                        to="/jobs?category=IT"
                                        className="text-primary text-decoration-none"
                                    >
                                        Explore Jobs →
                                    </Link>

                                </div>

                            </div>

                        </div>


                        <div className="col-md-3">

                            <div className="card border-0 shadow-sm h-100">

                                <div className="card-body">

                                    <h4>📊</h4>

                                    <h5 className="fw-bold mt-3">
                                        Data & Analytics
                                    </h5>

                                    <p className="text-muted">
                                        Data Analyst, Data Science,
                                        Business Analytics and more.
                                    </p>

                                    <Link
                                        to="/jobs?category=Data"
                                        className="text-primary text-decoration-none"
                                    >
                                        Explore Jobs →
                                    </Link>

                                </div>

                            </div>

                        </div>


                        <div className="col-md-3">

                            <div className="card border-0 shadow-sm h-100">

                                <div className="card-body">

                                    <h4>📈</h4>

                                    <h5 className="fw-bold mt-3">
                                        Business
                                    </h5>

                                    <p className="text-muted">
                                        Sales, Marketing, HR,
                                        Finance and Management.
                                    </p>

                                    <Link
                                        to="/jobs?category=Business"
                                        className="text-primary text-decoration-none"
                                    >
                                        Explore Jobs →
                                    </Link>

                                </div>

                            </div>

                        </div>


                        <div className="col-md-3">

                            <div className="card border-0 shadow-sm h-100">

                                <div className="card-body">

                                    <h4>🎨</h4>

                                    <h5 className="fw-bold mt-3">
                                        Design
                                    </h5>

                                    <p className="text-muted">
                                        UI/UX, Graphic Design,
                                        Creative and more.
                                    </p>

                                    <Link
                                        to="/jobs?category=Design"
                                        className="text-primary text-decoration-none"
                                    >
                                        Explore Jobs →
                                    </Link>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            </section>


            {/* ================= FEATURED JOBS ================= */}

            <section className="py-5 bg-light">

                <div className="container">

                    <div className="d-flex justify-content-between align-items-center mb-4">

                        <div>

                            <h2 className="fw-bold mb-1">
                                Featured Jobs
                            </h2>

                            <p className="text-muted mb-0">
                                Explore some of the latest opportunities.
                            </p>

                        </div>

                        <Link
                            to="/jobs"
                            className="btn btn-outline-primary"
                        >
                            View All Jobs
                        </Link>

                    </div>


                    <div className="row g-4">

                        <div className="col-md-6">

                            <div className="card border-0 shadow-sm">

                                <div className="card-body p-4">

                                    <h5 className="fw-bold">
                                        Java Developer
                                    </h5>

                                    <p className="text-muted mb-2">
                                        Tech Solutions Pvt. Ltd.
                                    </p>

                                    <p className="mb-2">
                                        📍 Pune &nbsp;&nbsp; 💼 0-2 Years
                                    </p>

                                    <p className="text-muted">
                                        Java · Spring Boot · MySQL
                                    </p>

                                    <Link
                                        to="/jobs"
                                        className="btn btn-primary"
                                    >
                                        View Jobs
                                    </Link>

                                </div>

                            </div>

                        </div>


                        <div className="col-md-6">

                            <div className="card border-0 shadow-sm">

                                <div className="card-body p-4">

                                    <h5 className="fw-bold">
                                        Frontend Developer
                                    </h5>

                                    <p className="text-muted mb-2">
                                        Digital Technologies
                                    </p>

                                    <p className="mb-2">
                                        📍 Pune &nbsp;&nbsp; 💼 0-2 Years
                                    </p>

                                    <p className="text-muted">
                                        React · JavaScript · Bootstrap
                                    </p>

                                    <Link
                                        to="/jobs"
                                        className="btn btn-primary"
                                    >
                                        View Jobs
                                    </Link>

                                </div>

                            </div>

                        </div>


                        <div className="col-md-6">

                            <div className="card border-0 shadow-sm">

                                <div className="card-body p-4">

                                    <h5 className="fw-bold">
                                        Data Analyst
                                    </h5>

                                    <p className="text-muted mb-2">
                                        Analytics Solutions
                                    </p>

                                    <p className="mb-2">
                                        📍 Remote &nbsp;&nbsp; 💼 0-2 Years
                                    </p>

                                    <p className="text-muted">
                                        SQL · Excel · Power BI
                                    </p>

                                    <Link
                                        to="/jobs"
                                        className="btn btn-primary"
                                    >
                                        View Jobs
                                    </Link>

                                </div>

                            </div>

                        </div>


                        <div className="col-md-6">

                            <div className="card border-0 shadow-sm">

                                <div className="card-body p-4">

                                    <h5 className="fw-bold">
                                        UI/UX Designer
                                    </h5>

                                    <p className="text-muted mb-2">
                                        Creative Studio
                                    </p>

                                    <p className="mb-2">
                                        📍 Mumbai &nbsp;&nbsp; 💼 1-3 Years
                                    </p>

                                    <p className="text-muted">
                                        Figma · UI Design · UX Research
                                    </p>

                                    <Link
                                        to="/jobs"
                                        className="btn btn-primary"
                                    >
                                        View Jobs
                                    </Link>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            </section>


            {/* ================= HOW IT WORKS ================= */}

            <section className="py-5">

                <div className="container">

                    <div className="text-center mb-5">

                        <h2 className="fw-bold">
                            How NextHire Works
                        </h2>

                        <p className="text-muted">
                            Start your career journey in three simple steps.
                        </p>

                    </div>


                    <div className="row text-center">

                        <div className="col-md-4 mb-4">

                            <div className="display-5 text-primary fw-bold">
                                01
                            </div>

                            <h5 className="fw-bold mt-3">
                                Create Your Profile
                            </h5>

                            <p className="text-muted">
                                Register on NextHire and create
                                your professional profile.
                            </p>

                        </div>


                        <div className="col-md-4 mb-4">

                            <div className="display-5 text-primary fw-bold">
                                02
                            </div>

                            <h5 className="fw-bold mt-3">
                                Find Jobs
                            </h5>

                            <p className="text-muted">
                                Search for jobs based on role,
                                skills and location.
                            </p>

                        </div>


                        <div className="col-md-4 mb-4">

                            <div className="display-5 text-primary fw-bold">
                                03
                            </div>

                            <h5 className="fw-bold mt-3">
                                Apply & Grow
                            </h5>

                            <p className="text-muted">
                                Apply to suitable jobs and
                                take the next step in your career.
                            </p>

                        </div>

                    </div>

                </div>

            </section>


            {/* ================= CTA ================= */}

            <section className="py-5 bg-primary text-white">

                <div className="container text-center">

                    <h2 className="fw-bold">
                        Ready to Take the Next Step?
                    </h2>

                    <p className="lead">
                        Create your profile and start exploring
                        career opportunities today.
                    </p>

                    <Link
                        to="/studentregistration"
                        className="btn btn-light btn-lg px-5 mt-2"
                    >
                        Create Your Profile
                    </Link>

                </div>

            </section>


            {/* ================= FOOTER ================= */}

            <footer className="bg-dark text-white py-5">

                <div className="container">

                    <div className="row">

                        <div className="col-md-6">

                            <h4 className="fw-bold">
                                🚀 NextHire
                            </h4>

                            <p className="text-secondary">
                                A simple platform connecting job seekers
                                with career opportunities.
                            </p>

                        </div>


                        <div className="col-md-3">

                            <h6 className="fw-bold">
                                Quick Links
                            </h6>

                            <p className="mb-2">
                                <Link
                                    to="/"
                                    className="text-secondary text-decoration-none"
                                >
                                    Home
                                </Link>
                            </p>

                            <p className="mb-2">
                                <Link
                                    to="/jobs"
                                    className="text-secondary text-decoration-none"
                                >
                                    Jobs
                                </Link>
                            </p>

                            <p className="mb-2">
                                <Link
                                    to="/aboutus"
                                    className="text-secondary text-decoration-none"
                                >
                                    About
                                </Link>
                            </p>

                            <p className="mb-2">
                                <Link
                                    to="/contactus"
                                    className="text-secondary text-decoration-none"
                                >
                                    Contact
                                </Link>
                            </p>

                            <p className="mb-2">
                                <Link
                                    to="/ourservices"
                                    className="text-secondary text-decoration-none"
                                >
                                    Services
                                </Link>
                            </p>

                        </div>


                        <div className="col-md-3">

                            <h6 className="fw-bold">
                                Candidates
                            </h6>

                            <p className="mb-2">
                                <Link
                                    to="/jobs"
                                    className="text-secondary text-decoration-none"
                                >
                                    Find Jobs
                                </Link>
                            </p>

                            <p className="mb-2">
                                <Link
                                    to="/studentregistration"
                                    className="text-secondary text-decoration-none"
                                >
                                    Register
                                </Link>
                            </p>

                            <p className="mb-2">
                                <Link
                                    to="/studentlogin"
                                    className="text-secondary text-decoration-none"
                                >
                                    Login
                                </Link>
                            </p>

                        </div>

                    </div>


                    <hr className="border-secondary" />

                    <p className="text-center text-secondary mb-0">
                        © 2026 NextHire. All Rights Reserved.
                    </p>

                </div>

            </footer>

        </div>
    );
}

export default Home;