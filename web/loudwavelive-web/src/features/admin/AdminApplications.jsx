import { useEffect, useMemo, useState } from "react";
import axios from "axios";

export default function AdminApplications({ onAction }) {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const fetchApplications = () => {
    setLoading(true);
    axios
      .get("http://localhost:8080/api/partner/applications")
      .then((res) => setApplications(res.data || []))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchApplications();
  }, []);

  const handleApprove = async (applicationId) => {
    try {
      await axios.post(`http://localhost:8080/api/partner/applications/${applicationId}/approve`);
      setApplications((prev) => prev.map((a) => (a.applicationId === applicationId ? { ...a, status: "APPROVED" } : a)));
      if (onAction) onAction();
      alert("Application approved. Organizer created if none existed.");
    } catch (err) {
      console.error(err);
      alert("Unable to approve application.");
    }
  };

  const filteredApplications = useMemo(() => {
    return applications
      .filter((application) => {
        const query = search.toLowerCase().trim();
        const target = `${application.fullName} ${application.companyName} ${application.businessEmail}`.toLowerCase();
        return query ? target.includes(query) : true;
      })
      .filter((application) => {
        if (statusFilter === "all") return true;
        return application.status === statusFilter;
      });
  }, [applications, search, statusFilter]);

  if (loading) return <div className="table-empty-state">Loading applications...</div>;

  if (applications.length === 0) return <div className="table-empty-state">No partnership applications found.</div>;

  return (
    <div className="table-card">
      <div className="table-toolbar">
        <input
          type="search"
          className="search-input"
          placeholder="Search by name, company, or email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <div className="toolbar-actions">
          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="select-field">
            <option value="all">All statuses</option>
            <option value="PENDING">Pending</option>
            <option value="APPROVED">Approved</option>
          </select>
        </div>
      </div>
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
          {filteredApplications.map((application) => (
            <tr key={application.applicationId}>
              <td>{application.fullName}</td>
              <td>{application.companyName}</td>
              <td>{application.businessEmail}</td>
              <td>{application.contactNumber}</td>
              <td>
                <span className={`status-pill ${application.status?.toLowerCase()}`}>
                  {application.status}
                </span>
              </td>
              <td>
                {application.status === "PENDING" ? (
                  <button className="approve-btn" onClick={() => handleApprove(application.applicationId)}>Approve</button>
                ) : (
                  <span className="approved-label">Approved</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
