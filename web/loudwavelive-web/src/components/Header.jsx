function Header() {
  return (
    <header className="header">
      <div className="left">
        <img src="/logo.png" alt="LoudWave Live Logo" className="logo" />
        <Link to="/">LoudWave Live</Link>
      </div>

      <div className="center">
        <input type="text" placeholder="Search concerts, artists, venues..." />
      </div>

      <div className="right">
        {!isLoggedIn ? (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </>
        ) : (
            <>
              <Link to="/dashboard"> Events </Link>
              <Link to="/dashboard"> My Tickets </Link>
              <span> notif </span>
              <span> profile </span>
            </>
        )}
      </div>

    </header>
  );
}

export default Header;