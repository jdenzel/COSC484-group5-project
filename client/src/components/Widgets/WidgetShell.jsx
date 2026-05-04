import { useRef, useCallback } from "react";
import "./styles/WidgetShell.css";

export default function WidgetShell({
  widget,
  pos,
  onDrag,
  onFocus,
  zIndex,
  onClose,
  minimized,
  onMinimize,
  children,
}) {
  const startPos = useRef(null);

  const onMouseDown = useCallback((e) => {
    if (e.target.closest(".widget-shell__controls")) return;
    e.preventDefault();
    onFocus();
    startPos.current = { mx: e.clientX, my: e.clientY, wx: pos.x, wy: pos.y };

    const onMove = (e) => {
      onDrag({
        x: startPos.current.wx + (e.clientX - startPos.current.mx),
        y: startPos.current.wy + (e.clientY - startPos.current.my),
      });
    };
    const onUp = () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
  }, [pos, onDrag, onFocus]);

  return (
    <div
      className="widget-shell"
      style={{
        "--accent": widget.color,
        "--widget-w": `${widget.w}px`,
        "--widget-h": `${widget.h}px`,
        "--z": zIndex,
        left: pos.x,
        top:  pos.y,
      }}
      onMouseDown={onFocus}
    >
      <div className="widget-shell__titlebar" onMouseDown={onMouseDown}>
        <div className="widget-shell__title-left">
          <span className="widget-shell__icon">{widget.icon}</span>
          <span className="widget-shell__title">{widget.title}</span>
        </div>
        <div className="widget-shell__controls">
          <button
            className="widget-shell__btn widget-shell__btn--minimize"
            onClick={onMinimize}
            title={minimized ? "Restore" : "Minimize"}
          >−</button>
          <button
            className="widget-shell__btn widget-shell__btn--close"
            onClick={onClose}
            title="Remove"
          >×</button>
        </div>
      </div>

      {!minimized && (
        <div className="widget-shell__content">
          {children}
        </div>
      )}
    </div>
  );
}
