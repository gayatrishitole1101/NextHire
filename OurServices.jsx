import React from "react";
import HomeNavbar from "./HomeNavbar";
function OurServices(){
    return(
        <div>
            <HomeNavbar></HomeNavbar>
        <div className="container">
            <h1 className="text-center my-5">Our Services</h1>
            <div className="row">
                <div className="col-md-4">
                    <div className="card mb-4 shadow-sm">
                        
                        <div className="card-body">
                            <h5 className="card-title">Recruitment</h5>
                            <p className="card-text">We provide top-notch recruitment services to help you find the best talent for your organization.</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="card mb-4 shadow-sm">
                        <div className="card-body">
                            <h5 className="card-title">Training</h5>
                            <p className="card-text">Our training programs are designed to enhance the skills and knowledge of your employees.</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="card mb-4 shadow-sm">
                        <div className="card-body">
                            <h5 className="card-title">Consulting</h5>
                            <p className="card-text">We offer expert consulting services to help you make informed decisions and achieve your business goals.</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="card mb-4 shadow-sm">
                        <div className="card-body">
                            <h5 className="card-title">Outsourcing</h5>
                            <p className="card-text">We provide outsourcing solutions to help you streamline your operations and reduce costs.</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="card mb-4 shadow-sm">
                        <div className="card-body">
                            <h5 className="card-title">HR Solutions</h5>
                            <p className="card-text">Our HR solutions are tailored to meet the unique needs of your organization and help you manage your workforce effectively.</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="card mb-4 shadow-sm">
                       
                        <div className="card-body">
                            <h5 className="card-title">Payroll Management</h5>
                            <p className="card-text">We offer comprehensive payroll management services to ensure accurate and timely processing of employee salaries.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </div>
    )
}

export default OurServices;