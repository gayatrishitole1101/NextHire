import react from "react";
import { Link } from "react-router-dom";

function AdminNavbar() {
 const user = JSON.parse(localStorage.getItem("userinfo"));

 return(

    <nav className="navbar navbar-expand-lg" style={{backgroundColor: "#4ca9eb"}}>
        <div className="container-fluid px-4">

            <Link
          className="navbar-brand d-flex align-items-center text-black fw-bold fs-2"
          to="/adminhome"
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

            <Link className="navbar-brand ms-3" to="/jobs">
                jobs
            </Link> 
            <Link className="navbar-brand" to="/companies">
                Companies
            </Link>
            <Link className="navbar-brand" to="/applications">
               Applications
            </Link>
            <Link className="navbar-brand" to="/users">
               User
            </Link>
            <Link className="navbar-brand" to="/reports">
               Reports
            </Link>

            <button className="navbar-toggler bg-light" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
                <div className="d-flex align-items-center ms-auto gap-3">
                    <li className="nav-item">
                        <Link className="nav-link text-black fs-5 fw-semibold ms-auto" to="/">
                            Admin Logout
                        </Link>
                    </li>
                </div>
            </div>
        </div>
    </nav>
 );
}

export default AdminNavbar;