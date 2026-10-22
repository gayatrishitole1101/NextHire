import react from "react";
import AdminNavbar from "./AdminNavbar";

function AdminHome() {
    const user = JSON.parse(localStorage.getItem('userinfo'));
  return (
    <div>
        <AdminNavbar />
            <div className="carousel-inner">

                <div className="carousel-item active">
                    <div className="ratio ratio-21x9">

                    <img 
                     src="https://img.freepik.com/premium-vector/onboarding-new-employee-warm-welcome-new-office-introduce-new-hire-colleagues-orientation-training-first-day-concept-businessman-manager-handshake-welcome-introduce-new-staff-team_212586-2074.jpg?w=2000"
                    className="d-block w-100"></img>
                    </div>
                </div>
            </div>
            </div>
  );
}

export default AdminHome;
