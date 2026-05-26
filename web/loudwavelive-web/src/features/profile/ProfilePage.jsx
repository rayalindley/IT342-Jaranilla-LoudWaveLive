import { useMemo } from "react";
import { Link } from "react-router-dom";
import MainLayout from "../../shared/layouts/MainLayout";

export default function ProfilePage() {
  const user = useMemo(() => JSON.parse(localStorage.getItem("user") || "null"), []);
  const displayName = user
    ? [user.firstName, user.lastName].filter(Boolean).join(" ") || user.email
    : "Profile";
  const initials = displayName
    ? displayName
        .split(" ")
        .map((part) => part.charAt(0).toUpperCase())
        .slice(0, 2)
        .join("")
    : "U";

  if (!user) {
    return (
      <MainLayout>
        <div className="page-shell">
          <div className="table-empty-state">No account profile found.</div>
        </div>
      </MainLayout>
    );
  }

  const organizationName = user.organizationName || user.companyName || user.organizerName || "-";

  return (
    <MainLayout>
      <div className="page-shell profile-page">
        <div className="profile-card">
          <div className="profile-header">
            <div className="profile-avatar">{initials}</div>
            <div>
              <p className="eyebrow">My Account</p>
              <h1>{displayName}</h1>
              <p className="subhead">Review your profile info, role, and contact details.</p>
            </div>
          </div>

          <div className="profile-grid">
            <div className="field-card">
              <span>Email</span>
              <strong>{user.email || "-"}</strong>
            </div>
            <div className="field-card">
              <span>Role</span>
              <strong>{user.role || "-"}</strong>
            </div>
            <div className="field-card">
              <span>Organizer / Company</span>
              <strong>{organizationName}</strong>
            </div>
            {user.contactNumber && (
              <div className="field-card">
                <span>Phone</span>
                <strong>{user.contactNumber}</strong>
              </div>
            )}
          </div>

          <div className="profile-actions">
            <Link className="filter-btn" to="/">
              Back to home
            </Link>
            <button
              className="approve-btn"
              type="button"
              onClick={() => {
                localStorage.removeItem("user");
                window.location.href = "/";
              }}
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
