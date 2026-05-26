import { useEffect, useMemo, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import axios from "axios";

function ProtectedRoute({ children, requiredRole }) {
  const storedUser = useMemo(() => JSON.parse(localStorage.getItem("user") || "null"), []);
  const [user, setUser] = useState(storedUser);
  const [loading, setLoading] = useState(Boolean(storedUser?.userId ?? storedUser?.id));
  const location = useLocation();

  useEffect(() => {
    const userId = storedUser?.userId ?? storedUser?.id;
    if (!userId) {
      return;
    }

    axios
      .get(`http://localhost:8080/api/v1/auth/user/${userId}`)
      .then((res) => {
        localStorage.setItem("user", JSON.stringify(res.data));
        setUser(res.data);
      })
      .catch((error) => {
        console.error("Unable to refresh user session:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [storedUser]);

  if (loading) {
    return null;
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (requiredRole && user.role !== requiredRole) {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default ProtectedRoute;
