import { useMemo, useState } from "react";
import { ColorGrid } from "@/components/ui/ColorGrid";
import { DEFAULT_TEXT_COLOR, TEXT_COLORS } from "@/lib/presets";
import { useStoleStore } from "@/lib/store";
import { classNames } from "@/lib/utils";

export function TextStep() {
  const items = useStoleStore((state) => state.config.canvasItems);
  const selectedItemId = useStoleStore((state) => state.selectedItemId);
  const addTextItem = useStoleStore((state) => state.addTextItem);
  const setSelectedItemId = useStoleStore((state) => state.setSelectedItemId);

  const textItems = useMemo(() => items.filter((item) => item.type === "text"), [items]);

  const [draft, setDraft] = useState("");
  const [draftColor, setDraftColor] = useState(DEFAULT_TEXT_COLOR);

  const add = () => {
    if (!draft.trim()) {
      return;
    }

    addTextItem(draft, draftColor);
    setDraft("");
  };

  return (
    <div className="sb-step-body">
      <label className="sb-field">
        <span>Embroidery Text</span>
        <textarea
          value={draft}
          onChange={(event) => setDraft(event.target.value.slice(0, 180))}
          rows={3}
          placeholder="Type text, then add and place on the stole."
          data-testid="new-text-input"
        />
      </label>

      <section>
        <h3 className="sb-section-title">Thread Color</h3>
        <ColorGrid
          colors={TEXT_COLORS}
          selectedHex={draftColor}
          onSelect={setDraftColor}
          testIdPrefix="text-thread"
        />
      </section>

      <button
        type="button"
        className="sb-primary-button"
        onClick={add}
        disabled={!draft.trim()}
        data-testid="add-text-button"
      >
        Add Text Box
      </button>

      <section>
        <h3 className="sb-section-title">Placed Text</h3>
        <div className="sb-item-list">
          {textItems.length === 0 ? <p className="sb-empty">No text yet.</p> : null}
          {textItems.map((item, index) => (
            <button
              key={item.id}
              type="button"
              className={classNames("sb-item-button", selectedItemId === item.id && "is-active")}
              onClick={() => setSelectedItemId(item.id)}
              data-testid={`text-item-${index}`}
            >
              {item.content || "Untitled"}
            </button>
          ))}
        </div>
      </section>
    </div>
  );
}
