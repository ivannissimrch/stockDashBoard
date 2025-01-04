import "./NavBar.css";

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

        <svg
          className="navbar_divider_line"
          xmlns="http://www.w3.org/2000/svg"
          width="345"
          height="1"
          viewBox="0 0 345 1"
          fill="none"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M345 1L0 1V0L345 0V1Z"
            fill="#E9E9E9"
          />
        </svg>

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
            <img
              src="/src/images/navbar/Contact us.svg"
              alt="contact us"
              className="contact_us"
            />
          </div>
        </div>
      </nav>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="430"
        height="1256"
        viewBox="0 0 430 1256"
        fill="none"
      >
        <path d="M0 -1H430V1256H0V-1Z" fill="white" />
      </svg>
    </>
  );
}
