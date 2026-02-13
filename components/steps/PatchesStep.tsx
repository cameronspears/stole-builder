import { useMemo } from "react";
import { PATCH_PRESETS } from "@/lib/presets";
import { useStoleStore } from "@/lib/store";
import { classNames } from "@/lib/utils";

export function PatchesStep() {
  const items = useStoleStore((state) => state.config.canvasItems);
  const customPatchNotes = useStoleStore((state) => state.config.customPatchNotes);
  const selectedItemId = useStoleStore((state) => state.selectedItemId);
  const addPatchItem = useStoleStore((state) => state.addPatchItem);
  const setSelectedItemId = useStoleStore((state) => state.setSelectedItemId);
  const setConfigPartial = useStoleStore((state) => state.setConfigPartial);

  const patchItems = useMemo(() => items.filter((item) => item.type === "patch"), [items]);

  return (
    <div className="sb-step-body">
      <section>
        <h3 className="sb-section-title">Patch Presets</h3>
        <div className="sb-card-grid">
          {PATCH_PRESETS.map((preset) => (
            <button
              key={preset.id}
              type="button"
              className="sb-card"
              onClick={() => addPatchItem(preset.id)}
              data-testid={`add-patch-${preset.id}`}
            >
              <strong>{preset.label}</strong>
              <span>add</span>
            </button>
          ))}
        </div>
      </section>

      <section>
        <h3 className="sb-section-title">Placed Patches</h3>
        <div className="sb-item-list">
          {patchItems.length === 0 ? <p className="sb-empty">No patches yet.</p> : null}
          {patchItems.map((item, index) => (
            <button
              key={item.id}
              type="button"
              className={classNames("sb-item-button", selectedItemId === item.id && "is-active")}
              onClick={() => setSelectedItemId(item.id)}
              data-testid={`patch-item-${index}`}
            >
              {PATCH_PRESETS.find((preset) => preset.id === item.presetId)?.label ?? item.presetId}
            </button>
          ))}
        </div>
      </section>

      <label className="sb-field">
        <span>Custom Patch Notes</span>
        <textarea
          value={customPatchNotes}
          onChange={(event) => setConfigPartial({ customPatchNotes: event.target.value.slice(0, 420) })}
          rows={4}
          placeholder="Optional: describe custom patch artwork we should discuss with you."
          data-testid="custom-patch-notes"
        />
      </label>
    </div>
  );
}
