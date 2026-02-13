interface HistoryToolbarProps {
  canUndo: boolean;
  canRedo: boolean;
  onUndo: () => void;
  onRedo: () => void;
  onReset: () => void;
}

export function HistoryToolbar({ canUndo, canRedo, onUndo, onRedo, onReset }: HistoryToolbarProps) {
  return (
    <div className="sb-history-toolbar" role="toolbar" aria-label="History actions">
      <button type="button" disabled={!canUndo} onClick={onUndo} data-testid="undo-button">
        Undo
      </button>
      <button type="button" disabled={!canRedo} onClick={onRedo} data-testid="redo-button">
        Redo
      </button>
      <button type="button" onClick={onReset} data-testid="reset-button">
        Reset
      </button>
    </div>
  );
}
