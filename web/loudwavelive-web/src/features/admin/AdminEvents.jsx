import { useEffect, useMemo, useState } from "react";
import axios from "axios";

export default function AdminEvents({ onAction }) {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [sortField, setSortField] = useState("date");
  const [sortDirection, setSortDirection] = useState("desc");
  const [organizerFilter, setOrganizerFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  const fetchEvents = () => {
    setLoading(true);
    setError(null);
    axios
      .get("http://localhost:8080/api/events/all")
      .then((res) => setEvents(res.data || []))
      .catch((err) => {
        console.error(err);
        setError(err?.response?.data || err.message || "Unable to load events");
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchEvents();
  }, []);

  const handleApprove = async (eventId) => {
    try {
      await axios.post(`http://localhost:8080/api/events/${eventId}/approve`);
      setEvents((prev) => prev.filter((e) => e.eventId !== eventId));
      if (onAction) onAction();
      alert("Event approved.");
    } catch (err) {
      console.error(err);
      alert("Unable to approve event.");
    }
  };

  const organizerOptions = useMemo(() => {
    const organizers = Array.from(new Set(events.map((event) => event.organizer?.organizationName).filter(Boolean)));
    return ["all", ...organizers];
  }, [events]);

  const filteredEvents = useMemo(() => {
    return events
      .filter((event) => {
        const query = search.toLowerCase().trim();
        const target = `${event.title} ${event.venue} ${event.organizer?.organizationName}`.toLowerCase();
        return query ? target.includes(query) : true;
      })
      .filter((event) => {
        if (organizerFilter === "all") return true;
        return event.organizer?.organizationName === organizerFilter;
      })
      .filter((event) => {
        if (statusFilter === "all") return true;
        return event.status === statusFilter;
      })
      .sort((a, b) => {
        const aValue = sortField === "title" ? a.title.toLowerCase() : new Date(a.date).getTime();
        const bValue = sortField === "title" ? b.title.toLowerCase() : new Date(b.date).getTime();
        if (aValue < bValue) return sortDirection === "asc" ? -1 : 1;
        if (aValue > bValue) return sortDirection === "asc" ? 1 : -1;
        return 0;
      });
  }, [events, search, sortField, sortDirection, organizerFilter, statusFilter]);

  if (loading) return <div className="table-empty-state">Loading events...</div>;

  if (error) return <div className="table-empty-state">Error: {String(error)}</div>;

  if (events.length === 0) return <div className="table-empty-state">No events found.</div>;

  return (
    <div className="table-card">
      <div className="table-toolbar">
        <input
          type="search"
          className="search-input"
          placeholder="Search by title, venue, organizer..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <div className="toolbar-actions">
          <select value={organizerFilter} onChange={(e) => setOrganizerFilter(e.target.value)} className="select-field">
            {organizerOptions.map((option) => (
              <option key={option} value={option}>
                {option === "all" ? "All organizers" : option}
              </option>
            ))}
          </select>
          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="select-field">
            <option value="all">All statuses</option>
            <option value="PENDING">Pending</option>
            <option value="APPROVED">Approved</option>
          </select>
          <select value={sortField} onChange={(e) => setSortField(e.target.value)} className="select-field">
            <option value="date">Sort by date</option>
            <option value="title">Sort by title</option>
          </select>
          <button
            type="button"
            className="filter-btn"
            onClick={() => setSortDirection((dir) => (dir === "asc" ? "desc" : "asc"))}
          >
            {sortDirection === "asc" ? "Newest first" : "Oldest first"}
          </button>
        </div>
      </div>
      <table className="admin-applications-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Venue</th>
            <th>Date</th>
            <th>Organizer</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredEvents.map((event) => (
            <tr key={event.eventId}>
              <td>{event.title}</td>
              <td>{event.venue}</td>
              <td>{new Date(event.date).toLocaleString()}</td>
              <td>{event.organizer?.organizationName}</td>
              <td>
                <span className={`status-pill ${event.status?.toLowerCase()}`}>
                  {event.status}
                </span>
              </td>
              <td>
                {event.status === "PENDING" ? (
                  <button className="approve-btn" onClick={() => handleApprove(event.eventId)}>Approve</button>
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
