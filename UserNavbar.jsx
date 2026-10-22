import react from "react";
import { Link } from "react-router-dom";

function UserNavbar() {

 return(

    <nav className="navbar navbar-expand-lg" style={{backgroundColor: "#4ca9eb"}}>
        <div className="container-fluid px-4">

            <Link
          className="navbar-brand d-flex align-items-center text-black fw-bold fs-2"
          to="/"
        >
          🚀 <span className="ms-2">NextHire</span>
        </Link>

        <button
          className="navbar-toggler bg-light"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

            <Link className="navbar-brand ms-3" to="/browsejobs">
                Browse Jobs
            </Link> 
            <Link className="navbar-brand" to="/searchjobs">
               Search jobs
            </Link>
            <Link className="navbar-brand" to="/saveapplications">
                Save Applications
            </Link>
            <Link className="navbar-brand" to="/myprofile">
                My Profile
            </Link>
            <Link className="navbar-brand" to="/help">
               Help
            </Link>

            <button className="navbar-toggler bg-light" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
                <div className="d-flex align-items-center ms-auto gap-3">
                    <li className="nav-item">
                        <Link className="nav-link text-black fs-5 fw-semibold ms-auto" to="/">
                            User Logout
                        </Link>
                    </li>
                </div>
            </div>
        </div>
    </nav>
 );
}

export default UserNavbar;