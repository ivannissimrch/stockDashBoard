import "./NavBar.css";
import home from "../../images/navbar/iconoir_home-simple.svg";
import dashboard from "../../images/navbar/radix-icons_dashboard.svg";
import settings from "../../images/navbar/ion_settings-outline.svg";
import phone from "../../images/navbar/fluent_call-24-regular.svg";
import { useContext } from "react";
import { stockContext } from "../../App";

export default function NavBar() {
  const { primaryColors, accentColors, iconColors } = useContext(stockContext);
  return (
    <nav className={`navbar_container ${primaryColors}`}>
      <h1 className={`navbar_logo colors ${accentColors}`}> Stock Dashboard</h1>
      <div className="home_dashboard_container">
        <div className="home_and_icon_container">
          <img src={home} className={`icon ${iconColors}`} />
          <h2 className="nav_text">Home</h2>
        </div>
        <div className="dashboard_and_icon_container">
          <img src={dashboard} className={`icon ${iconColors}`} />
          <h2 className="nav_text">Dashboard</h2>
        </div>
      </div>
      <hr className="navbar_divider_line" />
      <div className="settings_contact_container">
        <div className="settings_container">
          <img src={settings} className={`icon ${iconColors}`} />
          <h2 className="nav_text">Settings</h2>
        </div>
        <div className="contact_container">
          <img src={phone} className={`icon ${iconColors}`} />
          <h3 className="nav_text">Contact us</h3>
        </div>
      </div>
    </nav>
  );
}
