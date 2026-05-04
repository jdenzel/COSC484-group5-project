import { useEffect, useState, useRef, useCallback } from "react";
import "./styles/Dashboard.css";
import WidgetShell    from "../components/widgets/WidgetShell";
import AddWidgetPanel from "../components/widgets/AddWidgetPanel";
import { WIDGET_DEFS, INITIAL_POSITIONS, WIDGET_CONTENT } from "../components/widgets/widgetConfig";

export default function Dashboard() {

  // ── User fetch ───────────────────────────────────────────────────────────
  const [users,   setUsers]   = useState([]);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState(null);

  const baseURL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

  useEffect(() => {
    const getUsers = async () => {
      try {
        const response = await fetch(`${baseURL}/users`);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
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

  // ── Widget state ─────────────────────────────────────────────────────────
  const [positions, setPositions] = useState(INITIAL_POSITIONS);
  const [zOrders,   setZOrders]   = useState(() =>
      Object.fromEntries(WIDGET_DEFS.map((w, i) => [w.id, i + 1]))
  );
  const [visible,   setVisible]   = useState(() =>
      Object.fromEntries(WIDGET_DEFS.map(w => [w.id, true]))
  );
  const [minimized, setMinimized] = useState(() =>
      Object.fromEntries(WIDGET_DEFS.map(w => [w.id, false]))
  );
  const [panelOpen, setPanelOpen] = useState(false);
  const topZ = useRef(WIDGET_DEFS.length + 1);

  const focus = useCallback((id) => {
    topZ.current += 1;
    setZOrders(z => ({ ...z, [id]: topZ.current }));
  }, []);

  const closeWidget = (id) => setVisible(v  => ({ ...v,  [id]: false }));
  const addWidget   = (id) => setVisible(v  => ({ ...v,  [id]: true  }));
  const toggleMin   = (id) => setMinimized(m => ({ ...m, [id]: !m[id] }));

  const resetLayout = () => {
    setPositions(INITIAL_POSITIONS);
    setMinimized(Object.fromEntries(WIDGET_DEFS.map(w => [w.id, false])));
    setVisible(Object.fromEntries(WIDGET_DEFS.map(w => [w.id, true])));
  };

  const closedWidgets = WIDGET_DEFS.filter(w => !visible[w.id]);

  // ── Render ───────────────────────────────────────────────────────────────
  return (
      <div className="dashboard">

        {/* Existing section */}
        <div className="dashboard__top">
          <h1 className="dashboard__title">Dashboard</h1>
          <h3 className="dashboard__subtitle">Current users:</h3>

          {loading && <p className="dashboard__loading">Loading team members...</p>}
          {error   && <p className="dashboard__error">Error: {error}</p>}

          <ul className="dashboard__user-list">
            {users.map(user => (
                <li key={user._id} className="dashboard__user-pill">
                  <strong>{user.firstname} {user.lastname}</strong>
                </li>
            ))}
          </ul>

          <hr className="dashboard__divider" />
        </div>

        {/* Widget canvas */}
        <div className="dashboard__canvas-section">
          <div className="dashboard__grid-overlay" />

          <div className="dashboard__toolbar">
          <span className="dashboard__toolbar-label">
            Widget Canvas
          </span>
            <div className="dashboard__toolbar-actions">
              <button className="dashboard__btn-add" onClick={() => setPanelOpen(p => !p)}>
                + Add Widget{closedWidgets.length > 0 ? ` (${closedWidgets.length})` : ""}
              </button>
              <button className="dashboard__btn-reset" onClick={resetLayout}>
                Reset Layout
              </button>
            </div>
          </div>

          <div className="dashboard__canvas">
            {WIDGET_DEFS.map(widget =>
                    visible[widget.id] && (
                        <WidgetShell
                            key={widget.id}
                            widget={widget}
                            pos={positions[widget.id]}
                            zIndex={zOrders[widget.id]}
                            minimized={minimized[widget.id]}
                            onDrag={pos => setPositions(p => ({ ...p, [widget.id]: pos }))}
                            onFocus={() => focus(widget.id)}
                            onClose={() => closeWidget(widget.id)}
                            onMinimize={() => toggleMin(widget.id)}
                        >
                          {WIDGET_CONTENT[widget.id]}
                        </WidgetShell>
                    )
            )}
          </div>
        </div>

        <AddWidgetPanel
            open={panelOpen}
            onClose={() => setPanelOpen(false)}
            closedWidgets={closedWidgets}
            onAdd={id => { addWidget(id); setPanelOpen(false); }}
        />
      </div>
  );
}