import { useEffect, useState } from "react";
import axios from "axios";
import MainLayout from "../../shared/layouts/MainLayout";

function AdminDashboard() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchApplications = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:8080/api/partner/applications");
      setApplications(response.data || []);
      setError(null);
    } catch (err) {
      console.error(err);
      setError("Failed to load organizer applications.");
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (applicationId) => {
    try {
      await axios.post(
        `http://localhost:8080/api/partner/applications/${applicationId}/approve`
      );
      setApplications((prev) =>
        prev.map((application) =>
          application.applicationId === applicationId
            ? { ...application, status: "APPROVED" }
            : application
        )
      );
      alert("Application approved and user updated to ORGANIZER.");
    } catch (err) {
      console.error(err);
      alert("Unable to approve application. Check the backend logs.");
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  const pendingCount = applications.filter((application) => application.status === "PENDING").length;
  const approvedCount = applications.filter((application) => application.status === "APPROVED").length;

  return (
    <MainLayout>
      <div className="page-shell">
        <div className="admin-dashboard-page">
          <div className="dashboard-hero">
          <div>
            <p className="eyebrow">Admin Dashboard</p>
            <h1>Organizer Application Review</h1>
            <p className="hero-copy">
              Approve partnership applications, manage organizer onboarding, and monitor the current application flow.
            </p>
          </div>

          <button className="refresh-btn" type="button" onClick={fetchApplications}>
            Refresh applications
          </button>
        </div>

        <div className="dashboard-summary">
          <div className="summary-card">
            <span>Total applications</span>
            <strong>{applications.length}</strong>
          </div>
          <div className="summary-card">
            <span>Pending approvals</span>
            <strong>{pendingCount}</strong>
          </div>
          <div className="summary-card">
            <span>Approved organizers</span>
            <strong>{approvedCount}</strong>
          </div>
        </div>

        <div className="table-card">
          {loading ? (
            <div className="table-empty-state">Loading applications…</div>
          ) : error ? (
            <div className="table-empty-state error-message">{error}</div>
          ) : applications.length === 0 ? (
            <div className="table-empty-state">No partnership applications found.</div>
          ) : (
            <table className="admin-applications-table">
              <thead>
                <tr>
                  <th>Applicant</th>
                  <th>Company</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {applications.map((application) => (
                  <tr key={application.applicationId}>
                    <td>{application.fullName}</td>
                    <td>{application.companyName}</td>
                    <td>{application.businessEmail}</td>
                    <td>{application.contactNumber}</td>
                    <td>
                      <span className={`status-pill ${application.status.toLowerCase()}`}>
                        {application.status}
                      </span>
                    </td>
                    <td>
                      {application.status === "PENDING" ? (
                        <button
                          type="button"
                          className="approve-btn"
                          onClick={() => handleApprove(application.applicationId)}
                        >
                          Approve
                        </button>
                      ) : (
                        <span className="approved-label">Approved</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
    </MainLayout>
  );
}

export default AdminDashboard;
