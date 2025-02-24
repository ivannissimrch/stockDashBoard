import "./NavBar.css";
import home from "../../images/navbar/iconoir_home-simple.svg";
import dashboard from "../../images/navbar/radix-icons_dashboard.svg";
import settings from "../../images/navbar/ion_settings-outline.svg";
import phone from "../../images/navbar/fluent_call-24-regular.svg";

export default function NavBar() {
  return (
    <>
      <nav className="navbar_container">
        <h1 className="navbar_logo"> Stock Dashboard</h1>
        <div className="home_dashboard_container">
          <div className="home_and_icon_container">
            <img src={home} className="icon" />
            <h2 className="nav_text">Home</h2>
          </div>
          <div className="dashboard_and_icon_container">
            <img src={dashboard} className="icon" />
            <h2 className="nav_text">Dashboard</h2>
          </div>
        </div>
        <hr className="navbar_divider_line"></hr>
        <div className="settings_contact_container">
          <div className="settings_container">
            <img src={settings} className="icon" />
            <h2 className="nav_text">Settings</h2>
          </div>
          <div className="contact_container">
            <img src={phone} className="icon" />
            <h3 className="nav_text">Contact us</h3>
          </div>
        </div>
      </nav>
      {/* <svg
        xmlns="http://www.w3.org/2000/svg"
        width="2"
        height="1256"
        viewBox="0 0 2 1256"
        fill="none"
      >
        <path d="M1 1256V0" stroke="#EBECF2" strokeWidth="2" />
      </svg> */}
    </>
  );
}
