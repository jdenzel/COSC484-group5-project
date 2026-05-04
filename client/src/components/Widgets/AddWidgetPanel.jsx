import "./styles/AddWidgetPanel.css";

export default function AddWidgetPanel({ open, onClose, closedWidgets, onAdd }) {
  if (!open) return null;

  return (
    <>
      <div className="panel-backdrop" onClick={onClose} />

      <div className="widget-panel">
        <div className="widget-panel__header">
          <span className="widget-panel__title">Add Widgets</span>
          <button className="widget-panel__close" onClick={onClose}>×</button>
        </div>

        <div className="widget-panel__list">
          {closedWidgets.length === 0 ? (
            <p className="widget-panel__empty">All widgets are on the board</p>
          ) : (
            closedWidgets.map(w => (
              <button
                key={w.id}
                className="widget-panel__item"
                style={{ "--accent": w.color }}
                onClick={() => onAdd(w.id)}
              >
                <span className="widget-panel__item-icon">{w.icon}</span>
                <span className="widget-panel__item-label">{w.title}</span>
                <span className="widget-panel__item-add">+</span>
              </button>
            ))
          )}
        </div>
      </div>
    </>
  );
}
