import { useEffect, useState } from "react";

export default function Dashboard() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const baseURL = import.meta.env.VITE_API_URL || "http://localhost:3000";

    useEffect(() => {
        const getUsers = async() => {
            try {
                const response = await fetch(`${baseURL}/users`);
            if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setUsers(data);
      } catch (err) {
        setError(err.message);
        console.error("fetch failed", err);
      } finally {
        setLoading(false);
      }
    };

    getUsers();
  }, []);

  if (loading) return <p>Loading team members...</p>;
  if (error) return <p style={{ color: 'red' }}>Error: {error}</p>;

    return (
        <div>
            <h1>Dashboard</h1>

            <h3>Current users:</h3>
            <ul>
            {users.map((user) => (
                <li key={user._id}>
                <strong>{user.firstname} {user.lastname}</strong>
                </li>
            ))}
            </ul>
        </div>
    );
}