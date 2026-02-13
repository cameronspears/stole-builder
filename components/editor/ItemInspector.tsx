import { useMemo } from "react";
import { ColorGrid } from "@/components/ui/ColorGrid";
import { CORE_COLORS, TEXT_COLORS } from "@/lib/presets";
import { useStoleStore } from "@/lib/store";

function numericValue(value: string, fallback: number): number {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
}

export function ItemInspector() {
  const items = useStoleStore((state) => state.config.canvasItems);
  const selectedItemId = useStoleStore((state) => state.selectedItemId);
  const updateCanvasItem = useStoleStore((state) => state.updateCanvasItem);
  const removeCanvasItem = useStoleStore((state) => state.removeCanvasItem);

  const selectedItem = useMemo(() => items.find((item) => item.id === selectedItemId) ?? null, [items, selectedItemId]);

  if (!selectedItem) {
    return (
      <section className="sb-inspector" aria-label="Item inspector">
        <h3>Item Inspector</h3>
        <p className="sb-empty">Select a text box or patch to edit placement, size, and rotation.</p>
      </section>
    );
  }

  return (
    <section className="sb-inspector" aria-label="Item inspector">
      <h3>{selectedItem.type === "text" ? "Text" : "Patch"} Inspector</h3>

      {selectedItem.type === "text" ? (
        <label className="sb-field">
          <span>Content</span>
          <textarea
            rows={3}
            value={selectedItem.content}
            onChange={(event) =>
              updateCanvasItem(selectedItem.id, (item) =>
                item.type === "text"
                  ? {
                      ...item,
                      content: event.target.value.slice(0, 180),
                    }
                  : item,
              )
            }
          />
        </label>
      ) : null}

      <label className="sb-field sb-field-inline">
        <span>X</span>
        <input
          type="range"
          min="90"
          max="430"
          value={selectedItem.x}
          onChange={(event) =>
            updateCanvasItem(selectedItem.id, (item) => ({
              ...item,
              x: numericValue(event.target.value, item.x),
            }))
          }
        />
      </label>

      <label className="sb-field sb-field-inline">
        <span>Y</span>
        <input
          type="range"
          min="150"
          max="910"
          value={selectedItem.y}
          onChange={(event) =>
            updateCanvasItem(selectedItem.id, (item) => ({
              ...item,
              y: numericValue(event.target.value, item.y),
            }))
          }
        />
      </label>

      <label className="sb-field sb-field-inline">
        <span>Rotation</span>
        <input
          type="range"
          min="-180"
          max="180"
          value={selectedItem.rotationDeg}
          onChange={(event) =>
            updateCanvasItem(selectedItem.id, (item) => ({
              ...item,
              rotationDeg: numericValue(event.target.value, item.rotationDeg),
            }))
          }
          data-testid="rotation-slider"
        />
      </label>

      {selectedItem.type === "text" ? (
        <>
          <label className="sb-field sb-field-inline">
            <span>Text Size</span>
            <input
              type="range"
              min="0.7"
              max="2"
              step="0.05"
              value={selectedItem.fontScale}
              onChange={(event) =>
                updateCanvasItem(selectedItem.id, (item) =>
                  item.type === "text"
                    ? {
                        ...item,
                        fontScale: numericValue(event.target.value, item.fontScale),
                      }
                    : item,
                )
              }
            />
          </label>

          <section>
            <h4 className="sb-section-title">Text Color</h4>
            <ColorGrid
              colors={TEXT_COLORS.length > 0 ? TEXT_COLORS : CORE_COLORS}
              selectedHex={selectedItem.colorHex}
              onSelect={(hex) =>
                updateCanvasItem(selectedItem.id, (item) =>
                  item.type === "text"
                    ? {
                        ...item,
                        colorHex: hex,
                      }
                    : item,
                )
              }
              testIdPrefix="selected-text-color"
            />
          </section>
        </>
      ) : (
        <label className="sb-field sb-field-inline">
          <span>Patch Size</span>
          <input
            type="range"
            min="0.65"
            max="1.9"
            step="0.05"
            value={selectedItem.scale}
            onChange={(event) =>
              updateCanvasItem(selectedItem.id, (item) =>
                item.type === "patch"
                  ? {
                      ...item,
                      scale: numericValue(event.target.value, item.scale),
                    }
                  : item,
              )
            }
          />
        </label>
      )}

      <button type="button" className="sb-secondary-button" onClick={() => removeCanvasItem(selectedItem.id)}>
        Remove Selected
      </button>
    </section>
  );
}
