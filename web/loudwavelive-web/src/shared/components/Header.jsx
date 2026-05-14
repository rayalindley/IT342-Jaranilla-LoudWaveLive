import { Link } from "react-router-dom";
import logo from "../images/loudwavelive-logo.png";
import "../../index.css";

function Header() {
  const user = JSON.parse(localStorage.getItem("user") || "null");
  console.log(user?.role); // safe

  return (
    <header>
      <div className="left">
        <img src={logo} alt="LoudWave Live Logo" className="logo" />
        <Link to="/">LoudWave Live</Link>
      </div>

      <div className="center">
        <input
          type="text"
          placeholder="Search concerts, artists, venues..."
          className="searchbar"
        />
      </div>

      <div className="right">
        {!user ? (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        ) : (
          <>
            {user?.role === "ATTENDEE" && (
              <>
                <Link to="/partner">Partner</Link>
                <Link to="/events">Events</Link>
                <Link to="/mytickets">My Tickets</Link>

                <button
                  onClick={() => {
                    localStorage.removeItem("user");
                    window.location.href = "/";
                  }}
                >
                  Logout
                </button>
              </>
            )}

            {user?.role === "ORGANIZER" && (
              <>
              <Link to="/organizer-dashboard">Organizer Dashboard</Link>
              <button
                  onClick={() => {
                    localStorage.removeItem("user");
                    window.location.href = "/";
                  }}
                >
                  Logout
                </button>
              </>
            )}

            {user?.role === "ADMIN" && (
              <Link to="/admin">Admin Dashboard</Link>
            )}
          </>
        )}
      </div>
    </header>
  );
}

export default Header;