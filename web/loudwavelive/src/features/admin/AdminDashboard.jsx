import { useEffect, useState } from "react";
import MainLayout from "../../shared/layouts/MainLayout";
import AdminOrganizers from "./AdminOrganizers";
import AdminApplications from "./AdminApplications";
import AdminEvents from "./AdminEvents";
import AdminSideNav from "./AdminSideNav";
import axios from "axios";
import "../../styles/global.css";
import "../../styles/admin.css";

function AdminDashboard() {
  const [active, setActive] = useState("dashboard");
  const [stats, setStats] = useState({ applications: 0, pending: 0, approved: 0, organizers: 0, pendingEvents: 0 });
  const [error, setError] = useState(null);

  const fetchStats = async () => {
    try {
      setError(null);
      const [appsRes, organizersRes, eventsRes] = await Promise.all([
        axios.get("http://localhost:8080/api/partner/applications"),
        axios.get("http://localhost:8080/api/organizers"),
        axios.get("http://localhost:8080/api/events/pending"),
      ]);

      const applications = appsRes.data || [];
      const pending = applications.filter((a) => a.status === "PENDING").length;
      const approved = applications.filter((a) => a.status === "APPROVED").length;
      const events = eventsRes.data || [];

      setStats({
        applications: applications.length,
        pending,
        approved,
        organizers: (organizersRes.data || []).length,
        pendingEvents: events.length,
      });
    } catch (err) {
      console.error("Failed to load admin stats", err);
      setError(err?.response?.data || err.message || "Failed to fetch stats");
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchStats();
  }, []);

  return (
    <MainLayout>
      <div className="page-shell admin-shell">
        <div>
          <div className="admin-dashboard-header">
            <div>
              <p className="eyebrow">Admin Dashboard</p>
              <h1>Overview</h1>
              <p className="subhead">Manage organizers, pending events, and partnerships from one polished workspace.</p>
            </div>
            <div className="admin-header-actions">
              <button onClick={fetchStats} className="refresh-btn">
                Refresh data
              </button>
            </div>
          </div>

          {active === "dashboard" && (
            <div>
              <div className="dashboard-summary">
                <div className="summary-card">
                  <span>Total applications</span>
                  <strong>{stats.applications}</strong>
                </div>
                <div className="summary-card">
                  <span>Pending approvals</span>
                  <strong>{stats.pending}</strong>
                </div>
                <div className="summary-card">
                  <span>Approved organizers</span>
                  <strong>{stats.approved}</strong>
                </div>
                <div className="summary-card">
                  <span>Organizers</span>
                  <strong>{stats.organizers}</strong>
                </div>
                <div className="summary-card">
                  <span>Pending events</span>
                  <strong>{stats.pendingEvents}</strong>
                </div>
              </div>
              {error && <div className="status-pill error">{`Error loading stats: ${error}`}</div>}
            </div>
          )}

          {active === "organizers" && <AdminOrganizers />}
          {active === "applications" && <AdminApplications onAction={fetchStats} />}
          {active === "events" && <AdminEvents onAction={fetchStats} />}
        </div>

        <aside>
          <AdminSideNav active={active} onSelect={setActive} />
        </aside>
      </div>
    </MainLayout>
  );
}

export default AdminDashboard;
