import React from "react";
import HomeNavbar from "./HomeNavbar";

function AboutUs() {
  return(
    <div>
      <HomeNavbar></HomeNavbar>
      <div className="container">
        <h1 className="text-center my-5">About Us</h1>
        <p>Welcome to our company! We are a team of dedicated professionals committed to providing exceptional services to our clients. Our mission is to deliver innovative solutions that meet the unique needs of each client, while maintaining the highest standards of quality and integrity.</p>
        <p>With years of experience in the industry, we have built a reputation for excellence and reliability. Our team is passionate about what we do, and we strive to exceed our clients' expectations in every project we undertake.</p>
        <p>Thank you for choosing us as your trusted partner. We look forward to working with you and helping you achieve your goals.</p>
      </div>
    </div>
  );
}

export default AboutUs;