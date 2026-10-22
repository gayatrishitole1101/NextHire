import React from "react";
import HomeNavbar from "./HomeNavbar";

function ContactUs(){
    return(
        <div>
            <HomeNavbar></HomeNavbar>
            <div className="container">
                <h1 className="text-center my-5">Contact Us</h1>
                <p>If you have any questions or inquiries, please feel free to reach out to us using the contact information below. We would be happy to assist you!</p>
                <ul>
                    <li>Email: info@nexthire.com</li>
                    <li>Contact no: 8010468727</li>
                </ul>
            </div>
        </div>
    )
}

export default ContactUs;