import { Link } from "react-router-dom";

function HomeNavbar() {
  const user = JSON.parse(localStorage.getItem("userinfo"));

  return (
    <nav
      className="navbar navbar-expand-lg"
      style={{ backgroundColor: "#4ca9eb" }}
    >
      <div className="container-fluid px-4">

        {/* Logo */}
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

        <div className="collapse navbar-collapse" id="navbarNav">

          {/* Menu */}
          <ul className="navbar-nav ms-5 mb-2 mb-lg-0 gap-3">
            <li className="nav-item">
              <Link
                className="nav-link text-black fs-5 fw-semibold"
                to="/"
              >
                Home
              </Link>
            </li>

            <li className="nav-item">
              <Link
                className="nav-link text-black fs-5 fw-semibold"
                to="/aboutus"
              >
                About Us
              </Link>
            </li>

            <li className="nav-item">
              <Link
                className="nav-link text-black fs-5 fw-semibold"
                to="/ourservices"
              >
                Our Services
              </Link>
            </li>

            <li className="nav-item">
              <Link
                className="nav-link text-black fs-5 fw-semibold"
                to="/contactus"
              >
                Contact Us
              </Link>
            </li>
          </ul>

          {/* Right Side Login */}
          <div className="d-flex align-items-center ms-auto gap-3">

            {user && (
              <span className="text-black fs-5 fw-semibold">
                Welcome, {user.name}
              </span>
            )}

            <div className="dropdown">
              <button
                className="btn btn-warning dropdown-toggle"
                type="button"
                id="dropdownMenuButton"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Login
              </button>

              <ul
                className="dropdown-menu dropdown-menu-end"
                aria-labelledby="dropdownMenuButton"
              >
                <li>
                  <Link className="dropdown-item" to="/adminlogin">
                    Admin Login
                  </Link>
                </li>

                <li>
                  <Link className="dropdown-item" to="/studentregistration">
                    Student Login
                  </Link>
                </li>
              </ul>
            </div>

          </div>
        </div>
      </div>
    </nav>
  );
}

export default HomeNavbar;