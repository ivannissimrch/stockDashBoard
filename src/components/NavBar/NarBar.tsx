import "./NavBar.css";
import home from "../../images/navbar/iconoir_home-simple.svg";
import dashboard from "../../images/navbar/radix-icons_dashboard.svg";
// import settings from "../../images/navbar/ion_settings-outline.svg";
import phone from "../../images/navbar/fluent_call-24-regular.svg";
import { useContext } from "react";
import { stockContext } from "../../App";
import { Link, useLocation } from "react-router";

export default function NavBar() {
  // const navigate = useNavigate();
  const { pathname } = useLocation();

  const { primaryColors, accentColors, iconColors } = useContext(stockContext);
  return (
    <nav className={`navbar_container ${primaryColors}`}>
      <h1 className={`navbar_logo colors ${accentColors}`}> Stock Dashboard</h1>
      <div className="home_dashboard_container">
        <Link to="/" className="home_and_icon_container">
          <img src={home} className={`icon ${iconColors}`} />
          <h2
            className={`nav_text  ${primaryColors} ${
              pathname === "/" ? "active_section" : ""
            }`}
          >
            Home
          </h2>
        </Link>
        <Link to="dashboard" className="dashboard_and_icon_container">
          <img src={dashboard} className={`icon ${iconColors}`} />
          <h2
            className={`nav_text  ${primaryColors} ${
              pathname === "/dashboard" ? "active_section" : ""
            } `}
          >
            Dashboard
          </h2>
        </Link>
      </div>
      <hr className="navbar_divider_line" />
      <div className="settings_contact_container">
        {/* <div className="settings_container">
          <img src={settings} className={`icon ${iconColors}`} />
          <h2 className={`nav_text  ${primaryColors}`}>Settings</h2>
        </div> */}
        <Link to="contactUs" className="contact_container">
          <img src={phone} className={`icon ${iconColors}`} />
          <h3
            className={`nav_text  ${primaryColors} ${
              pathname === "/contactUs" ? "active_section" : ""
            } `}
          >
            Contact us
          </h3>
        </Link>
      </div>
    </nav>
  );
}
