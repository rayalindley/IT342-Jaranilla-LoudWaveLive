function AdminSideNav({ active, onSelect }) {
  const tabs = [
    { id: "dashboard", label: "Dashboard" },
    { id: "organizers", label: "Organizers" },
    { id: "events", label: "Events" },
    { id: "applications", label: "Applications" },
  ];

  return (
    <div className="admin-side-nav">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          className={`side-tab ${active === tab.id ? "active" : ""}`}
          onClick={() => onSelect(tab.id)}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}

export default AdminSideNav;
