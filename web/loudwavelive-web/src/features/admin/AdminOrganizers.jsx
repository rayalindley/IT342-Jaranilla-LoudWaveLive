import { useEffect, useState } from "react";
import axios from "axios";

export default function AdminOrganizers() {
  const [organizers, setOrganizers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/organizers")
      .then((res) => setOrganizers(res.data || []))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="table-empty-state">Loading organizers...</div>;

  if (organizers.length === 0) return <div className="table-empty-state">No organizers found.</div>;

  return (
    <div className="table-card">
      <table className="admin-organizers-table">
        <thead>
          <tr>
            <th>Organization</th>
            <th>User</th>
            <th>Email</th>
            <th>Joined</th>
          </tr>
        </thead>
        <tbody>
          {organizers.map((o) => (
            <tr key={o.organizerId}>
              <td>{o.organizationName}</td>
              <td>{o.user?.firstName} {o.user?.lastName}</td>
              <td>{o.user?.email}</td>
              <td>{o.createdAt ? new Date(o.createdAt).toLocaleString() : "-"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
