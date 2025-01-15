import "./NavBar.css";
import contactUs from "../../images/navbar/Contact_us.svg";

export default function NavBar() {
  return (
    <>
      <nav className="navbar_container">
        <img
          src="/src/images/navbar/stockDashboardLogo.svg"
          alt="logo"
          className="navbar_logo"
        />
        <div className="home_dashboard_container">
          <div className="home_and_icon_container">
            <img
              src="/src/images/navbar/iconoir_home-simple.svg"
              className="icon"
            />
            <img src="/src/images/navbar/Home.svg" className="home_text" />
          </div>
          <div className="dashboard_and_icon_container">
            <img
              src="/src/images/navbar/radix-icons_dashboard.svg"
              className="icon"
            />
            <img
              src="/src/images/navbar/Dashboard.svg"
              className="dashboard_text"
            />
          </div>
        </div>
        <hr className="navbar_divider_line"></hr>
        <div className="settings_contact_container">
          <div className="settings_container">
            <img
              src="/src/images/navbar/ion_settings-outline.svg"
              alt="settings icon"
              className="icon"
            />
            <img
              src="/src/images/navbar/Settings.svg"
              alt="settings"
              className="settings"
            />
          </div>
          <div className="contact_container">
            <img
              src="/src/images/navbar/fluent_call-24-regular.svg"
              alt="phone icon"
              className="icon"
            />
            <img src={contactUs} alt="contact us" className="contact_us" />
          </div>
        </div>
      </nav>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="2"
        height="1256"
        viewBox="0 0 2 1256"
        fill="none"
      >
        <path d="M1 1256V0" stroke="#EBECF2" strokeWidth="2" />
      </svg>
    </>
  );
}
