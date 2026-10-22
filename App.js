import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Home';
import AboutUs from './AboutUs';
import ContactUs from './ContactUs';
import HomeNavbar from './HomeNavbar';
import OurServices from './OurServices';
import AdminLogin from './AdminLogin';
import AdminNavbar from './AdminNavbar';
import AdminDashboard from './AdminDashboard';
import UserDashboard from './UserDashboard';
import UserNavbar from './UserNavbar';
import AdminHome from './AdminHome';
import StudentRegistration from './StudentRegistration';
import StudentLogin from './StudentLogin';
import StudentDashboard from './StudentDashboard';
import Jobs from './Jobs';
import MyProfile from './MyProfile';
import EditProfile from './EditProfile';
import SavedJob from './SavedJob';
import MyApplications from './MyApplications';
import MyResume from './MyResume';
import Settings from './Settings';
import Notifications from './Notifications';
// import Calculator from './Calculator';




function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route Index element={<Home />} />
      <Route path="/aboutus" element={<AboutUs />} />
      <Route path="/contactus" element={<ContactUs />} />
      <Route path ="/homenavbar" element={<HomeNavbar />} />
      <Route path="/ourservices" element={<OurServices/>} />
      <Route path="/adminlogin" element={<AdminLogin/>} />
      <Route path="/adminnavbar" element={<AdminNavbar/>} />
      <Route path="/admindashboard" element={<AdminDashboard/>} />
      <Route path="/userdashboard" element={<UserDashboard/>} />
      <Route path="/usernavbar" element={<UserNavbar/>} />
      <Route path ="/adminhome" element={<AdminHome/>} />
      <Route path="/studentregistration" element={<StudentRegistration />} />
      <Route path="/studentlogin" element={<StudentLogin />} />
      <Route path="/studentdashboard" element={<StudentDashboard />} />
      <Route path="/jobs" element={<Jobs />} />
      <Route path = "/myprofile" element={<MyProfile />} /> 
      <Route path = "/updateprofile/:studentid" element ={<EditProfile />} />
      <Route path = "/savedjob" element = {<SavedJob />} />
      <Route path = "/myapplications" element = {<MyApplications />} />
      <Route path = "/myresume" element = {<MyResume />} />
      <Route path = "/settings" element = {<Settings />} />
      <Route path = "/notifications" element = {<Notifications />} />
      {/* <Route path = "/calculator" element = {<Calculator />} /> */}
    </Routes>
    </BrowserRouter>
  );
}

export default App;
